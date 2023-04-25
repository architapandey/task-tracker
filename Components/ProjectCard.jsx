import { RhButton, RhChip, RhDrawer } from "@rhythm-ui/react";
// import { useRouter } from "next/router";
import React from "react";
import ProjectDetails from "./ProjectDetails";
import { useState } from "react";

const ProjectCard = (props) => {
  const { project } = props;
  const { projectName, startTime, endTime, clients, projectDetails, id, date } =
    project;

  const [isOpen, setIsOpen] = useState(false);

  const queryParams = {
    projectName,
    projectDetails,
    startTime,
    endTime,
    date,
    clients,
    id,
  };

  return (
    <>
      <div
        className="flex border border-grey-400 mb-2 px-2 rounded-lg text-white"
        onClick={() => setIsOpen(true)}
      >
        <p className="flex-1">{projectName}</p>
        <p className="flex-1">
          {clients?.map((client) => (
            <RhChip className="mr-1">{client}</RhChip>
          ))}
        </p>
        <p className="flex-1">{startTime}</p>
        <p className="flex-1">{endTime}</p>
      </div>
      <RhDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className={"bg-gray-100"}
        position="right"
        size="wide"
        closeOnOutsideClick={true}
        backdrop={true}
        variant="temporary"
      >
        <ProjectDetails
          projectData={{
            ...queryParams,
            clients: queryParams?.clients?.map((client) => {
              return { label: client, value: client };
            }),
          }}
          onClose={() => setIsOpen(false)}
          isEditFlow
          isOpen={isOpen}
        />
      </RhDrawer>
    </>
  );
};

export default ProjectCard;
