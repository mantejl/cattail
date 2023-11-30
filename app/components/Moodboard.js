import { useState, useEffect } from "react";
import { stg } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { database } from "../firebase";
import { ref as dbRef, get, set, onValue } from "firebase/database";
import Modal from "react-modal";
import Draggable from "react-draggable";

const Moodboard = ({ projectID }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const projectImageUrlsRef = dbRef(
    database,
    `users/Elissa/projects/${projectID}/imageUrls`
  );

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(stg, `/images/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        get(projectImageUrlsRef).then((snapshot) => {
          const currentImageUrls = snapshot.val() || [];
          set(projectImageUrlsRef, [...currentImageUrls, url]);
        });

        setImageList((prev) => [...prev, { url }]);
        setImageUpload(null);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  useEffect(() => {
    const projectImageUrlsRef = dbRef(
      database,
      `users/Elissa/projects/${projectID}/imageUrls`
    );

    onValue(projectImageUrlsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const imageUrls = Object.entries(data).map(([name, url]) => ({
        name,
        url,
      }));
      setImageList(imageUrls);
    });
  }, [projectID]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <style jsx>{`
          .custom-file-upload {
            display: inline-block;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            padding: 8px 12px;
            color: white;
            border-radius: 15px;
            background-color: #c3500f;
          }

          .custom-file-upload input {
            display: none;
          }
        `}</style>
        <label
          htmlFor="imageInput"
          className="custom-file-upload"
          style={{ marginRight: "10px" }}
        >
          <span>Choose an image</span>
          <input
            type="file"
            id="imageInput"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
            style={{ display: "none" }}
          />
        </label>
        {imageUpload && (
          <p
            style={{
              marginRight: "10px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Selected image: {imageUpload.name}
          </p>
        )}
        <button
          onClick={uploadImage}
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            padding: "8px 12px",
            backgroundColor: "#C3500F",
            color: "white",
            borderRadius: "15px",
            marginTop: "2px",
          }}
        >
          Upload Image
        </button>
      </div>

      <div className="flex overflow-x-auto">
        {imageList.map((image, index) => (
          <div
            key={index}
            onClick={() => openModal(image)}
            style={{ cursor: "grab" }}
          >
            <img
              src={image.url}
              alt={image.name}
              className="w-32 h-32 object-cover m-2 p-5 rounded-full"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            color: "white",
          },
        }}
      >
        {selectedImage && (
          <img src={selectedImage.url} alt={selectedImage.name} />
        )}
        <button
          onClick={closeModal}
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#C3500F",
            border: "none",
            borderRadius: "5px",
            padding: "15px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Moodboard;
