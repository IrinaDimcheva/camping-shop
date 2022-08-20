import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const FOF = (props) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    document.title = props.title;
    let t = setTimeout(() => setRedirect(true), 2000);

    return () => {
      clearTimeout(t);
      document.title = '';
    };
  }, [redirect, setRedirect]);

  return redirect ? (
    <Navigate to="/" />
  ) : (
    <h3 style={{ margin: "3rem", minHeight: "55vh", textAlign: "center" }}>
      404 / Not Found
    </h3>
  );
};

export default FOF;