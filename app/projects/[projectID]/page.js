"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMessageSquare, FiShare, FiEdit } from "react-icons/fi";
import { Card } from "flowbite-react";
import NavBar from "../../components/NavBar";
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
    <div className="grid grid-cols-4 gap-8">
      <div className="col-span-1">
        <NavBar />
      </div>

      <div className="col-span-3 pr-20">
        <div className="absolute top-14 right-4 p-4 flex items-center space-x-4 mt-[-2.0rem]">
          <FiMessageSquare style={{ color: "#c3500f" }} size={24} />
          <button
            className="text-white px-4 py-2 rounded-md"
            style={{ backgroundColor: "#c3500f" }}
          >
            Share
          </button>
          <button style={{ color: "#c3500f" }}>
            <FiEdit size={24} />
          </button>
        </div>

        <div className="mb-8 mt-10">
          <h1 className="text-3xl font-semibold mb-10 text-center pr-60">
            Project: {projectTitle}
          </h1>

          <div className="flex space-x-4">
            <div className="flex flex-col w-full">
              <h2 className="text-2xl font-semibold mb-4 text-center">Tasks</h2>
              <Card className="flex-shrink-0">
                <div className="p-2">
                  <KanbanBoard projectID={projectID} />
                </div>
              </Card>
            </div>

            <div className="flex flex-col w-full">
              <h2 className="text-2xl font-semibold mb-4 text-center">Files</h2>
              <Card className="flex-shrink-0">
                <div className="p-4">
                  <FileUpload projectID={projectID} />
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-20 mb-20">
          <div className="flex flex-col w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Moodboard
            </h2>
            <Card className="flex-shrink-0 bg-gray-200">
              <div className="p-4">
                <Moodboard projectID={projectID} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
