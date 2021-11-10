import { useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { DatePicker, Select } from "antd";
import { ROUTES } from "../../constants/routes";
import { marsAPI } from "../../api/api";
import Pages from "../../components/Pages";
import loader from "../../assets/loader/Ripple-1.4s-200px.svg";

const Curiosity = () => {
  const { Option } = Select;
  const history = useHistory();
  const [curiosity, setCuriosity] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [camera, setCamera] = useState("");
  const [date, setDate] = useState(null);

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
      const response = await marsAPI.curiosityGetManifest();
      setCuriosity(response);
    };
    result();
  }, []);

  useEffect(() => {
    const result = async () => {
      const response = await marsAPI.curiosityGetPhotos(camera, date);
      setPhotos(response.photos);
      setPhotosForCurrentPage();
    };
    result();
  }, [camera, date, setPhotosForCurrentPage]);

  const changeCameraHandler = (value) => {
    setCamera(value);
  };
  const changeDateHandler = (d) => {
    setDate(d && d._d.toISOString().split("T")[0]);
    return date;
  };

  const disabledDate = (current) => {
    if (curiosity) {
      const start = moment(curiosity.landing_date, "YYYY-MM-DD");
      const end = moment(curiosity.max_date, "YYYY-MM-DD");
      return current < start || current > end;
    }
  };
  console.log(curiosity);
  return (
    <div className="rover--wrapper">
      <div className="rover--header">
        <button className="rover--button-back" onClick={() => history.push(ROUTES.MARS_ROVERS)}>
          <DoubleLeftOutlined /> Back
        </button>
        <h1>Curiosity</h1>
        <p className="rover--description">
          Curiosity is a car-sized Mars rover designed to explore the Gale crater on Mars as part of
          NASA's Mars Science Laboratory (MSL) mission. Curiosity was launched from Cape Canaveral
          (CCAFS) on 26 November 2011, at 15:02:00 UTC and landed on Aeolis Palus inside Gale crater
          on Mars on<b> 6 August 2012, 05:17:57 UTC</b>. The Bradbury Landing site was less than 2.4
          km (1.5 mi) from the center of the rover's touchdown target after a 560 million km (350
          million mi) journey.
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
            <Option value="MAST">Mast Camera</Option>
            <Option value="CHEMCAM">Chemistry and Camera Complex</Option>
            <Option value="MAHLI">Mars Hand Lens Imager</Option>
            <Option value="MARDI">Mars Descent Imager</Option>
            <Option value="NAVCAM">Navigation Camera</Option>
          </Select>
          <DatePicker
            className="rover--form-item"
            onChange={changeDateHandler}
            disabledDate={disabledDate}
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

export default Curiosity;
