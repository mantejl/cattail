"use client";

import { useRouter, useSearchParams } from "next/navigation";
import KanbanBoard from "../../components/KanbanBoard";
import FileUpload from "../../components/FileUpload";
import Moodboard from "../../components/Moodboard";

export default function ProjectPage({ params }) {
  const projectID = params.projectID;
  console.log(projectID);

  return (
    <div className="grid grid-cols-2 p-20 mb-8">
      <div className="col-span-1 pt-5">
        <FileUpload projectID={projectID} />
      </div>
    </div>
  );
  // return (
  //
  //     <div className="col-span-1">
  //       <KanbanBoard projectID={projectId} />
  //     </div>
  //     <div className="col-span-1 pt-5">
  //       <FileUpload projectID={projectId} />
  //     </div>
  //     <div className="col-span-2 bg-gray-300 mt-40 p-4">
  //       <Moodboard projectID={projectId} />
  //     </div>
  //   </div>
  // );
}
