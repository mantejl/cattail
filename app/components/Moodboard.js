import { useState, useEffect } from "react";
import { stg } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { database } from "../firebase";
import { ref as dbRef, get, set, onValue } from "firebase/database";

const Moodboard = ({ projectID }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const projectImageUrlsRef = dbRef(
    database,
    `users/Elissa/projects/${projectID}/imageUrls`
  );

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
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload Image</button>
      <div className="flex overflow-x-auto">
        {imageList.map((image, index) => (
          <a
            key={index}
            href={image.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={image.url}
              alt={image.name}
              className="w-32 h-32 object-cover m-2 p-5"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Moodboard;
