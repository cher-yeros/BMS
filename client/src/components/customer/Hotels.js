import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import apiCall from "../../apiCall";

function Hotels(props) {
  useEffect(() => {
    getHotelsAround();
  }, []);
  const [HotelsAround, setHotelsAround] = useState([]);

  function getHotelsAround() {
    apiCall
      .get("/v1/customer/get-hotels-around/" + props.siteId)
      .then(({ data }) => {
        console.log(data.message);

        if (data.success) {
          setHotelsAround(data.message);
        }
      });
  }

  function printStar(rating, i) {
    let star =
      rating > i ? (
        <i key={i} style={{ color: "orange" }} className="fas fa-star" />
      ) : (
        <i key={i} style={{ color: "lightgray" }} className="fas fa-star" />
      );

    return star;
  }
  const n = useNavigate();
  function bookNow(hotel) {
    //console.log(hotel);
    //if (!Auth.checkLoggedIn()) {
    //  alert("Login to book!");
    //} else {
    n("/hotel", { state: hotel });
    //}
  }
  return (
    <section className="packages pt-5" id="packages">
      <div className="box-container">
        <div className="row mx-3" style={{ width: "100% " }}>
          {HotelsAround.map((hotel) => (
            <div key={hotel.Id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="box">
                <img src="assets/images/p-1.jpg" alt="" />
                <div className="content">
                  <h3>
                    <i className="fas fa-map-marker-alt"></i> {hotel.Name}
                  </h3>

                  <p>{hotel.Description}</p>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((r, i) => printStar(hotel.Rating, i))}
                  </div>
                  {/*<div className="price">
                    {" "}
                    $90.00 - <span>$120.00</span>{" "}
                  </div>*/}
                  <button onClick={() => bookNow(hotel)} className="bttn">
                    Show More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hotels;
