import React, { useEffect, useState } from "react";
import styles from "./HistoryScreen.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  GridToolbar,
  gridFilteredSortedRowIdsSelector,
  selectedGridRowsSelector,
} from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { storage } from "../../features/firebase";
import { deleteObject, ref } from "firebase/storage";
import { convertDateFormat } from "../../utils/formatting";
import moment from "moment";

const columns = [
  {
    field: "idNumber",
    headerName: "ID Number",
    width: 150,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 100,
  },
  {
    field: "dob",
    headerName: "Date of Birth",
    width: 110,
  },
  {
    field: "issueDate",
    headerName: "Date of Issue",
    width: 110,
  },
  {
    field: "expiryDate",
    headerName: "Date of Expiry",
    width: 110,
  },
  {
    field: "percentageSuccess",
    headerName: "Success %",
    width: 100,
  },
  {
    field: "rawData",
    headerName: "Raw Data",
    width: 110,
  },
  {
    field: "imgLink",
    headerName: "Image Link",
    width: 110,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 250,
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 250,
  },
  {
    field: "id",
    headerName: "DB id",
    width: 110,
  },
];

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>Nothing added right now!</Box>
    </StyledGridOverlay>
  );
}

const getSelectedRowsToExport = ({ apiRef }) => {
  const selectedRowIds = selectedGridRowsSelector(apiRef);
  if (selectedRowIds.size > 0) {
    return Array.from(selectedRowIds.keys());
  }

  return gridFilteredSortedRowIdsSelector(apiRef);
};

const HistoryScreen = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("@jwt-token");

  const [selectionModel, setSelectionModel] = useState([]);
  const [cellValue, setCellValue] = useState("");
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(cellValue);
  }, [cellValue]);

  const getDocs = () => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_PROD_URL + "mydocs", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const resp = JSON.stringify(response.data.docs);
        setApiData(response.data.docs);
        setLoading(false);
        console.log("getDocs response: " + resp);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error getDocs response: ", err);
      });
  };

  const getDoc = (docid) => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_PROD_URL + `mydocs/${docid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const resp = JSON.stringify(response.data.mydoc_data);
        // setApiData(response.data.mydoc_data);
        setLoading(false);
        console.log("getDoc response: " + resp);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error getDoc response: ", err);
      });
  };

  const userDetails = localStorage.getItem("@user-details");
  const userDBId = JSON.parse(userDetails)._id;

  const deleteDoc = (docid) => {
    setLoading(true);
    // delete image from Firebase
    axios
      .get(import.meta.env.VITE_PROD_URL + `mydocs/${docid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const imgURL = JSON.stringify(response.data.mydoc_data.image_link);
        const pattern = /%2F([^/?#]+)[^/]*$/;
        const match = pattern.exec(imgURL);
        const filename = match ? match[1] : null;

        const fileRef = ref(
          storage,
          `gs://${
            import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
          }/${userDBId}/${filename}`
        );

        // Delete the file using the delete() method
        deleteObject(fileRef)
          .then(function () {
            // File deleted successfully
            console.log(
              "File Deleted successfully from firebase, now deleting record from DB"
            );
            // deleting the record from the database
            axios
              .delete(import.meta.env.VITE_PROD_URL + `deletedoc/${docid}`, {
                headers: {
                  Authorization: "Bearer " + token,
                },
              })
              .then((response) => {
                setLoading(false);
                console.log(
                  "deletedoc api response: " + JSON.stringify(response.data)
                );
              })
              .catch((err) => {
                setLoading(false);
                console.error("deletedoc api error: " + err);
              });
          })
          .catch(function (error) {
            // Some Error occurred
            setLoading(false);
            console.log(
              "Some Error occurred while deleting from storage: ",
              error
            );
          });

        setLoading(false);
        console.log("getDoc response: " + imgURL);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error getDoc response: ", err);
      });
  };

  const deletefn = () => {
    selectionModel.forEach((id) => {
      setTimeout(() => {
        deleteDoc(id);
      }, 1000);
    });
    getDocs();
  };

  const rows = apiData.map((data) => ({
    idNumber: data.identification_number,
    name: data.name,
    lastName: data.last_name,
    dob:
      data.date_of_birth !== "Not found"
        ? convertDateFormat(data.date_of_birth)
        : data.date_of_birth,
    issueDate:
      data.date_of_issue !== "Not found"
        ? convertDateFormat(data.date_of_issue)
        : data.date_of_issue,
    expiryDate:
      data.date_of_expiry !== "Not found"
        ? convertDateFormat(data.date_of_expiry)
        : data.date_of_expiry,
    percentageSuccess: parseFloat(data.success_level).toFixed(2),
    rawData: data.raw_ocr_data,
    imgLink: data.image_link,
    createdAt: moment(data.created_at).format("MMMM Do YYYY, h:mm:ss a"),
    updatedAt: moment(data.updated_at).format("MMMM Do YYYY, h:mm:ss a"),
    id: data._id,
  }));

  useEffect(() => {
    getDocs();
  }, []);

  return (
    <div className={styles.inventory}>
      <Box sx={{ height: "85%", width: "85%" }}>
        <DataGrid
          sx={{ border: "1px solid black", borderRadius: "12px", mt: 3, mr: 3 }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20, 30]}
          checkboxSelection
          disableSelectionOnClick
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              printOptions: { getRowsToExport: getSelectedRowsToExport },
            },
          }}
          onRowSelectionModelChange={(newSelectionModel) => {
            console.log(`SelectionModelChange: ${newSelectionModel}`);
            setSelectionModel(newSelectionModel);
          }}
          rowSelectionModel={selectionModel}
          onCellClick={(res) => {
            setCellValue(res.formattedValue);
          }}
        />
      </Box>
      <div className={styles.right}>
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
        <h3 className={styles.underline_effect}>History Table</h3>
        <div className={styles.btnRow}>
          <LoadingButton
            variant="contained"
            size="large"
            endIcon={<RefreshIcon />}
            loading={loading}
            onClick={() => {
              getDocs();
            }}
          >
            Refresh
          </LoadingButton>
          <Button
            variant="contained"
            size="large"
            endIcon={<EditIcon />}
            onClick={() => {
              navigate("/editdoc", { state: { docid: selectionModel } });
            }}
          >
            Edit Doc Detail(s)
          </Button>
          <LoadingButton
            variant="contained"
            size="large"
            endIcon={<DeleteIcon />}
            loading={loading}
            onClick={() => {
              deletefn();
            }}
          >
            Delete Record(s)
          </LoadingButton>
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

export default HistoryScreen;
