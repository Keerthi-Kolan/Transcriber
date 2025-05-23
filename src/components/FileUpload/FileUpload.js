import { useState } from "react";
import { uploadData, getUrl } from "aws-amplify/storage";
import { post } from "aws-amplify/api";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadURL, setUploadURL] = useState("");
  const [fileKey, setFileKey] = useState("");
  const [transcribing, setTranscribing] = useState(false);
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("audio/")) {
      setFile(selectedFile);
      await uploadToS3(selectedFile);
    } else {
      alert("Please select a valid audio file.");
      e.target.value = "";
    }
  };

  const uploadToS3 = async (file) => {
    try {
      setUploading(true);
      const fileName = `${Date.now()}_${file.name}`;

      const result = await uploadData({
        key: fileName,
        data: file,
        options: {
          accessLevel: "protected", // or "private", "public"
          contentType: file.type,
        },
      }).result;

      console.log("Upload success:", result);
      setFileKey(fileName);
      const { url } = await getUrl({
        key: fileName,
        options: {
          accessLevel: "protected",
        },
      });

      setUploadURL(url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };
  const startTranscription = async () => {
    try {
      const response = await post({
        apiName: "transcriptionapi", // Your API name from Amplify
        path: "/transcribe",
        options: {
          body: { fileName: fileKey },
        },
      }).response;

      const data = await response.body.json();
      console.log("Transcription started:", data);
      alert("Transcription job started!");
    } catch (err) {
      console.error("Failed to start transcription:", err);
      alert("Error starting transcription.");
    }
  };

  return (
    <div className="main">
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {uploadURL && (
        <div>
          <p>Uploaded!</p>
          <audio controls src={uploadURL}></audio>
          <div>
            <br></br>
            <button onClick={startTranscription}>Transcribe</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
