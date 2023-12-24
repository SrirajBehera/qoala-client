import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../features/firebase";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styles from "./ScannerScreen.module.css";
import ReactJson from "@microlink/react-json-view";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ScannerScreen = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apiOCRData, setApiOCRData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB in bytes
    const fileSize = file.size;
    if (fileSize > maxSizeInBytes) {
      // fileSize > 2MB then show popup message
      alert(
        `File size is too large, please upload an image with a size less than 2MB.\nSelected File Size: ${
          fileSize / 1024 / 1024
        }MB`
      );
      return;
    }

    // Upload file and metadata to the object 'images/mountains.jpg'
    // const storageRef = ref(storage, "images/" + file.name);
    // const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgresspercent(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            console.log("User doesn't have permission to access the object");
            alert("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            // User canceled the upload
            console.log("User canceled the upload");
            alert("User canceled the upload");
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            console.log("Unknown error occurred: ", error.serverResponse);
            alert("Unknown error occurred");
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImgUrl(downloadURL);
          //   runOCR();
        });
      }
    );
  };

  const token = localStorage.getItem("@jwt-token");

  const link_data = {
    image_link: imgUrl,
  };

  const runOCR = async () => {
    setLoading(true);
    await axios
      .post(import.meta.env.VITE_PROD_URL + "createdoc", link_data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const resp = JSON.stringify(response.data.document);
        setApiOCRData(response.data.document);
        setLoading(false);
        console.log("runOCR response: " + resp);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error runOCR response: ", err);
      });
  };

  const my_json_object = {
    message: "sample data",
    identification_number: "4 7363 39613 02 7",
    name: "Mr. Rotngern",
    last_name: "Yoopm",
    "date-of-birth": "31/03/2006",
    "date-of-issue": "15/09/2020",
    "date-of-expiry": "05/02/2026",
  };

  return (
    <div className={styles.container}>
      <span className={styles.back}>
        <span>S</span>
        <span>c</span>
        <span>a</span>
        <span>n</span>
        <span>-</span>
        <span>T</span>
        <span>h</span>
        <span>a</span>
        <span>i</span>
      </span>
      <h3 className={styles.underline_effect}>Scan your ID Card through OCR</h3>
      <div className={styles.subContainer}>
        <div className={styles.left}>
          <span>Allowed images (PNG, JPEG, JPG) with a 2MB size limit</span>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              className={styles.uploadBtn}
            >
              Select file
              <VisuallyHiddenInput
                type="file"
                accept="image/png, image/jpg, image/jpeg"
              />
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
          {!imgUrl && (
            <div className="outerbar">
              <div className="innerbar">{progresspercent}% uploaded</div>
            </div>
          )}
          {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
        </div>
        <div className={styles.right}>
          <span>OCR results will appear below</span>
          <ReactJson
            src={apiOCRData ? apiOCRData : my_json_object}
            theme={"shapeshifter"}
          />
        </div>
      </div>
    </div>
  );
};

export default ScannerScreen;
