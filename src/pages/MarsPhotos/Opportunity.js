import { useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { DatePicker, Select } from "antd";
import { ROUTES } from "../../constants/routes";
import { marsAPI } from "../../api/api";
import Pages from "../../components/Pages";
import loader from "../../assets/loader/Ripple-1.4s-200px.svg";

const Opportunity = () => {
  const { Option } = Select;
  const history = useHistory();
  const [opportunity, setOpportunity] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [camera, setCamera] = useState("");
  const [date, setDate] = useState(0);

  // For Pagination
  const photosPerPage = 25;
  const [offset, setOffset] = useState(0);
  const [currentPagePhotos, setCurrentPagePhotos] = useState([]);

  const photosRef = useRef();
  photosRef.current = photos;

  const setPhotosForCurrentPage = useCallback(() => {
    setCurrentPagePhotos(photosRef.current.slice(offset, offset + photosPerPage));
  }, [photosRef, offset]);

  const changePageHandler = (pageNumber) => {
    const currentPage = pageNumber - 1;
    const offset = currentPage * photosPerPage;
    setOffset(offset);
    setPhotosForCurrentPage();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const result = async () => {
      const response = await marsAPI.opportunityGetManifest();
      setOpportunity(response);
    };
    result();
  }, []);

  useEffect(() => {
    const result = async () => {
      const response = await marsAPI.opportunityGetPhotos(camera, date);
      setPhotos(response.photos);
      setPhotosForCurrentPage();
    };
    result();
  }, [camera, date, setPhotosForCurrentPage]);

  const changeCameraHandler = (value) => {
    setCamera(value);
  };
  const changeDateHandler = (d) => {
    const day = d._d;
    day.setDate(day.getDate() + parseInt(1));
    setDate(day.toISOString().split("T")[0]);
    day.setDate(day.getDate() - parseInt(1));
    return date;
  };

  const disabledDate = (current) => {
    if (opportunity) {
      const start = moment(opportunity.landing_date, "YYYY-MM-DD");
      const end = moment(opportunity.max_date, "YYYY-MM-DD");
      return current < start || current > end;
    }
  };
  const defaultDate = moment("2004-01-01", "YYYY-MM-DD");

  console.log(opportunity);
  console.log(date);

  return (
    <div className="rover--wrapper">
      <div className="rover--header">
        <button className="rover--button-back" onClick={() => history.push(ROUTES.MARS_ROVERS)}>
          <DoubleLeftOutlined /> Back
        </button>
        <h1>Opportunity</h1>
        <p className="rover--description">
          Opportunity, also known as MER-B (Mars Exploration Rover – B) or MER-1, and nicknamed
          "Oppy", is a robotic rover that was active on Mars from 2004 until mid-2018. Opportunity
          was operational on Mars for 5110 sols (5250 days; 14 years, 136 days). Launched on July 7,
          2003, as part of NASA's Mars Exploration Rover program, it landed in Meridiani Planum on
          <b> January 25, 2004,</b> three weeks after its twin Spirit (MER-A) touched down on the
          other side of the planet.
        </p>
        <p className="rover--description">
          Due to the planetary 2018 dust storm on Mars, Opportunity ceased communications on June 10
          and entered hibernation on June 12, 2018. It was hoped it would reboot once the weather
          cleared, but it did not, suggesting either a catastrophic failure or that a layer of dust
          had covered its solar panels. NASA hoped to re-establish contact with the rover, citing a
          windy period that could potentially clean off its solar panels. On February 13, 2019, NASA
          officials declared that the Opportunity mission was complete, after the spacecraft had
          failed to respond to over 1,000 signals sent since August 2018.
        </p>
        <p className="rover--description bordered">
          On this page you can choose the date and select one of the rover's cameras to see the
          photos taken.
        </p>
        <form className="rover--form">
          <Select
            className="rover--form-item"
            onChange={changeCameraHandler}
            defaultValue="Choose the Camera"
            style={{ width: 250 }}
            required>
            <Option value="FHAZ">Front Hazard Avoidance Camera</Option>
            <Option value="RHAZ">Rear Hazard Avoidance Camera </Option>
            <Option value="NAVCAM">Navigation Camera</Option>
            <Option value="PANCAM">Panoramic Camera</Option>
            <Option value="MINITES">Miniature Thermal Emission Spectrometer</Option>
          </Select>
          <DatePicker
            className="rover--form-item"
            onChange={changeDateHandler}
            disabledDate={disabledDate}
            defaultPickerValue={defaultDate}
          />
        </form>
      </div>
      <div>
        <div>
          {photos && photos.length > 0 ? (
            <>
              <div className="rover--photo">
                <p className="rover--p bordered">
                  {photos.length} photos was taken by {camera} camera on {date}.
                </p>
                {currentPagePhotos.length > 0 ? (
                  currentPagePhotos.map((photo) => (
                    <img
                      className="rover--photo-item"
                      key={photo.id}
                      src={photo.img_src}
                      alt="mars"
                    />
                  ))
                ) : (
                  <img className="loader" src={loader} alt="Loader gif" />
                )}
              </div>
              <div className="center">
                <Pages
                  photosPerPage={photosPerPage}
                  changePageHandler={changePageHandler}
                  photosCount={photos.length}
                  photos={photos}
                />
              </div>
            </>
          ) : date ? (
            <h2 className="text-red">Sorry it appears no photo from this camera on {date}</h2>
          ) : (
            <h2 className="text-red">Please select rover's camera and date.</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Opportunity;
