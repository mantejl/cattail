"use client";

import React, { useState } from "react";
import { Button, Card } from "flowbite-react";
import NavBar from "../components/NavBar";
import KanbanBoard from "../components/KanbanBoard";
import FileUpload from "../components/FileUpload";
import Timeline from "../components/Timeline";

export default function GeneralDashboard() {
  return (
    <div className="flex items-start gap-4 min-h-screen overflow-y-auto p-4">
      {/* Include the NavBar component here */}
      <NavBar />

      <div>
        {/* Welcome Back Header */}
        <h2 className="text-2xl font-semibold mb-6">Welcome Back, Elissa</h2>

        {/* Welcome Card */}
        <Card className="max-w-lg p-2 bg-white shadow-md rounded-md">
          {/* Time Stamp */}
          <p className="text-gray-500 font-normal text-sm mb-1">2 days ago</p>

          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            Welcome to Cattail!
          </h5>

          {/* Subheader */}
          <div className="text-gray-500 font-normal text-sm mb-2">
            Here are some quick steps to get started.
          </div>

          {/* Two Vertical Cards */}
          <div className="grid grid-cols-1 gap-4 mt-2">
            {/* First Card */}
            <Card className="bg-gray-100 p-2 rounded-md">
              <h6 className="text-lg font-bold text-gray-800 mb-1 leading-snug">
                Customize your dashboard
              </h6>
              <p className="text-gray-700 mb-0.5 leading-snug">
                Drag and drop from our library of modules to layout your page in
                the way you want.
              </p>
            </Card>

            {/* Second Card */}
            <Card className="bg-gray-100 p-2 rounded-md">
              <h6 className="text-lg font-bold text-gray-800 mb-1 leading-snug">
                Set up your project form
              </h6>
              <p className="text-gray-700 mb-0.5 leading-snug">
                Use one of our freelancer templates or build your form from
                scratch so you can start receiving project requests.
              </p>
            </Card>
          </div>
        </Card>
      </div>

      <div>
        {/* Kanban Board */}
        <Card className="p-4 mt-4">
          <h2 className="text-2xl font-semibold mb-4">Kanban Board</h2>
          <KanbanBoard />
        </Card>

        {/* Timeline */}
        <Card className="p-4 mt-6">
          <h2 className="text-2xl font-semibold mb-4">Timeline</h2>
          <Timeline />
        </Card>

        {/* File Upload Card */}
        <Card className="p-4 mt-6">
          <h2 className="text-2xl font-semibold mb-4">File Upload</h2>
          <FileUpload />
        </Card>
      </div>
    </div>
  );
}
