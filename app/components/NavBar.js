'use client'

// Import necessary components and icons
import React from 'react';
import { Sidebar, Card } from 'flowbite-react';
import { HiChartPie, HiInbox, HiArrowSmRight, HiShoppingBag, HiUser } from 'react-icons/hi';

const NavBar = () => {
  return (
    <Card className="max-w-xs bg-gray-100 shadow-md rounded-md p-4 h-screen">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items style={{ color: 'gray', fontSize: '14px' }}>
          <Sidebar.ItemGroup>

            <Sidebar.Item href="#" style={{ marginBottom: '8px', textAlign: 'left', paddingLeft: '28px' }}>
              ELISSSA MARTIAL
            </Sidebar.Item>

            <Sidebar.Item href="#" icon={HiChartPie} style={{ marginBottom: '8px', textAlign: 'left' }}>
              Dashboard
            </Sidebar.Item>

            <Sidebar.Item href="#" icon={HiInbox} style={{ marginBottom: '8px', textAlign: 'left' }}>
              Requests
            </Sidebar.Item>

            <Sidebar.Item href="#" icon={HiArrowSmRight} style={{ marginBottom: '8px', textAlign: 'left' }}>
              New Project
            </Sidebar.Item>

            <Sidebar.Collapse label="Projects" style={{ marginBottom: '8px', paddingLeft: '32px' }}>
              <Sidebar.Item href="#" style={{ paddingLeft: '45px', textAlign: 'left' }}>
                Project 1
              </Sidebar.Item>
              <Sidebar.Item href="#" style={{ paddingLeft: '45px', textAlign: 'left' }}>
                Project 2
              </Sidebar.Item>
              <Sidebar.Item href="#" style={{ paddingLeft: '45px', textAlign: 'left' }}>
                Project 3
              </Sidebar.Item>
              <Sidebar.Item href="#" style={{ paddingLeft: '45px', textAlign: 'left' }}>
                Project 4
              </Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Item href="#" icon={HiShoppingBag} style={{ marginBottom: '8px', textAlign: 'left' }}>
              Help
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </Card>
  );
};

export default NavBar;
