import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "./Button";
import SaveButton from "./SavedButton";
import "./Tables.css";

const columns = [
  { id: "name", label: "COMPANY NAME", align: "center", minWidth: 200 },
  { id: "code", label: "SYMBOL", align: "center", minWidth: 100 },
  {
    id: "population",
    label: "MARKET CAP",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "CURRENT PRICE",
    minWidth: 250,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [savedData, setSavedData] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const addToSavedList = (code) => {
    console.log(
      savedData?.some((data) => data.code === code),
      "data"
    );
    const newData = rows.filter((row) => row.code === code);
    console.log(newData);
    const data = savedData;
    data.push(...newData);
    setSavedData(data);
    console.log(rows);
    console.log(savedData, "savedData");
    console.log(
      savedData?.some((data) => data.code === code),
      "data"
    );
  };

  const checkWether = (code) => {
    if (savedData?.some((data) => data.code === code)){
      return (<Button
        code={code}
        addToSavedList={addToSavedList}
        savedData={savedData}
        saved={true}
      />)
    } else{
      return ( <SaveButton
        code={code}
        addToSavedList={addToSavedList}
        savedData={savedData}
        saved={true}
      />)
    }
  }

  return (
    <>
      <Paper className={classes.root}>
        <TableRow>
          <TableCell
            align="center"
            style={{ minWidth: "100%", fontSize: "18", fontWeight: "600" }}
            className="example"
          >
            Stock Details Table
          </TableCell>
        </TableRow>
        <TableContainer className={classes.container}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "600",
                      color: "#6E6893",
                      backGroundColor: "rgb(244,242,255)",
                    }}
                    className="example"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, ind) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {/*column.format && typeof value === "number"
                            ? column.format(value)
                            : value*/}
                            {index === 3 ? (
                              checkWether(row.code)
                            )
                              : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
