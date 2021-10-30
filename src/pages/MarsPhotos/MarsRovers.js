import { useState, useEffect } from "react";
import { marsAPI } from "../../api/api";
import Rover from "./Rover";

import opportunityImage from "../../assets/img/opportunity.jpg";
import spiritImage from "../../assets/img/spirit.jpg";
import curiosityImage from "../../assets/img/curiosity.jpg";

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
    <div>
      <h1>Mars Rover Photos</h1>
      <p className="mars-choose-p">Choose the rover.</p>
      <div className="mars-wrapper">
        {curiosity && (
          <Rover
            name={curiosity.name}
            img={curiosityImage}
            photos={curiosity.total_photos}
            status={curiosity.status}
            launchDate={curiosity.launch_date}
            landingDate={curiosity.landing_date}
            finalDate={curiosity.max_date}
          />
        )}
        {opportunity && (
          <Rover
            name={opportunity.name}
            img={opportunityImage}
            photos={opportunity.total_photos}
            status={opportunity.status}
            launchDate={opportunity.launch_date}
            landingDate={opportunity.landing_date}
            finalDate={opportunity.max_date}
          />
        )}
        {spirit && (
          <Rover
            name={spirit.name}
            img={spiritImage}
            photos={spirit.total_photos}
            status={spirit.status}
            launchDate={spirit.launch_date}
            landingDate={spirit.landing_date}
            finalDate={spirit.max_date}
          />
        )}
      </div>
    </div>
  );
};

export default MarsPhotos;
