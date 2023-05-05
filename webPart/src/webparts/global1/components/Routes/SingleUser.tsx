import * as React from "react";
import Documents from "./Documents";
import Person from "./Person";
import { Link } from "react-router-dom";

function SingleUser() {
  const [display, setDisplay] = React.useState(false);

  const handlePerson = () => {
    setDisplay(false);
  };

  const handleDocument = () => {
    setDisplay(true);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100%",
        overflowX: "scroll",
        overflowY: "scroll",
      }}
    >
      <div style={{ padding: 5, backgroundColor: "grey" }}>
        <h3>
          <Link to="/">User Managment</Link>
        </h3>
      </div>
      <div>
        <button onClick={handlePerson}>Person</button>
        <button onClick={handleDocument}>Documents</button>
      </div>
      {display ? <Documents /> : <Person />}
    </div>
  );
}

export default SingleUser;
