import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Stockinfo/Stockinfo.css";

const StockInfo = () => {
  const [information, setInformation] = useState([]);
  function createData(param, currency, value) {
    return { param, currency, value };
  }

  const rows = [
    createData("NSE ID", " ", information.NSEID),
    createData("BSE ID", " ", information.BSEID),
    createData("Market Cap", "(Rs. Crore)", information.MKTCAP),
    createData("Face Value", "(Rs)", information.FV),
    createData("Book Value", "(Rs)", information.BV),
    createData("P/B Ratio", " ", information.PB),
    createData("P/E Ratio", "", information.PE),
    createData("Price-Current", "(Rs)", information.pricecurrent),
    createData("Price-Prev Closed", "(Rs)", information.priceprevclose),
    createData("Cash Earning Per Share", "(Rs)", information.CEPS),
    createData("Dividend Yield", "(Rs)", information.DY),
    createData("5 Day Moving Average", "", information["5DayAvg"]),
    createData("50 Day Moving Average", "", information["50DayAvg"]),
    createData("200 Day Moving Average", "", information["200DayAvg"]),
  ];
  const params = useParams();
  const { company } = params;

  useEffect(() => {
    axios
      .get(
        `https://stockx-simplified.onrender.com/stocks/info/?query=${company}`
      )
      .then(function (res) {
        setInformation(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="stockinfocontainer">
      <Typography className="keyparams">
        Key Parameters for {company}{" "}
      </Typography>
      <TableContainer component={Paper} className="stockinfotable">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableheading">Parameter</TableCell>
              <TableCell className="tableheading" align="left">
                Currency
              </TableCell>
              <TableCell className="tableheading" align="right">
                Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.param}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.param}
                </TableCell>
                <TableCell align="left">{row.currency}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StockInfo;
