import React, { useContext } from "react";
import { AppContext } from "'@/store/context'";
import ProjectCard from "./ProjectCard";
import { format } from "date-fns";

const ProjectTable = ({ date }) => {
  const {
    state: { projectDetails },
  } = useContext(AppContext);

  console.log({ projectDetails });
  const filteredProjectDetails = projectDetails?.filter(
    (project) => project.date === format(date, "yyyy-MM-dd")
  );

  return (
    <>
      <div className="flex px-2 font-bold mt-3">
        <p className="flex-1">Project Name</p>
        <p className="flex-1">Clients</p>
        <p className="flex-1">Start Time</p>
        <p className="flex-1">End Time</p>
      </div>
      {filteredProjectDetails?.map((project) => (
        <ProjectCard project={project} />
      ))}
    </>
  );
};

export default ProjectTable;
