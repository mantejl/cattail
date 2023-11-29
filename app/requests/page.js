"use client";

// Import necessary components and icons
import React, { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard";
import { ref, get, set, onValue } from "firebase/database";
import { database } from "../firebase";
import NavBar from "../components/NavBar";
import { FiMessageSquare, FiShare, FiEdit } from 'react-icons/fi';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const requestsRef = ref(database, "users/Elissa/requests");

    onValue(requestsRef, (snapshot) => {
      if (snapshot.exists()) {
        const requestsData = snapshot.val();
        const requestsArray = Object.keys(requestsData).map((key) => ({
          id: key,
          ...requestsData[key],
        }));
        setRequests(requestsArray);
      } else {
        setRequests([]);
      }
    });
    return () => {};
  }, []);

  const handleRequestRefer = async (referralEmail, requestId) => {
    console.log(`Referring project to ${referralEmail}`);

    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
    );

    const requestRef = ref(database, `users/Elissa/requests/${requestId}`);
    await set(requestRef, null);
  };

  const handleDeleteRequest = async (requestId) => {
    console.log(`Deleting project with ID ${requestId}`);

    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
    );

    const requestRef = ref(database, `users/Elissa/requests/${requestId}`);
    await set(requestRef, null);
  };

  return (
    <div className="relative">
      <div className="flex items-start gap-14 min-h-screen overflow-y-auto p-4">
        {/* Include the NavBar component here */}
        <NavBar />

        {/* Edit Form and Share Form Buttons */}
        <div className="absolute top-0 right-0 p-4 space-x-4">
          {/* Edit Form Button */}
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Edit Form</button>

          {/* Share Form Button */}
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Share Form</button>
        </div>

        <div className="mt-8">
          {/* Larger Request Header */}
          <h2 className="text-3xl font-bold mb-4">Requests</h2>

          {/* Request Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                onRequestRefer={(referralEmail) =>
                  handleRequestRefer(referralEmail, request.id)
                }
                onDeleteRequest={() => handleDeleteRequest(request.id)}
                {...request}
                // Adjust the styles for smaller cards
                className="p-4 bg-white shadow-md rounded-md max-w-xs"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
