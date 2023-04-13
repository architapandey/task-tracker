import React, { useState } from "react";
import {
  RhButton,
  RhButtonGroup,
  RhInput,
  RhRichTextEditor,
  RhSelect,
} from "@rhythm-ui/react";
import AddProjectModal from "./AddProjectModal";
import { useEffect } from "react";
import { database } from "./firebase";
import { ref, update } from "firebase/database";
import { useRouter } from "next/router";

const defaultUserState = {
  projectName: "",
  projectDetails: "",
  clients: "",
  startTime: "",
  endTime: "",
  date: "",
};

export default function ProjectDetails({
  onClose,
  getData,
  projectData,
  isEditFlow,
}) {
  const router = useRouter();

  const [userData, setUserData] = useState(defaultUserState);
  const [projectOptions, setProjectOptions] = useState([
    { label: "Blues", value: "Blues" },
    { label: "Rock", value: "Rock" },
    { label: "Jazz", value: "Jazz" },
  ]);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  useEffect(() => {
    if (isEditFlow)
      setUserData({
        projectName: projectData.projectName,
        projectDetails: projectData.projectDetails,
        clients: projectData.clients,
        startTime: projectData.startTime,
        endTime: projectData.endTime,
        date: projectData.date,
      });
  }, [projectData]);

  const handleCancel = () => {
    onClose(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const { startTime, endTime } = userData;

    if (name === "endTime" && endTime && startTime) {
      const startTimeInMinutes = convertTimeToMinutes(startTime);
      const endTimeInMinutes = convertTimeToMinutes(value);

      if (endTimeInMinutes <= startTimeInMinutes) {
        alert("End time cannot be before start time.");
        return;
      }
    }

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function convertTimeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  const addProjectOption = (newOption) => {
    setProjectOptions((prevState) => [...prevState, newOption]);
    setUserData((prevState) => ({
      ...prevState,
      clients: [...prevState.clients, newOption],
    }));
  };

  function updateData() {
    update(ref(database, `UserData/${projectData.id}`), {
      ...userData,
      clients: userData?.clients?.map((client) => client?.label),
    });
  }

  const submitData = async (event) => {
    event.preventDefault();
    const { projectName, clients, startTime, endTime, date, projectDetails } =
      userData;
    const clientData = clients?.map((client) => client?.label);
    if (isEditFlow) {
      updateData();
      router.push({
        pathname: "/",
      });
      return;
    }
    const res = await fetch(
      `https://timetracker-be09e-default-rtdb.firebaseio.com/UserData.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName,
          projectDetails,
          clients: clientData,
          startTime,
          endTime,
          date,
        }),
      }
    );
    if (res) {
      getData();
      setUserData(defaultUserState);
      handleCancel();
    }
  };

  return (
    <div className="">
      <RhInput
        input="text"
        name="projectName"
        placeholder="Task Name"
        className="m-4 p-4 w-full mt-8"
        value={userData?.projectName}
        onChange={handleChange}
      />
      <div className="p-4  min-h-64">
        <RhRichTextEditor
          onEditorChange={(value) =>
            setUserData((prevState) => ({
              ...prevState,
              projectDetails: value,
            }))
          }
        />
      </div>
      <div className="w-full flex-1  pt-2">
        <div className="h-full w-full p-4 ">
          <RhSelect
            isMulti
            onChange={(selectedOptions) =>
              setUserData((prevState) => ({
                ...prevState,
                clients: selectedOptions,
              }))
            }
            className="text-sm"
            options={projectOptions}
            placeholder="Project"
            value={userData?.clients}
            formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
            onCreateOption={(inputValue) =>
              addProjectOption({ label: inputValue, value: inputValue })
            }
          />
        </div>
        <div className="w-full flex justify-center">
          <RhButton
            className=" flex-1 p-2 m-4"
            onClick={() => setShowAddProjectModal(true)}
          >
            Add Project
          </RhButton>
        </div>
        {showAddProjectModal && (
          <AddProjectModal
            onClose={() => setShowAddProjectModal(false)}
            onAddProjectOption={(newOption) => {
              setShowAddProjectModal(false);
              addProjectOption(newOption);
            }}
          />
        )}
      </div>

      <div className="flex flex-wrap justify-left items-center pt-2">
        <RhInput
          input="text"
          name="date"
          type="date"
          placeholder="Date"
          className="m-4 p-4 w-1/4"
          value={userData?.date}
          onChange={handleChange}
        />
        <RhInput
          input="text"
          name="startTime"
          type="time"
          placeholder="Start Time"
          className="m-4 p-4 w-1/4"
          value={userData?.startTime}
          onChange={handleChange}
        />
        <RhInput
          input="text"
          name="endTime"
          type="time"
          placeholder="End Time"
          className="m-4 p-4 w-1/4"
          value={userData?.endTime}
          onChange={handleChange}
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
      </div>
    </div>
  );
}
