import React, { useState } from "react";
import {
  RhButton,
  RhButtonGroup,
  RhInput,
  RhRichTextEditor,
  RhSelect,
} from "@rhythm-ui/react";

export default function ProjectDetails({ onClose, getData }) {
  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");
  const defaultUserState = {
    projectName: "",
    projectDetails: "",
    clients: "",
    startTime: "",
    endTime: "",
    date: "",
  };
  const [userData, setUserData] = useState(defaultUserState);

  const handleCancel = () => {
    // Close the dialog
    onClose(false);
  };

  const postUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // connect with firebase

  const submitData = async (event) => {
    event.preventDefault();
    const { projectName, clients, startTime, endTime, date } = userData;
    const clientData = clients?.map((client) => client?.label);
    const res = await fetch(
      "https://timetracker-be09e-default-rtdb.firebaseio.com/UserData.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          projectName,
          clients: clientData,
          startTime,
          endTime,
          date,
        }),
      }
    );
    if (res) {
      // alert("Data stored");
      getData();
      setUserData(defaultUserState);
      // onClose(false);
      handleCancel();
    } else {
      // alert("data not stored");
    }
    console.log(res);
  };

  return (
    <div className="">
      <RhInput
        input="text"
        name="projectName"
        placeholder="Task Name"
        className="m-4 p-4 w-full mt-12"
        value={userData.projectName}
        onChange={postUserData}
      />
      <div className="p-4  min-h-64">
        <RhRichTextEditor
          onChange={(value) =>
            setUserData((prevState) => ({
              ...prevState,
              projectDetails: value,
            }))
          }
        />
      </div>
      <div className="w-full flex justify-left pt-8">
        <div className="h-full w-full p-4">
          <RhSelect
            isMulti
            onChange={(selectedOptions) =>
              setUserData((prevState) => ({
                ...prevState,
                clients: selectedOptions,
              }))
            }
            className="text-sm  "
            options={[
              { label: "Blues", value: "blues" },
              { label: "Rock", value: "rock" },
              { label: "Jazz", value: "jazz" },
            ]}
            placeholder="Project"
            value={userData.clients}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-left items-center pt-4">
        <RhInput
          input="text"
          name="date"
          type="date"
          placeholder="Date"
          className="m-4 p-4 w-1/4"
          value={userData.date}
          onChange={postUserData}
        />
        <RhInput
          input="text"
          name="startTime"
          type="time"
          placeholder="Start Time"
          className="m-4 p-4 w-1/4"
          value={userData.startTime}
          onChange={postUserData}
        />
        <RhInput
          input="text"
          name="endTime"
          type="time"
          placeholder="End Time"
          className="m-4 p-4 w-1/4"
          value={userData.endTime}
          onChange={postUserData}
        />
        <div className="p-5 flex justify-end">
          <RhButtonGroup className=" text-white">
            <RhButton
              variant="white"
              size="xl"
              className="bg-black "
              onClick={submitData}
            >
              Log
            </RhButton>
            <RhButton
              variant="white"
              size="base"
              className="bg-black"
              onClick={handleCancel}
            >
              Cancel
            </RhButton>
          </RhButtonGroup>
        </div>
        {/* Display the details */}
      </div>
    </div>
  );
}
