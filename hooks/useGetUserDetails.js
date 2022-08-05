import axios from "axios";
import { useState, useEffect } from "react";

export default (username) => {
  const [userDetails, setUserDetails] = useState({});

  const API = `https://api.github.com/users/${username}`;

  const THREE_USERS_API = `https://api.github.com/users`;

  const getMoreUserDetails = () => {
    axios
      .get(API)
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((err) => {
        console.error("error", err);
      });
  };

  useEffect(() => {
    getMoreUserDetails();
  }, [username]);

  const getThreeUsers = (id) => {
    axios
      .get(THREE_USERS_API, { params: { since: id - 2 } })
      .then((response) => {
        const [previous, __, next] = response.data;
        setUserDetails((details) => {
          return {
            ...details,
            previousUser: previous.login,
            nextUser: next.login,
          };
        });
      })
      .catch((err) => {
        console.error("error", err);
      });
  };

  useEffect(() => {
    getThreeUsers(userDetails?.id);
  }, [userDetails?.id]);

  if (!userDetails.previousUser || !userDetails.nextUser) {
    return null;
  }

  return userDetails;
};
