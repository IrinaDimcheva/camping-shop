import { useState, useEffect } from "react";

const Profile = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/user/profile', {
      credentials: 'include'
    }).then(res => res.json())
      .then(userData => {
        setData(userData);
        console.log(userData);
      }).catch(err => {
        console.log(err);
      })
  }, []);
  return (
    <h1>Hi</h1>
  );
};

export default Profile;