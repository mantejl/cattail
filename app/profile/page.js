"use client"

// ... (your existing imports)
import React from 'react';
import NavBar from '../components/NavBar';
import KanbanBoard from '../components/KanbanBoard';
import FileUpload from '../components/FileUpload';
import Moodboard from '../components/Moodboard';
import { FiMessageSquare, FiShare, FiEdit } from 'react-icons/fi';
import { Card } from 'flowbite-react';

// Profile component
export default function Profile() {
  return (
    <div className="relative grid grid-cols-4 gap-4">
      {/* NavBar section */}
      <div className="col-span-1">
        <NavBar />
      </div>

      {/* Main content area */}
      <div className="col-span-3 p-4">
        {/* Message icon, Share button, Edit toggle button in the upper right corner */}
        <div className="absolute top-14 right-4 p-4 flex items-center space-x-4 mt-[-2.0rem]">
          <FiMessageSquare className="text-gray-500" size={24} />
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Share</button>
          <button className="text-orange-500">
            <FiEdit size={24} />
          </button>
        </div>

        {/* Additional components (e.g., Moodboard) */}
        {/* Add your additional components here */}

        {/* Project 1 Container */}
        <div className="mb-8 mt-5">
          {/* Project 1 Header */}
          <h1 className="text-3xl font-semibold mb-4">Project 1</h1>

          {/* Flex container for "Tasks" and "Files" */}
          <div className="flex space-x-4">

            {/* Tasks Header and Kanban Board Card */}
            <div className="flex flex-col w-full">
              <h2 className="text-2xl font-semibold mb-1">Tasks</h2>
              <Card className="flex-shrink-0">
                <div className="p-2">
                  <KanbanBoard />
                </div>
              </Card>
            </div>

            {/* Files Header and File Upload Card */}
            <div className="flex flex-col w-full">
              <h2 className="text-2xl font-semibold mb-4">Files</h2>
              <Card className="flex-shrink-0">
                <div className="p-4">
                  <FileUpload />
                </div>
              </Card>
            </div>

          </div>
        </div>

        {/* Flex container for "Moodboard" */}
        <div className="flex flex-col mt-4">

          {/* Moodboard Header and Moodboard Card */}
          <div className="flex flex-col w-full">
            <h2 className="text-2xl font-semibold mb-4">Moodboard</h2>
            <Card className="flex-shrink-0">
              <div className="p-4">
                <Moodboard />
              </div>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
