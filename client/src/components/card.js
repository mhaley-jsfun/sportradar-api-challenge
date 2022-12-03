import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function TeamCard({ team }) {
  return (
    <Card
      className="flex cursor-pointer flex-col justify-center items-center "
      sx={{ minWidth: 275, height: 300 }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          {team.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
