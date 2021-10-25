import { DatePicker } from "antd";
import { useState, useEffect } from "react";
import { asteroidsAPI } from "../../api/api";
import NEOItems from "./NEOItems";

const NearEarthObjects = () => {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    let result = async () => {
      const response = await asteroidsAPI(startDate || today, endDate);
      response && setData(response);
    };
    result();
  }, [startDate, endDate]);

  const today = new Date(Date.now()).toISOString().split("T")[0];

  const changeStartDateHandler = (d) => {
    setStartDate(d && d._d.toISOString().split("T")[0]);
  };
  const changeEndDateHandler = (d) => {
    setEndDate(d && d._d.toISOString().split("T")[0]);
  };

  return (
    <div>
      <h1>Near Earth Objects - Asteroids</h1>
      <p className="asteroids-description">
        On this page you can choose dates and see information about near-Earth asteroids these days{" "}
      </p>
      <div className="datepicker">
        <DatePicker onChange={changeStartDateHandler} />
        <span className="datepicker-span">Please choose the start date (by default - today)</span>
        <DatePicker onChange={changeEndDateHandler} />
        <span className="datepicker-span">
          Pick the end date (should not be later than 7 days after start date)
        </span>
      </div>
      {endDate >= startDate || endDate === "" ? (
        <NEOItems data={data} />
      ) : (
        <p className="asteroids-description red">End date must be greater then start date!</p>
      )}
    </div>
  );
};

export default NearEarthObjects;
