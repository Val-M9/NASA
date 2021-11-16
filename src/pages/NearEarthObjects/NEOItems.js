import loader from "../../assets/loader/Ripple-1.4s-200px.svg";

const NEOItems = ({ data }) => {
  return (
    <>
      {data ? (
        <table className="asteroids-table">
          <thead>
            <tr>
              <th className="asteroids-td">Date</th>
              <th className="asteroids-td">Name</th>
              <th className="asteroids-td">Estimated diameter (meters)</th>
              <th className="asteroids-td">Potentialy hazardous</th>
              <th className="asteroids-td">More Information</th>
            </tr>
          </thead>
          {Object.entries(data.near_earth_objects)
            .sort()
            .map((item) => {
              return (
                <tbody key={item[0]}>
                  {item[1].map((obj) => {
                    return (
                      <tr key={obj.name}>
                        <td className="asteroids-td">
                          <b>{item[0]}</b>
                        </td>
                        <td className="asteroids-td">{obj.name}</td>
                        <td className="asteroids-td">
                          <b>min</b>{" "}
                          {obj.estimated_diameter.meters.estimated_diameter_min.toFixed(2)}
                          <br />
                          <b>max</b>{" "}
                          {obj.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}
                        </td>
                        {obj.is_potentially_hazardous_asteroid ? (
                          <td className="red asteroids-td">Yes</td>
                        ) : (
                          <td className="green asteroids-td">No</td>
                        )}
                        <td className="asteroids-td">
                          <a href={obj.nasa_jpl_url} target="_blank" rel="noopener noreferrer">
                            {obj.nasa_jpl_url}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              );
            })}
        </table>
      ) : (
        <img className="loader" src={loader} alt="Loader gif" />
      )}
    </>
  );
};

export default NEOItems;
