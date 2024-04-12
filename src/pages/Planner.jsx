import React, { useState, useEffect } from "react";
import PlannerTable from "../components/PlannerComponents/PlannerTable";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

function Planner() {
  const { uuid } = useParams();
  const [plannerData, setPlannerData] = useState("");
  const [contentLoaded, setContentLoaded] = useState(false);
  const navigate = useNavigate();

  function getUserData() {
    axios({
      url: `/api/planner/view/${uuid}`,
      method: "get",
    })
      .then((res) => {
        setPlannerData(res.data);
      })
      .then(() => {
        setContentLoaded(true);
      })
      .catch((err) => {
        const statusCode = err.response.status;
        if (statusCode === 401) {
          navigate("/login");
        } else if (statusCode === 404) {
          console.log(err);
        } else {
          console.log(err);
        }
      });
  }

  useEffect(() => {
    getUserData();
  }, [contentLoaded]);

  return (
    <div className="Planner flex-fill">
      <h1>Itinerary Planner</h1>
      {contentLoaded ? (
        <PlannerTable data={plannerData.data} update={setContentLoaded} />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default Planner;

// import React, { useState } from "react";

// export default function Planner() {
//   const [trips, setTrips] = useState({
//     destination: "",
//     travelPeriod: "",
//     time: "",
//     activity: "",
//     day: "",
//   });

//   return (
//     <div>
//       <h1>Itenerary Planner</h1>
//     </div>
//   );
//}

// import React, { useState } from "react";

// export default function Planner() {
//   const [trips, setTrips] = useState({
//     destination: "",
//     travelPeriod: "",
//     time: "",
//     activity: "",
//     day: "",
//   });

//   return (
//     <div>
//       <h1>Itenerary Planner</h1>
//     </div>
//   );
//}
