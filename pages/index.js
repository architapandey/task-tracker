import { RhDivider } from "@rhythm-ui/react";
import Selector from "../Components/Selector";
import Calendar from "react-calendar";
import { useState, useEffect, useContext } from "react";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { AppContext } from "'@/store/context'";
import ProjectTable from "../Components/ProjectTable";
import { useRouter } from "next/router";
import { getData } from "../store/utils";
import Image from "next/image";
import image from "../assets/background.svg";

export default function Home() {
  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const onChange = (date) => {
    setDate(date);
  };

  const formattedDate = format(date, " d MMMM, yyyy");

  useEffect(() => {
    getData(dispatch);
  }, []);

  return (
    <div className="h-full w-full">
      <div>
        <Selector />

        <RhDivider width="lg" />
      </div>
      {/* Content for the left half */}
      <div className="h-screen flex">
        <div className="flex-1 flex ">
          <div className=" p-4 m-4 ">
            <Calendar
              onChange={onChange}
              value={date}
              className="!bg-[#e7e7e7] rounded-lg"
            />
            <Image
              src={image}
              className="h-[500px] w-[300px]  transform translate-y-10 translate-x-24"
            />
          </div>
          <div>
            <div className="flex items-center  h-full p-2">
              <RhDivider isVertical width="lg" height="full" />
            </div>
          </div>
          <div className="flex-1 p-6">
            {/* Content for the right half */}
            <div className="pt-10">
              <div>
                <h3 className="m-0 text-white">
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
