"use client";

import React, { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard";
import { ref, get, set, onValue } from "firebase/database";
import { database } from "../firebase";
import NavBar from "../components/NavBar";

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

  const onRequestAccept = async (requestId) => {
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
        <NavBar />
        <div className="absolute top-0 right-0 p-4 space-x-4">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md">
            Edit Form
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md">
            Share Form
          </button>
        </div>
        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4 text-center">
            Requests
          </h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                onRequestAccept={() => onRequestAccept(request.id)}
                onRequestRefer={(referralEmail) =>
                  handleRequestRefer(referralEmail, request.id)
                }
                onDeleteRequest={() => handleDeleteRequest(request.id)}
                {...request}
                timestamp={request.timestamp}
                title={request.title}
                requestedBy={request.firstName + " " + request.lastName}
                email={request.email}
                estimatedPrice={request.budget}
                characterFraming={request.characterFraming}
                backgroundType={request.backgroundType}
                deadline={request.deadline}
                numberOfCharacters={request.numberOfCharacters}
                details={request.details}
                images={request.images}
                requestKey={request.id}
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
