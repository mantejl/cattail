'use client'

// ... (your existing imports)
import React, { useState } from 'react';
import { Button, Card } from 'flowbite-react';
import NavBar from '../components/NavBar';
import KanbanBoard from '../components/KanbanBoard';
import FileUpload from '../components/FileUpload';
import Logo from '../components/logo';

export default function Profile() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center">
          <Logo size="small" />
  
          <div className="mt-8">
            <h1 className="text-2xl font-bold">
              Thank you for submitting the form!
            </h1>
            <h1 className="text-2xl font-bold">
              You will hear back shortly from Elissa Martial!
            </h1>
          </div>
        </div>
      </div>
    );
  }