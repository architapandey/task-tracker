import React, { useContext, useState } from "react";
import {
  RhButton,
  RhButtonGroup,
  RhInput,
  RhRichTextEditor,
  RhSelect,
} from "@rhythm-ui/react";
import AddProjectModal from "./AddProjectModal";
import { useEffect } from "react";
import { database } from "../Configs/firebase";
import { push, ref, update } from "firebase/database";
// import { useRouter } from "next/router";
import { getData } from "./utils";
import { AppContext } from "'@/store/context'";

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
  projectData,
  isEditFlow,
  isOpen,
}) {
  const userId = localStorage.getItem("token");

  const { dispatch } = useContext(AppContext);

  const [userData, setUserData] = useState(defaultUserState);
  const [projectOptions, setProjectOptions] = useState([]);
  const [isEditMode, setIsEditMode] = useState(isEditFlow ? false : true);
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
    update(ref(database, `UserData/${userId}/${projectData.id}`), {
      ...userData,
      clients: userData?.clients?.map((client) => client?.label),
    });
    getData(dispatch);
  }

  function setData(data) {
    const msgRef = push(ref(database, `UserData/${userId}`), data);
    msgRef.then((snapshot) => {
      getData(dispatch);
      setUserData(defaultUserState);
      handleCancel();
    });
  }

  const submitData = async (event) => {
    event.preventDefault();
    const { projectName, clients, startTime, endTime, date, projectDetails } =
      userData;
    const clientData = clients?.map((client) => client?.label);
    if (isEditFlow) {
      updateData();
      handleCancel();
      return;
    }

    setData({
      projectName,
      projectDetails,
      clients: clientData,
      startTime,
      endTime,
      date,
    });
  };

  useEffect(() => {
    const getOptions = async () => {
      const res = await fetch(
        "https://timetracker-be09e-default-rtdb.firebaseio.com/Options.json"
      );
      const data = await res.json();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          ...data[key],
        }));

        setProjectOptions(formattedData);
      }
    };
    if (isOpen) getOptions();
  }, [isOpen]);

  return (
    <div className="">
      {isEditFlow && (
        <RhButton
          className=" hover:text-gray-700 cursor-pointer m-2"
          onClick={() => setIsEditMode(!isEditMode)}
        >
          Edit{" "}
        </RhButton>
      )}
      <RhInput
        disabled={!isEditMode}
        input="text"
        name="projectName"
        placeholder="Task Name"
        className="m-4 p-4 w-full mt-8"
        value={userData?.projectName}
        onChange={handleChange}
      />
      <div className="p-4  min-h-64">
        <RhRichTextEditor
          initialValue={isEditFlow ? projectData?.projectDetails : ""}
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
            isDisabled={!isEditMode}
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
            disabled={!isEditMode}
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
          disabled={!isEditMode}
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
          disabled={!isEditMode}
        />
        <RhInput
          input="text"
          name="endTime"
          type="time"
          placeholder="End Time"
          className="m-4 p-4 w-1/4"
          value={userData?.endTime}
          onChange={handleChange}
          disabled={!isEditMode}
        />
        <div className="p-5 flex justify-end">
          <RhButtonGroup className=" text-white">
            <RhButton
              variant="white"
              size="xl"
              className="bg-black "
              onClick={submitData}
              disabled={!isEditMode}
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
