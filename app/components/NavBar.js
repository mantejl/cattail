"use client";

import React, { useEffect, useState } from "react";
import { Sidebar, Card } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import Link from "next/link";

import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

import { database } from "../firebase";
import { ref, get } from "firebase/database";

const NavBar = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const projectsRef = ref(database, "users/Elissa/projects");

    get(projectsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const projectData = snapshot.val();
        const projectList = Object.keys(projectData).map((projectId) => ({
          id: projectId,
        }));
        setProjects(projectList);
      }
    });
  }, []);

  return (
    <Card className="max-w-xs bg-gray-50 shadow-md rounded-md p-4 h-screen">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items style={{ color: "gray", fontSize: "14px" }}>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              style={{
                marginBottom: "8px",
                textAlign: "left",
                paddingLeft: "28px",
                fontWeight: "bold",
                fontSize: "24px", // Increased font size
              }}
            >
              Elissa Martial
            </Sidebar.Item>

            <Sidebar.Item
              href="/generaldashboard"
              icon={HiChartPie}
              style={{ marginBottom: "8px", textAlign: "left", fontSize: "18px" }}
            >
              Dashboard
            </Sidebar.Item>

            <Sidebar.Item
              href="/requests"
              icon={HiInbox}
              style={{ marginBottom: "8px", textAlign: "left", fontSize: "18px" }}
            >
              Requests
            </Sidebar.Item>

            <Sidebar.Collapse
              icon={HiShoppingBag}
              label="Projects"
              style={{ marginBottom: "8px" }}
            >
              {projects.map((project, index) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Sidebar.Item
                    style={{ textAlign: "left", cursor: "pointer", fontSize: "18px" }}
                  >
                    Project {index + 1}
                  </Sidebar.Item>
                </Link>
              ))}
            </Sidebar.Collapse>

            <Sidebar.Item
              href="#"
              icon={HiArrowSmRight}
              style={{ marginBottom: "8px", textAlign: "left", fontSize: "18px" }}
            >
              Help
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </Card>
  );
};

export default NavBar;
