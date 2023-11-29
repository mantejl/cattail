import React, { useState } from "react";
import { Button, Card, Modal, TextInput } from "flowbite-react";
import { database } from "../firebase";
import { ref, get, set, onValue, push } from "firebase/database";

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
  images,
  onRequestRefer,
  onDeleteRequest,
  onRequestAccept,
  requestKey,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [referralEmail, setReferralEmail] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [numberOfProjects, setNumberOfProjects] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  console.log("key is ", requestKey);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openReferralModal = () => {
    setIsReferralModalOpen(true);
  };

  const closeReferralModal = () => {
    setIsReferralModalOpen(false);
    setReferralEmail("");
  };

  const handleReferral = () => {
    openReferralModal();
  };

  const handleReferralSubmit = () => {
    onRequestRefer(referralEmail);
    closeReferralModal();
  };

  const handleDeleteRequest = () => {
    onDeleteRequest();
  };

  const handleAccept = async () => {
    const projectsRef = ref(database, `users/Elissa/projects/${requestKey}`);
    const snapshot = await get(projectsRef);
    const newProjectData = {
      title: title,
      tasks: {
        toDo: [],
        inProgress: [],
        done: [],
      },
      imageUrls: images,
      files: [],
    };

    await set(projectsRef, newProjectData);
    console.log("Project created successfully");

    onRequestAccept();
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
        <Button
          className="mr-2"
          style={{ backgroundColor: "orange" }}
          onClick={handleAccept}
        >
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
          Decline
        </Button>
      </div>

      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Body>
          <h3 className="text-xl font-bold mb-4">Project Details</h3>
          <form>
            <div className="mb-2">
              <label className="text-gray-500">Project Title:</label>
              <p>{title}</p>
            </div>
            <div className="mb-2">
              <label className="text-gray-500">Requested By:</label>
              <p>{requestedBy}</p>
            </div>
            <div className="mb-2">
              <label className="text-gray-500">Email:</label>
              <p>{email}</p>
            </div>
            <div className="mb-2">
              <label className="text-gray-500">Deadline:</label>
              <p>{deadline}</p>
            </div>
            <div className="mb-2">
              <label className="text-gray-500">Background Type:</label>
              <p>{backgroundType}</p>
            </div>
            <div className="mb-2">
              <label className="text-gray-500">Character Framing:</label>
              <p>{characterFraming}</p>
            </div>
            <div className="mb-2">
              <label className="text-gray-500">Details:</label>
              <p>{details}</p>
            </div>
            <div className="mb-2">
              <label className="text-gray-500">Number of Characters:</label>
              <p>{numberOfCharacters}</p>
            </div>
          </form>

          <div className="mt-4">
            <h5 className="text-lg font-semibold mb-2">Images</h5>
            <div className="flex space-x-4">
              {images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  className={`cursor-pointer ${
                    index === currentImageIndex
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
            {images.length > 0 && (
              <div className="mt-4">
                <img
                  src={images[currentImageIndex]}
                  alt={`Current Image`}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "400px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </div>
          <Button
            onClick={closeModal}
            className="mt-4"
            style={{ backgroundColor: "#C3500F", color: "white" }}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>

      <Modal
        dismissible
        show={isReferralModalOpen}
        onClose={closeReferralModal}
      >
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
