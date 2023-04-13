import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";
import { RhDivider, RhDrawer } from "@rhythm-ui/react";
import ProjectDetails from "./ProjectDetails";

const DetailsPage = () => {
  const router = useRouter();
  const { projectName, startTime, projectDetails, endTime, clients } =
    router.query;
  const clientsArray = clients ? JSON.parse(clients) : [];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 m-6">
      <div className="flex justify-between items-center">
        <h2>{projectName}</h2>
        <FaEdit
          onClick={() => setIsOpen(true)}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
        />
      </div>
      <RhDivider></RhDivider>
      <h3>
        Project:{" "}
        {clientsArray.map((client, index) => (
          <span key={index}>
            {client}
            {index !== clientsArray.length - 1 ? ", " : ""}
          </span>
        ))}
      </h3>

      <div className=" h-100px border border-gray  p-4 mt-8">
        {projectDetails}
      </div>

      <div className="p-4 ">
        <h3>StartTime: {startTime}</h3>
        <h3>End Time: {endTime}</h3>
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
            ...router.query,
            clients: clientsArray?.map((client) => {
              return { label: client, value: client };
            }),
          }}
          onClose={() => setIsOpen(false)}
          isEditFlow
        />
      </RhDrawer>
    </div>
  );
};

export default DetailsPage;
