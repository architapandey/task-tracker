import { RhChip } from "@rhythm-ui/react";
import { useRouter } from "next/router";
import React from "react";
// import { useHistory } from "react-router-dom";

const ProjectCard = (props) => {
  const { project } = props;
  const { projectName, startTime, endTime, clients, projectDetails, id, date } =
    project;

  const router = useRouter();

  const handleClick = () => {
    const queryParams = {
      projectName,
      projectDetails,
      startTime,
      endTime,
      date,
      clients: JSON.stringify(clients),
      id,
    };
    router.push({
      pathname: "/DetailsPage",
      query: queryParams,
    });
  };

  return (
    <div
      className="flex border border-grey-400 mb-2 px-2 rounded-lg"
      onClick={handleClick}
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
  );
};

export default ProjectCard;
