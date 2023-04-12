import React, { useContext } from "react";
import { AppContext } from "'@/store/context'";
import ProjectCard from "./ProjectCard";
import { format } from "date-fns";

const ProjectTable = ({ date }) => {
  const {
    state: { projectDetails },
  } = useContext(AppContext);

  const filteredProjectDetails = projectDetails?.filter(
    (project) => project.date === format(date, "yyyy-MM-dd")
  );

  if (!filteredProjectDetails || filteredProjectDetails.length === 0) {
    return (
      <h2 className=" text-secondary-700 text-center">No tasks for today!</h2>
    );
  }

  return (
    <>
      <div className="flex px-2 font-bold mt-3">
        <p className="flex-1">Task Name</p>
        <p className="flex-1">Projects</p>
        <p className="flex-1">Start Time</p>
        <p className="flex-1">End Time</p>
      </div>
      {filteredProjectDetails.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </>
  );
};

export default ProjectTable;
