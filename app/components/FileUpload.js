import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { stg } from "../firebase";
import { DocumentIcon } from "@heroicons/react/outline";

const FileUpload = () => {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileUrls, setFileUrls] = useState([]);

  const filesListRef = ref(stg, "files/");

  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref(stg, `files/${fileUpload.name}`);
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileUrls((prev) => [...prev, { url, name: fileUpload.name }]);
      });
    });
  };

  useEffect(() => {
    listAll(filesListRef).then((response) => {
      const promises = response.items.map((item) =>
        getDownloadURL(item).then((url) => ({
          url,
          name: item.name.split("/").pop(),
        }))
      );

      Promise.all(promises).then((files) => {
        setFileUrls(files);
      });
    });
  }, []);

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
