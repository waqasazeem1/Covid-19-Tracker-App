import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="info_Cases">{cases}</h2>
        <Typography className="infoBox_total">{total}</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
