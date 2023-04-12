import React, { useState } from "react";
import { RhButton, RhInput } from "@rhythm-ui/react";

export default function AddProjectModal({ onClose, onAddProjectOption }) {
  const [newProjectName, setNewProjectName] = useState("");

  const handleCancel = () => {
    onClose();
  };

  const handleAddProject = () => {
    if (newProjectName.trim() !== "") {
      const newOption = { label: newProjectName, value: newProjectName };
      onAddProjectOption(newOption);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black opacity-75 z-30">
      <div className="bg-white p-4 m-4 rounded-lg shadow-lg absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-lg font-medium mb-4">Add Project</h2>
        <RhInput
          input="text"
          name="newProjectName"
          placeholder="Project Name"
          className="m-4 p-4 "
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <div className="flex justify-end">
          <RhButton className="mr-2" onClick={handleCancel}>
            Cancel
          </RhButton>
          <RhButton onClick={handleAddProject}>Add</RhButton>
        </div>
      </div>
    </div>
  );
}
