import React, { useEffect, useState } from "react";
import { marsAPI } from "../../api/api";

const OpportunityDates = () => {
  const [allPhotos, setAllPhotos] = useState([]);
  const [opportunity, setOpportunity] = useState([]);

  useEffect(() => {
    const result = async () => {
      const response = await marsAPI.opportunityGetManifest();
      setOpportunity(response);
      setAllPhotos(response.photos);
    };
    result();
  }, []);
  const g = () => {
    for (let i = 0; i < allPhotos.length; i++) {
      console.log(allPhotos[i].earth_date);
    }
  };
  //g();
  return (
    <div style={{ width: 300, height: 300, backgroundColor: "red" }}>
      <h1>Day</h1>
    </div>
  );
};

export default OpportunityDates;
