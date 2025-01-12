import { useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { DatePicker, Select } from "antd";
import { ROUTES } from "../../constants/routes";
import { marsAPI } from "../../api/api";
import Pages from "../../components/Pages";
import loader from "../../assets/loader/Ripple-1.4s-200px.svg";

const Spirit = () => {
  const { Option } = Select;
  const history = useHistory();
  const [spirit, setSpirit] = useState(null);
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
      const response = await marsAPI.spiritGetManifest();
      setSpirit(response);
    };
    result();
  }, []);

  useEffect(() => {
    const result = async () => {
      const response = await marsAPI.spiritGetPhotos(camera, date);
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
    if (spirit) {
      const start = moment(spirit.landing_date, "YYYY-MM-DD");
      const end = moment(spirit.max_date, "YYYY-MM-DD");
      return current <= start || current > end;
    }
  };
  const defaultDate = moment("2004-01-01", "YYYY-MM-DD");

  console.log("spirit", spirit);
  console.log(date);
  console.log(photos);

  return (
    <div className="rover--wrapper">
      <div className="rover--header">
        <button className="rover--button-back" onClick={() => history.push(ROUTES.MARS_ROVERS)}>
          <DoubleLeftOutlined /> Back
        </button>
        <h1>Spirit</h1>
        <p className="rover--description">
          Spirit, also known as MER-A (Mars Exploration Rover – A) or MER-2, is a robotic rover on
          Mars, active from 2004 to 2010. Spirit was operational on Mars for 2208 sols (2249 days; 6
          years, 77 days). It was one of two rovers of NASA's Mars Exploration Rover Mission managed
          by the Jet Propulsion Laboratory (JPL). Spirit landed successfully within the impact
          crater Gusev on Mars at 04:35 Ground UTC on <b>January 4, 2004</b>, three weeks before its
          twin, Opportunity (MER-B), which landed on the other side of the planet.
        </p>
        <p className="rover--description">
          On May 1, 2009 (5 years, 3 months, 27 Earth days after landing; 21 times the planned
          mission duration), Spirit became stuck in soft sand. The rover continued in a stationary
          science platform role until communication with Spirit stopped on March 22, 2010 (sol
          2208). JPL continued to attempt to regain contact until May 24, 2011, when NASA announced
          that efforts to communicate with the unresponsive rover had ended, calling the mission
          complete. A formal farewell took place at NASA headquarters shortly thereafter.
        </p>
        <p className="rover--description bordered">
          Choose the date and select one of the rover's camera to see the photos taken.
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
                {photos.length > 1 ? (
                  <p className="rover--p bordered">
                    {photos.length} photos were taken by {camera} camera on {date}.
                  </p>
                ) : (
                  <p className="rover--p bordered">
                    {photos.length} photo was taken by {camera} camera on {date}.
                  </p>
                )}
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
            <h2 className="text-red">Sorry, it appears no photo from this camera on {date}.</h2>
          ) : (
            <h2 className="text-red">Please select rover's camera and date.</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Spirit;
