"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import KanbanBoard from "../../components/KanbanBoard";
import FileUpload from "../../components/FileUpload";
import Moodboard from "../../components/Moodboard";
import { database } from "../../firebase";
import { ref, get } from "firebase/database";

export default function ProjectPage({ params }) {
  const router = useRouter();
  const projectID = params.projectID;
  const [projectTitle, setProjectTitle] = useState(null);

  const projectTitleRef = ref(
    database,
    `users/Elissa/projects/${projectID}/title`
  );

  useEffect(() => {
    const fetchProjectTitle = async () => {
      try {
        const projectTitleSnapshot = await get(projectTitleRef);
        const title = projectTitleSnapshot.val();
        setProjectTitle(title);
      } catch (error) {
        console.error("Error fetching project title:", error);
      }
    };

    fetchProjectTitle();
  }, [projectID, projectTitleRef]);

  if (projectTitle === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="font-bold font-sans text-center text-3xl">
        Project: {projectTitle}
      </h2>
      <div className="col-span-1">
        <KanbanBoard projectID={projectID} />
      </div>
      <div className="col-span-1 pt-5">
        <FileUpload projectID={projectID} />
      </div>
      <div className="col-span-2 bg-gray-300 mt-40 p-4">
        <Moodboard projectID={projectID} />
      </div>
    </div>
  );
}
