import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";

const Rover = ({ name, img, photos, status, launchDate, landingDate, finalDate }) => {
  return (
    <Card
      className="rover-card"
      title={name}
      cover={<img src={img} height={200} alt="rover" />}
      hoverable>
      <Meta description="Information" style={{ marginBottom: 10 }} />
      <p>
        <b>Launch date:</b> {launchDate}
      </p>
      <p>
        <b>Landing date:</b> {landingDate}
      </p>
      <p>
        <b>Finale date:</b> {finalDate}
      </p>
      <p>
        <b>Status:</b> {status}
      </p>
      <p>
        <b>Total Photos Amount: </b> {photos}
      </p>
    </Card>
  );
};

export default Rover;
