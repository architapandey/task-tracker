import React from "react";
import { RhDivider, RhIcon } from "@rhythm-ui/react";
import timeline from "../assets/task.svg";
import Image from "next/image";

function drawerContent({ userData, setIsEditMode }) {
  return (
    <div className="p-4 bg-[#2E2D2D] text-white">
      <div className="flex justify-between items-center pb-3">
        <h2 className="p-1 m-1 text-white">Details</h2>
        <RhIcon
          icon="material-symbols:edit-outline"
          width="24"
          height="24"
          className="text-2xl "
          onClick={() => setIsEditMode(true)}
        />
      </div>
      <RhDivider width="lg" />
      <p className="mt-8 py-1 px-3 text-xl">
        <b>Project Name: </b>
        {userData?.projectName}
      </p>

      <p className="mt-1 py-1 px-3 text-xl">
        <b>Project Details: </b>
        {userData?.projectDetails}
      </p>
      <p className="mt-1 py-1 px-3 text-xl">
        <b>Start-Time: </b>
        {userData?.startTime}
      </p>
      <p className="mt-1 py-1 px-3 text-xl">
        <b>End-Time: </b>
        {userData?.endTime}
      </p>
      <p className="mt-1 py-1 px-3 text-xl">
        <b>Date: </b>
        {userData?.date}
      </p>
      <div className="flex items-end justify-end ">
        <Image
          src={timeline}
          height={400}
          className="transform translate-y-4"
        />
      </div>
    </div>
  );
}
export default drawerContent;
