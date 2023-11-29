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
    <Card className="max-w-xs bg-white shadow-md rounded-md">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items style={{ color: "gray" }}>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              icon={HiChartPie}
              style={{ marginBottom: "8px", textAlign: "left" }}
            >
              Dashboard
            </Sidebar.Item>

            <Sidebar.Item
              href="#"
              icon={HiInbox}
              style={{ marginBottom: "8px", textAlign: "left" }}
            >
              Requests
            </Sidebar.Item>

            <Sidebar.Item
              href="#"
              icon={HiArrowSmRight}
              style={{ marginBottom: "8px", textAlign: "left" }}
            >
              New Project
            </Sidebar.Item>

            <Sidebar.Collapse
              icon={HiShoppingBag}
              label="Projects"
              style={{ marginBottom: "8px" }}
            >
              {projects.map((project, index) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Sidebar.Item
                    style={{ textAlign: "left", cursor: "pointer" }}
                  >
                    Project {index + 1}
                  </Sidebar.Item>
                </Link>
              ))}
            </Sidebar.Collapse>

            <Sidebar.Item
              href="#"
              icon={HiInbox}
              style={{ marginBottom: "8px", textAlign: "left" }}
            >
              Archived
            </Sidebar.Item>

            <Sidebar.Item
              href="#"
              icon={HiUser}
              style={{ marginBottom: "8px", textAlign: "left" }}
            >
              Import
            </Sidebar.Item>

            <Sidebar.Item
              href="#"
              icon={HiShoppingBag}
              style={{ marginBottom: "8px", textAlign: "left" }}
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
