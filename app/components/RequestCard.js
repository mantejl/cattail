'use client'

import React from 'react';
import { Button, Card } from 'flowbite-react';
// ... (your existing imports)

const Request = () => {
  return (
    <Card className="max-w-md p-4 bg-white shadow-md rounded-md">
      {/* Time Stamp */}
      <p className="text-gray-500 font-normal text-sm mb-2">
        2 days ago
      </p>

      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Harry Potter Character Design Project
      </h5>

      {/* Subheader */}
      <div className="text-gray-500 font-normal text-sm mb-2">
        REQUESTED BY
      </div>

      {/* Name and Email */}
      <div className="mb-2">
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Sarah Winston
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          sarahwinston@penguinbooks.edu
        </p>
      </div>

      {/* Estimated Price */}
      <div className="mb-1">
        <p className="text-gray-500 font-normal text-sm mb-1">
          ESTIMATED PRICE
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          $375
        </p>
      </div>

      {/* Buttons side by side */}
      <div className="flex mt-4">
        {/* Accept Button */}
        <Button className="mr-2" style={{ backgroundColor: '#C3500F' }}>
          Accept
        </Button>

        {/* Request Button (Outlined with Orange Border) */}
        <Button style={{ color: '#C3500F', border: '2px solid #C3500F', backgroundColor: 'white' }}>
          Request
        </Button>
      </div>
    </Card>
  );
};

export default Request;