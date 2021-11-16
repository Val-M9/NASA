import { DatePicker } from "antd";
import { useState, useEffect } from "react";
import { asteroidsAPI } from "../../api/api";
import NEOItems from "./NEOItems";
import loader from "../../assets/loader/Ripple-1.4s-200px.svg";

const NearEarthObjects = () => {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDateForCampare, setDateForCompare] = useState(0);
  const [endDateForCampare, setEndDateForCompare] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let result = async () => {
      setIsLoading(true);
      const response = await asteroidsAPI(startDate || today, endDate);
      response && setData(response);
      setIsLoading(false);
    };
    result();
  }, [startDate, endDate]);

  const today = new Date(Date.now()).toISOString().split("T")[0];

  const changeStartDateHandler = (d) => {
    setStartDate(d && d._d.toISOString().split("T")[0]);
    setDateForCompare(d._d);
  };
  const changeEndDateHandler = (d) => {
    setEndDate(d && d._d.toISOString().split("T")[0]);
    setEndDateForCompare(d._d);
  };
  // end date must not be greater than week compare to start date
  const week = 691199999;
  const datesCompare = endDateForCampare - startDateForCampare;

  return (
    <div>
      <h1>Near Earth Objects - Asteroids</h1>
      <p className="asteroids-description">
        Choose dates and see information about near-Earth asteroids these days.
      </p>
      <div className="datepicker">
        <div
          className="datepicker-item"
          dataAttr="Please choose the start date (by default - today)">
          <DatePicker onChange={changeStartDateHandler} />
        </div>
        <span className="datepicker-span">Start date</span>
        <div
          className="datepicker-item"
          dataAttr="Pick the end date (should not be later than 7 days after start date)">
          <DatePicker onChange={changeEndDateHandler} />
        </div>
        <span className="datepicker-span">End date</span>
      </div>
      {datesCompare > week ? (
        <p className="asteroids-description red">One week range please!</p>
      ) : endDate >= startDate || endDate === "" ? (
        isLoading ? (
          <img src={loader} className="loader" alt="Loading" />
        ) : (
          <NEOItems data={data} />
        )
      ) : (
        <p className="asteroids-description red">End date must be greater then start date!</p>
      )}
    </div>
  );
};

export default NearEarthObjects;
