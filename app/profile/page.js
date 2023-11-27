"use client";
import KanbanBoard from "../components/KanbanBoard";
import FileUpload from "../components/FileUpload";
import Moodboard from "../components/Moodboard";

export default function Profile() {
  return (
    <div className="grid grid-cols-2 p-20 mb-8">
      <div className="col-span-1">
        <KanbanBoard />
      </div>
      <div className="col-span-1 pt-5">
        <FileUpload />
      </div>
      <div className="col-span-2 bg-gray-300 mt-40 p-4">
        <Moodboard />
      </div>
    </div>
  );
}
