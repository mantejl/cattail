import { useState, useEffect } from "react";
import { stg } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const Moodboard = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(stg, "images/");

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(stg, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      const promises = response.items.map((item) =>
        getDownloadURL(item).then((url) => url)
      );

      Promise.all(promises).then((urls) => {
        setImageList(urls);
      });
    });
  }, []);

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
        {imageList.map((url, index) => (
          <a key={index} href={url} target="_blank" rel="noopener noreferrer">
            <img
              src={url}
              className="w-32 h-32 object-cover m-2 p-5"
              alt={`Image ${index + 1}`}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Moodboard;
