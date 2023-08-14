import { useState } from "react";
import { RhDrawer, RhButton } from "@rhythm-ui/react";
import ProjectDetails from "./ProjectDetails";
import { useRouter } from "next/router";

export default function Selector() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleAddClick = () => {
    setIsOpen(true);
  };
  const handleSignOutClick = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <div className="flex justify-end p-4 m-4 gap-5  ">
        <RhButton size="sm" className="w-20 h-10" onClick={handleAddClick}>
          Add
        </RhButton>
        <RhButton size="sm" className="w-20 h-10" onClick={handleSignOutClick}>
          SignOut
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
        <ProjectDetails
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
          isEditFlow={false}
        />
      </RhDrawer>
    </>
  );
}
