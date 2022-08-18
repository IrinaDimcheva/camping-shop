import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const FOF = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    let t = setTimeout(() => setRedirect(true), 2000);

    return () => clearTimeout(t);
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