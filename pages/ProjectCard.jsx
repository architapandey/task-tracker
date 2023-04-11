import { RhChip } from "@rhythm-ui/react";
import React from "react";

const ProjectCard = (props) => {
  const { project } = props;
  const { projectName, startTime, endTime, clients } = project;
  return (
    <div className="flex border border-grey-400 mb-2 px-2 rounded-lg">
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
