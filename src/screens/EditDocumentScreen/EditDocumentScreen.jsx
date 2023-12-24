import React, { useEffect, useState } from "react";
import styles from "./EditDocumentScreen.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PublishIcon from "@mui/icons-material/Publish";
import { useNavigate, useLocation } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import moment from "moment";

const EditDocumentScreen = () => {
  const location = useLocation();
  const docid = location.state.docid;
  console.log("docid from navigation: ", docid);

  const navigate = useNavigate();

  const token = localStorage.getItem("@jwt-token");

  const [idNumber, setIdNumber] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [doi, setDoi] = useState("");
  const [doe, setDoe] = useState("");
  const [percentageSuccess, setPercentageSuccess] = useState("");
  const [rawData, setRawData] = useState("");
  const [imgLink, setImgLink] = useState("");

  const [loading, setLoading] = useState(false);

  const [formValid, setFormValid] = useState(false);

  const docData = {
    identification_number: idNumber,
    name: name,
    last_name: lastName,
    date_of_birth: dob,
    date_of_issue: doi,
    date_of_expiry: doe,
    success_level: percentageSuccess,
    raw_ocr_data: rawData,
    image_link: imgLink,
  };

  const isFormValid = () => {
    if (
      idNumber !== "" &&
      name !== "" &&
      lastName !== "" &&
      dob !== "" &&
      doi !== "" &&
      doe !== "" &&
      percentageSuccess !== "" &&
      rawData !== "" &&
      imgLink !== ""
    ) {
      setFormValid(true);
      return true;
    }
    setFormValid(false);
    return false;
  };

  const getDoc = () => {
    axios
      .get(import.meta.env.VITE_PROD_URL + `mydocs/${docid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log("getDoc data: ", response.data.mydoc_data);
        setIdNumber(response.data.mydoc_data.identification_number);
        setName(response.data.mydoc_data.name);
        setLastName(response.data.mydoc_data.last_name);
        setDob(response.data.mydoc_data.date_of_birth);
        setDoi(response.data.mydoc_data.date_of_issue);
        setDoe(response.data.mydoc_data.date_of_expiry);
        setPercentageSuccess(response.data.mydoc_data.success_level);
        setRawData(response.data.mydoc_data.raw_ocr_data);
        setImgLink(response.data.mydoc_data.image_link);
      })
      .catch((err) => {
        console.error("getDoc error: ", err);
      });
  };

  const ModifyDoc = () => {
    setLoading(true);
    axios
      .put(import.meta.env.VITE_PROD_URL + `editdoc/${docid}`, docData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setLoading(false);
        console.log("ModifyDoc data: ", response.data);
      })
      .catch((err) => {
        setLoading(false);
        console.error("ModifyDoc error: ", err);
      });
  };

  useEffect(() => {
    if (docid[0] !== undefined) {
      getDoc();
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sub_container}>
        <div className={styles.inpContainer}>
          <div className={styles.inpLeft}>
            <TextField
              required
              id="outlined-required"
              label="Identification Number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="outlined-required"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="outlined-required"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="outlined-required"
              label="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              margin="normal"
              fullWidth
            />
          </div>
          <div className={styles.inpRight}>
            <TextField
              required
              id="outlined-required"
              label="Date of Issue"
              value={doi}
              onChange={(e) => setDoi(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="outlined-required"
              label="Date of Expiry"
              value={doe}
              onChange={(e) => setDoe(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="outlined-required"
              label="Success %"
              value={percentageSuccess}
              onChange={(e) => setPercentageSuccess(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="outlined-required"
              label="Image Link"
              value={imgLink}
              onChange={(e) => setImgLink(e.target.value)}
              margin="normal"
              fullWidth
            />
          </div>
        </div>
        <TextField
          required
          id="outlined-required"
          label="Raw OCR Data"
          value={rawData}
          multiline
          rows={5}
          fullWidth
          onChange={(e) => setRawData(e.target.value)}
        />
      </div>
      <div className={styles.interface}>
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
        <h3 className={styles.underline_effect}>Edit Document Portal</h3>
        <h3 className={styles.underline_effect}>
          Document DB ID -{" "}
          {docid[0] === undefined
            ? "Select a document from history table to proceed!"
            : docid}
        </h3>
        <div className={styles.btnRow}>
          <LoadingButton
            variant="contained"
            size="large"
            endIcon={<PublishIcon />}
            loading={loading}
            onClick={() => {
              if (isFormValid()) {
                ModifyDoc();
              } else {
                setFormValid(false);
              }
            }}
          >
            Modify
          </LoadingButton>
          <Button
            variant="contained"
            size="large"
            endIcon={<ExitToAppIcon />}
            onClick={() => {
              navigate("/history", { replace: true });
            }}
          >
            History
          </Button>
          <Button
            variant="contained"
            size="large"
            endIcon={<ExitToAppIcon />}
            onClick={() => {
              navigate("/dashboard", { replace: true });
            }}
          >
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditDocumentScreen;
