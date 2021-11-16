import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import { marsAPI } from "../../api/api";
import Rover from "./Rover";
import opportunityImage from "../../assets/img/opportunity.jpg";
import spiritImage from "../../assets/img/spirit.jpg";
import curiosityImage from "../../assets/img/curiosity.jpg";
import loader from "../../assets/loader/Ripple-1.4s-200px.svg";

const MarsPhotos = () => {
  const [curiosity, setCuriosity] = useState(null);
  const [spirit, setSpirit] = useState(null);
  const [opportunity, setOpportunity] = useState(null);

  useEffect(() => {
    const result = async () => {
      const response = await marsAPI.curiosityGetManifest();
      setCuriosity(response);
    };
    result();
  }, []);

  useEffect(() => {
    const result = async () => {
      const response = await marsAPI.spiritGetManifest();
      setSpirit(response);
    };
    result();
  }, []);

  useEffect(() => {
    const result = async () => {
      const response = await marsAPI.opportunityGetManifest();
      setOpportunity(response);
    };
    result();
  }, []);

  return (
    <>
      {curiosity || opportunity || spirit ? (
        <>
          <h1>Three rovers to choose</h1>
          <div className="mars-wrapper">
            {curiosity && (
              <Link to={ROUTES.CURIOSITY}>
                <Rover
                  name={curiosity.name}
                  img={curiosityImage}
                  photos={curiosity.total_photos}
                  status={curiosity.status}
                  launchDate={curiosity.launch_date}
                  landingDate={curiosity.landing_date}
                  finalDate={curiosity.max_date}
                />
              </Link>
            )}
            {opportunity && (
              <Link to={ROUTES.OPPORTUNITY}>
                <Rover
                  name={opportunity.name}
                  img={opportunityImage}
                  photos={opportunity.total_photos}
                  status={opportunity.status}
                  launchDate={opportunity.launch_date}
                  landingDate={opportunity.landing_date}
                  finalDate={opportunity.max_date}
                />
              </Link>
            )}
            {spirit && (
              <Link to={ROUTES.SPIRIT}>
                <Rover
                  name={spirit.name}
                  img={spiritImage}
                  photos={spirit.total_photos}
                  status={spirit.status}
                  launchDate={spirit.launch_date}
                  landingDate={spirit.landing_date}
                  finalDate={spirit.max_date}
                />
              </Link>
            )}
          </div>
        </>
      ) : (
        <img className="loader" src={loader} alt="loader" />
      )}
    </>
  );
};

export default MarsPhotos;
