import { useState } from "react";
import { RhDrawer, RhButton } from "@rhythm-ui/react";
import ProjectDetails from "./ProjectDetails";

export default function Selector({ getData }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex justify-end p-4 m-4 ">
        <RhButton size="sm" className="w-20 h-10" onClick={handleAddClick}>
          Add
        </RhButton>
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
        <ProjectDetails onClose={() => setIsOpen(false)} getData={getData} />
      </RhDrawer>
    </>
  );
}
