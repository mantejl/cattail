import React, { useState } from "react";
import { Button, Card, Modal, TextInput } from "flowbite-react";

const RequestCard = ({
  timestamp,
  title,
  requestedBy,
  email,
  estimatedPrice,
  characterFraming,
  backgroundType,
  deadline,
  numberOfCharacters,
  details,
  onRequestRefer,
  onDeleteRequest,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [referralEmail, setReferralEmail] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openReferralModal = () => {
    setIsReferralModalOpen(true);
  };

  const closeReferralModal = () => {
    setIsReferralModalOpen(false);
    setReferralEmail(""); // Reset the email input
  };

  const handleReferral = () => {
    openReferralModal();
  };

  const handleReferralSubmit = () => {
    // Perform validation on the email (e.g., format validation)
    // If valid, perform the referral and update the UI and backend
    onRequestRefer(referralEmail);
    closeReferralModal();
  };

  const handleDeleteRequest = () => {
    // Perform deletion logic (both UI and backend)
    onDeleteRequest();
  };

  return (
    <Card className="max-w-md p-4 bg-white shadow-md rounded-md">
      <p className="text-gray-500 font-normal text-sm mb-2">{timestamp}</p>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <div className="text-gray-500 font-normal text-sm mb-2">REQUESTED BY</div>
      <div className="mb-2">
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {requestedBy}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">{email}</p>
      </div>
      <div className="mb-1">
        <p className="text-gray-500 font-normal text-sm mb-1">
          ESTIMATED PRICE
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {estimatedPrice}
        </p>
      </div>
      <div className="flex mt-4">
        <Button className="mr-2" style={{ backgroundColor: "orange" }}>
          Accept
        </Button>
        <Button
          style={{
            color: "black",
            backgroundColor: "white",
            border: "2px solid orange",
          }}
          onClick={handleReferral}
        >
          Refer
        </Button>
        <Button onClick={openModal} className="mt-4">
          View Details
        </Button>
        <Button onClick={handleDeleteRequest} className="mt-4">
          Delete
        </Button>
      </div>

      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Body>
          <p>Project Title: {title}</p>
          <p>Requested By: {requestedBy}</p>
          <p>Email: {email}</p>
          <p>Deadline: {deadline}</p>
          <p>Background Type: {backgroundType}</p>
          <p>Character Framing: {characterFraming}</p>
          <p>Deadline: {deadline}</p>
          <p>Details: {details}</p>
          <p>Number of Characters: {numberOfCharacters}</p>
          <Button onClick={closeModal} className="mt-4">
            Close
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={isReferralModalOpen} onClose={closeReferralModal}>
        <Modal.Body>
          <p>
            Please enter the email of the person you want to refer this project
            to:
          </p>
          <TextInput
            type="email"
            value={referralEmail}
            onChange={(e) => setReferralEmail(e.target.value)}
          />
          <Button onClick={handleReferralSubmit} className="mt-4">
            Refer
          </Button>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default RequestCard;
