import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { stg } from "../firebase";
import { DocumentIcon } from "@heroicons/react/outline";
import { database } from "../firebase";
import { runTransaction, ref as dbRef, get, set } from "firebase/database";

const FileUpload = ({ projectID }) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileUrls, setFileUrls] = useState([]);

  const filesListRef = ref(stg, `files/${projectID}/`);
  const projectFileUrlsRef = dbRef(
    database,
    `users/Elissa/projects/${projectID}/fileUrls`
  );

  const sanitizeFileName = (fileName) => {
    return fileName.replace(/[.#$/[\]]/g, "_");
  };

  const uploadFile = async () => {
    if (fileUpload == null) return;
    const sanitizedFileName = sanitizeFileName(fileUpload.name);
    const fileRef = ref(stg, `files/${sanitizedFileName}`);

    try {
      const snapshot = await uploadBytes(fileRef, fileUpload);
      const url = await getDownloadURL(snapshot.ref);

      await runTransaction(projectFileUrlsRef, (currentData) => {
        const newFileUrls = { ...currentData, [sanitizedFileName]: url };
        return newFileUrls;
      });

      const updatedSnapshot = await get(projectFileUrlsRef);
      const updatedFileUrls = updatedSnapshot.val() || {};
      setFileUrls(
        Object.entries(updatedFileUrls).map(([name, url]) => ({ name, url }))
      );
    } catch (error) {
      console.error("Error updating file URLs:", error);
    }
  };

  useEffect(() => {
    get(projectFileUrlsRef)
      .then((snapshot) => {
        const fileUrls = snapshot.val() || {};
        setFileUrls(
          Object.entries(fileUrls).map(([name, url]) => ({ name, url }))
        );
      })
      .catch((error) => {
        console.error("Error fetching file URLs:", error);
      });
  }, [projectID]);

  return (
    <div>
      <div>
        <input
          type="file"
          onChange={(event) => {
            setFileUpload(event.target.files[0]);
          }}
        />
        <button onClick={uploadFile}> Upload File</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {fileUrls.map((file, index) => (
          <div key={index} className="flex items-center space-x-2 pt-6">
            <DocumentIcon className="w-4 h-4" />
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
