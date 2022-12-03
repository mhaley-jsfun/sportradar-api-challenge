import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  teamName,
  gamePlayed,
  win,
  lose,
  overTimeLose,
  points,
  goalFor,
  gameAgainst,
  difference,
  L10,
  strike
) {
  return {
    teamName,
    gamePlayed,
    win,
    lose,
    overTimeLose,
    points,
    goalFor,
    gameAgainst,
    difference,
    L10,
    strike,
  };
}

const rows = [
  createData("Briuns", 159, 6.0, 24, 4.0, 12, 13, 13, 12, "9 - 1 - 0", 44),
  createData("Maple Leaf", 237, 9.0, 37, 4.3, 12, 12, 344, 56, 9 - 7 - 8, 22),
  createData("Lighting", 262, 16.0, 24, 6.0, 12, 2, 34, 44, 11, 33, 34, 22),
  createData("Red wing", 305, 3.7, 67, 4.3, 12, 33, 44, 55, 55, 66, 66, 77),
  createData("Panthers", 356, 16.0, 49, 3.9, 12, 11, 33, 22, 12, 44, 65, 67),
];

export default function Standing() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Teams</TableCell>
            <TableCell align="right">GP</TableCell>
            <TableCell align="right">W</TableCell>
            <TableCell align="right">L</TableCell>
            <TableCell align="right">OTL</TableCell>
            <TableCell align="right">Pts</TableCell>
            <TableCell align="right">GF</TableCell>
            <TableCell align="right">GA</TableCell>
            <TableCell align="right">Diff</TableCell>
            <TableCell align="right">L10</TableCell>
            <TableCell align="right">Strk</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.teamName}
              </TableCell>

              <TableCell align="right">{row.gamePlayed}</TableCell>
              <TableCell align="right">{row.win}</TableCell>
              <TableCell align="right">{row.lose}</TableCell>
              <TableCell align="right">{row.overTimeLose}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
              <TableCell align="right">{row.goalFor}</TableCell>
              <TableCell align="right">{row.gameAgainst}</TableCell>
              <TableCell align="right">{row.difference}</TableCell>
              <TableCell align="right">{row.L10}</TableCell>
              <TableCell align="right">{row.strike}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
