import React from "react";
import { RhDivider, RhIcon } from "@rhythm-ui/react";
import timeline from "../assets/task.svg";
import Image from "next/image";

function drawerContent({ userData, setIsEditMode }) {
  return (
    <div className="p-2  bg-[#2E2D2D] text-white h-[100vh] flex justify-between flex-col">
      <div>
        <div className="flex flex-col justify-between ml-2">
          <div className="flex justify-between items-center pb-2">
            <p className="mt-8 py-1 px-3 text-2xl">{userData?.projectName}</p>
            <RhIcon
              icon="material-symbols:edit-outline"
              width="24"
              height="24"
              className="text-2xl "
              onClick={() => setIsEditMode(true)}
            />
          </div>
          <p className="text-lg p-0 m-0 ml-2">{userData?.date}</p>
        </div>

        <div
          className="mt-4 py-1 px-3 text-xl "
          dangerouslySetInnerHTML={{ __html: userData?.projectDetails }}
        />
        <div className="flex w-[200px] h-[80px] ml-2 gap-3  ">
          <div className="flex-1  text-white border border-white rounded-md ">
            <p className="text-xl text-center ">{userData?.startTime} </p>
          </div>
          <div className="flex-1  text-white border border-white rounded-md ">
            <p className=" text-xl text-center">{userData?.endTime} </p>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-end ">
        <Image
          src={timeline}
          height={400}
          // className="transform translate-y-4"
        />
      </div>
    </div>
  );
}
export default drawerContent;
