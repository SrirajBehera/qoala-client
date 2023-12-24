import React, { useEffect, useState } from "react";
import styles from "./HistoryScreen.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import moment from "moment/moment";

// const columns = [
//   {
//     field: 'id',
//     headerName: 'ID',
//     width: 220
//   },
//   {
//     field: 'bookName',
//     headerName: 'Book Name',
//     width: 150,
//   },
//   {
//     field: 'bookAuthor',
//     headerName: 'Book Author(s)',
//     width: 250,
//   },
//   {
//     field: 'edition',
//     headerName: 'Edition',
//     width: 110,
//   },
//   {
//     field: 'publicationYear',
//     headerName: 'Year of publication',
//     width: 150,
//   },
//   {
//     field: 'quantity',
//     headerName: 'Quantity',
//     width: 110,
//   },
//   {
//     field: 'price',
//     headerName: 'Price',
//     width: 110,
//   }
// ];

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 10, lastName: "Roxie", firstName: "Harvey", age: 65 },
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

const HistoryScreen = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("@jwt-token");

  const [pageSize, setPageSize] = useState(10);
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
        const resp = JSON.stringify(response.data);
        setApiData(response.data);
        setLoading(false);
        console.log("getDocs response: " + resp);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error getDocs response: ", err);
      });
  };

  const deleteDoc = (docid) => {
    setLoading(true);
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
  };

  const deletefn = () => {
    selectionModel.forEach((id) => {
      setTimeout(() => {
        deleteDoc(id);
      }, 500);
    });
  };

  //   const rows = apiData.map((data) => ({
  //     id: data._id,
  //     bookName: data.name,
  //     bookAuthor: data.author,
  //     edition: data.edition,
  //     publicationYear: moment(data.publication_year).format("YYYY"),
  //     quantity: data.quantity,
  //     price: data.price,
  //   }));

  //   useEffect(() => {
  //     getDocs();
  //   }, []);

  return (
    <div className={styles.inventory}>
      <Box sx={{ height: "85%", width: "85%" }}>
        <DataGrid
          sx={{ border: "1px solid black", borderRadius: "12px", mt: 3, mr: 3 }}
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[15, 25, 35]}
          pagination
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
              quickFilterProps: { debounceMs: 500 }
            },
          }}
          onSelectionModelChange={(newSelectionModel) => {
            console.log(`SelectionModelChange: ${newSelectionModel}`);
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
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
            // onClick={() => {
            //   getDocs();
            // }}
          >
            Refresh
          </LoadingButton>
          <Button
            variant="contained"
            size="large"
            endIcon={<EditIcon />}
            // onClick={() => {
            //   navigate("/editDoc", { state: { docid: selectionModel } });
            // }}
          >
            Edit Doc Details
          </Button>
          <LoadingButton
            variant="contained"
            size="large"
            endIcon={<DeleteIcon />}
            loading={loading}
            // onClick={() => {
            //   deletefn();
            //   getDocs();
            // }}
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
