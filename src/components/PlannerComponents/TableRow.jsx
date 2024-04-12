import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { useParams } from "react-router";

export default function TableRow({ data, update }) {
  const { uuid } = useParams();
  const [attraction, setAttraction] = useState(data);
  const [edit, setEdit] = useState(false);

  function handleDelete() {
    const id = attraction.fsq_id;
    axios({
      url: "/api/planner/delete_data",
      method: "put",
      data: { uuid: uuid, data: id },
    }).then(() => {
      update(false);
    });
  }

  const renderTime = (str) => {
    const date = new Date(str);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = `${("00" + hour).slice(-2)}:${("00" + minute).slice(-2)}`;
    return time;
  };

  return (
    <tr>
      <>
        <td>{attraction.name}</td>
        <td>
          {attraction.categories
            .map((cat) => {
              return cat.name;
            })
            .join(" > ")}
        </td>
        <td>
          <Button
            variant="outline-primary"
            href={`https://www.google.com/maps/search/${encodeURIComponent(
              attraction.location.formatted_address
            )}`}
            target="_blank"
          >
            <FontAwesomeIcon icon={solid("map")} />
          </Button>
        </td>
      </>

      <td>
        <Button type="button" variant="outline-danger" onClick={handleDelete}>
          <FontAwesomeIcon icon={solid("x")} />
        </Button>
      </td>
    </tr>
  );
}
