import { RhDivider, RhDatePicker } from "@rhythm-ui/react";
import Selector from "./Selector";
import Calendar from "react-calendar";
import { useState, useEffect, useContext } from "react";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
// import Content from "./content";
import { AppContext } from "'@/store/context'";
import ProjectTable from "./ProjectTable";

export default function Home() {
  const [date, setDate] = useState(new Date());
  const { dispatch, state } = useContext(AppContext);

  const onChange = (date) => {
    // console.log("date  ", date);
    setDate(date);
  };

  const formattedDate = format(date, " d MMMM, yyyy");

  const getData = async () => {
    const res = await fetch(
      "https://timetracker-be09e-default-rtdb.firebaseio.com/UserData.json"
    );
    const data = await res.json();
    if (data) {
      const formattedData = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      dispatch({
        type: "SET_PROJECT_DETAILS",
        data: formattedData,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-full w-full">
      <div>
        <Selector getData={getData} />
        <RhDivider />
      </div>
      {/* Content for the left half */}
      <div className="h-screen flex">
        <div className="flex-1 flex ">
          <div className=" p-4 m-4 ">
            <Calendar onChange={onChange} value={date} />
          </div>
          <div>
            <div className="flex items-center  h-full p-2">
              <RhDivider isVertical width="md" height="full" />
            </div>
          </div>
          <div className="flex-1 p-6">
            {/* Content for the right half */}
            <div className="pt-10">
              <div>
                <h3 className="m-0">
                  <span>Date:</span>
                  {formattedDate}
                </h3>
              </div>
              <RhDivider />
            </div>
            <ProjectTable date={date} />
          </div>
        </div>
      </div>
    </div>
  );
}
