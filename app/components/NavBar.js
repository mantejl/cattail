'use client'

import React from 'react';
import { Sidebar, Card } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

const NavBar = () => {
    return (
        <Card className="max-w-xs bg-white shadow-md rounded-md p-4">
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
                <Sidebar.Items style={{ color: 'gray' }}>

                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={HiChartPie} style={{ marginBottom: '8px', textAlign: 'left' }}>
                            Dashboard
                        </Sidebar.Item>

                        <Sidebar.Item href="#" icon={HiInbox} style={{ marginBottom: '8px', textAlign: 'left' }}>
                            Requests
                        </Sidebar.Item>

                        <Sidebar.Item href="#" icon={HiArrowSmRight} style={{ marginBottom: '8px', textAlign: 'left' }}>
                            New Project
                        </Sidebar.Item>

                        <Sidebar.Collapse icon={HiShoppingBag} label="Pinned" style={{ marginBottom: '8px', paddingLeft: '90px' }}>
                            <Sidebar.Item href="#" style={{ paddingLeft: '45px', textAlign: 'left' }}>Project 1</Sidebar.Item>
                            <Sidebar.Item href="#" style={{ paddingLeft: '45px', textAlign: 'left' }}>Project 2</Sidebar.Item>
                        </Sidebar.Collapse>

                        <Sidebar.Collapse icon={HiShoppingBag} label="Projects" style={{ marginBottom: '8px', paddingLeft: '87px' }}>
                            <Sidebar.Item href="#" style={{ paddingLeft: '45px', textAlign: 'left' }}>Project 1</Sidebar.Item>
                            <Sidebar.Item href="#" style={{ paddingLeft: '45px', textAlign: 'left' }}>Project 2</Sidebar.Item>
                            <Sidebar.Item href="#" style={{ paddingLeft: '45px', textAlign: 'left' }}>Project 3</Sidebar.Item>
                            <Sidebar.Item href="#" style={{ paddingLeft: '45px', textAlign: 'left' }}>Project 4</Sidebar.Item>
                        </Sidebar.Collapse>

                        <Sidebar.Item href="#" icon={HiInbox} style={{ marginBottom: '8px', textAlign: 'left' }}>
                            Archived
                        </Sidebar.Item>

                        <Sidebar.Item href="#" icon={HiUser} style={{ marginBottom: '8px', textAlign: 'left' }}>
                            Import
                        </Sidebar.Item>

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

