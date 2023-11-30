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
      setFileUpload(null);
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
        <style jsx>{`
          .custom-file-upload {
            display: inline-block;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            padding: 8px 12px;
            border: 2px solid white;
            color: white;
            border-radius: 15px;
            background-color: #c3500f;
          }

          .custom-file-upload input {
            display: none;
          }
        `}</style>

        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            htmlFor="fileInput"
            className="custom-file-upload"
            style={{ marginRight: "10px" }}
          >
            <span>Choose a file</span>
            <input
              type="file"
              id="fileInput"
              onChange={(event) => {
                setFileUpload(event.target.files[0]);
              }}
              style={{ display: "none" }}
            />
          </label>
          {fileUpload && (
            <p
              style={{
                marginRight: "10px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Selected file: {fileUpload.name}
            </p>
          )}
          <button
            onClick={uploadFile}
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
            Upload File
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {fileUrls.map((file, index) => (
          <div key={index} className="flex items-center space-x-2 pt-6">
            <DocumentIcon className="w-10 h-10" />
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {file.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
