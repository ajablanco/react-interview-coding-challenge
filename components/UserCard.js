import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function UserCard({ user, nextUser, prevUser }) {
  const [userDetails, setUserDetails] = useState({});

  const api = `https://api.github.com/users/${user.login}`;

  const getMoreUserDetails = () => {
    axios
      .get(api)
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((err) => {
        console.error("error", err);
      });
  };

  useEffect(() => {
    getMoreUserDetails();
  }, []);

  return (
    <>
      <main>
        <div class="flex items-center bg-slate-50 h-80 rounded-md shadow-lg shadow-blue-800">
          <div class="flex flex-wrap justify-center w-64 ">
            <img
              src={user.avatar_url}
              alt="profile pic"
              width={115}
              height={115}
              class="rounded-full m-6"
            />
            <h3 class="text-center font-bold w-full">{userDetails.name}</h3>
            <h4 class="text-center text-xs w-full">{user.login}</h4>
            <Link
              href={{
                pathname: "/profile",
                query: {
                  ...user,
                  name: userDetails.name,
                  location: userDetails.location,
                  bio: userDetails.bio,
                  followers: userDetails.followers,
                  following: userDetails.following,
                  public_gists: userDetails.public_gists,
                  public_repos: userDetails.public_repos,
                  company: userDetails.company,
                  twitter: userDetails.twitter_username,
                  website: userDetails.blog,
                  nextUser: nextUser.login,
                  prevUser: prevUser?.login || null,
                },
              }}
            >
              <button class="text-center bg-blue-800 text-white m-4 w-32 p-2 rounded-md text-xs">
                VIEW PROFILE
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
