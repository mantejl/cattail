"use client";

import React, { useState } from "react";
import { Button, Card } from "flowbite-react";
import NavBar from "../components/NavBar";
import KanbanBoard from "../components/KanbanBoard";
import FileUpload from "../components/FileUpload";
import Logo from "../components/Logo";

export default function Profile() {
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="text-center">
        <div
          className="mt-4 flex justify-center rounded-full overflow-hidden w-24 h-24"
          styles={{ paddingLeft: "20%" }}
        >
          <Logo size="small" />
        </div>

        <div className="mt-8">
          <h1 className="text-2xl font-bold">
            Success! You've requested a project from Elissa.
          </h1>
          <h1
            className="text-lg mt-10 w-80 ml-10"
            style={{ paddingLeft: "17%" }}
          >
            A confirmation email containing your request details has been
            forwarded to you. You will be notified via email if your request is
            accepted, denied, or if further discussion is needed!
          </h1>
          <h1 className="text-lg mt-10" style={{ color: "#C3500F" }}>
            Thanks for using Cattail.{" "}
            <a
              href="https://google.com"
              style={{ color: "#C3500F", textDecoration: "underline" }}
            >
              Learn More
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
}
