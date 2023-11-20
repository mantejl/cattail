'use client'; 

import React from 'react';
import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

const NavBar = () => {
    return (
        <Sidebar aria-label="Sidebar with multi-level dropdown example" style={{ textAlign: 'left' }}>
            <Sidebar.Items style={{ color: 'gray', padding: '20px' }}>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={HiChartPie} style={{ marginBottom: '10px' }}>
                        Dashboard
                    </Sidebar.Item>
                    <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce" style={{ marginBottom: '10px' }}>
                        <Sidebar.Item href="#">Products</Sidebar.Item>
                        <Sidebar.Item href="#">Sales</Sidebar.Item>
                        <Sidebar.Item href="#">Refunds</Sidebar.Item>
                        <Sidebar.Item href="#">Shipping</Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Item href="#" icon={HiInbox} style={{ marginBottom: '10px' }}>
                        Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiUser} style={{ marginBottom: '10px' }}>
                        Requests
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiShoppingBag} style={{ marginBottom: '10px' }}>
                        New Project
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiArrowSmRight} style={{ marginBottom: '10px' }}>
                        Archived
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiTable} style={{ marginBottom: '10px' }}>
                        Import
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={HiChartPie} style={{ marginBottom: '10px' }}>
                        Help
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiViewBoards} style={{ marginBottom: '10px' }}>
                        Documentation
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={BiBuoy} style={{ marginBottom: '10px' }}>
                        Help
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default NavBar;
