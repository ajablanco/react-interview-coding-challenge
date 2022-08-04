import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Statistic from "../components/Statistic";

export default function Home() {
  const router = useRouter();
  const data = router.query;

  const api = "https://api.github.com/users?since=23&per_page=100";

  const [users, setUsers] = useState([]);

  const [nextUserDetails, setNextUserDetails] = useState({});
  const [prevUserDetails, setPrevUserDetails] = useState({});

  const prevUser = users[parseInt(data.id) - 1];
  const nextUser = users[parseInt(data.id) + 1];

  const next_api = `https://api.github.com/users/${data.nextUser}`;
  const prev_api = `https://api.github.com/users/${data.prevUser}`;

  const get100Users = () => {
    axios
      .get(api)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("error", err);
      });
  };

  const getNextUserDetails = () => {
    axios
      .get(next_api)
      .then((response) => {
        setNextUserDetails(response.data);
      })
      .catch((err) => {
        console.error("error", err);
      });
  };

  const getPrevUserDetails = () => {
    axios
      .get(prev_api)
      .then((response) => {
        setPrevUserDetails(response.data);
      })
      .catch((err) => {
        console.error("error", err);
      });
  };

  useEffect(() => {
    get100Users();
    getNextUserDetails();
    getPrevUserDetails();
  }, []);

  return (
    <>
      <Head>
        <title>User Profile - Coding Challenge</title>
      </Head>

      <main>
        <div class="flex items-center bg-slate-50 h-80 rounded-md shadow-lg shadow-blue-800 m-8">
          <div class="flex flex-wrap justify-center w-64 ">
            <img
              src={data.avatar_url || data.url}
              alt="profile pic"
              width={115}
              height={115}
              class="rounded-full m-6"
            />
            <h3 class="text-center font-bold w-full">{data.name}</h3>
            <h4 class="text-center text-sm w-full">{data.login}</h4>
            <br />
            <h4 class="text-center  text-sm w-full">{data.location}</h4>

            <a href={`${data.website}`} class="text-center text-sm w-full">
              {data.website}
            </a>
          </div>
          <div class="p-8 w-full">
            <div class="flex w-full justify-between pt-8 mx-2">
              <Statistic stat={data.public_repos} name={"Public Repos"} />
              <Statistic stat={data.public_gists} name={"Public Gists"} />
              <Statistic stat={data.followers} name={"Followers"} />
              <Statistic stat={data.following} name={"Following"} />
            </div>
            <div class="p-8 pt-12">
              <div>
                <text class="font-bold text-sm">Biography: </text>
                <text class="text-sm">{data.bio ? data.bio : "N/A"}</text>
              </div>
              <div>
                <text class="font-bold text-sm">Company: </text>
                <text class="text-sm">
                  {data.company ? data.company : "N/A"}
                </text>
              </div>
              <div>
                <text class="font-bold text-sm">Twitter: </text>
                <a class="text-center text-sm">
                  {data.twitter ? `@${data.twitter}` : "N/A"}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-full justify-center">
          <Link
            href={{
              pathname: "/profile",
              query: {
                ...data.prevUser,
                name: prevUserDetails.name,
                location: prevUserDetails.location,
                bio: prevUserDetails.bio,
                followers: prevUserDetails.followers,
                following: prevUserDetails.following,
                public_gists: prevUserDetails.public_gists,
                public_repos: prevUserDetails.public_repos,
                company: prevUserDetails.company,
                twitter: prevUserDetails.twitter_username,
                website: prevUserDetails.blog,
                avatar_url: prevUserDetails.avatar_url,
                nextUser: nextUser?.login,
                prevUser: prevUser?.login,
              },
            }}
          >
            <a class="no-underline text-white" href="/">
              {`< Back `}
            </a>
          </Link>

          <text class=" text-white mx-4"> | </text>

          <Link
            href={{
              pathname: "/profile",
              query: {
                ...data.nextUser,
                name: nextUserDetails.name,
                location: nextUserDetails.location,
                bio: nextUserDetails.bio,
                followers: nextUserDetails.followers,
                following: nextUserDetails.following,
                public_gists: nextUserDetails.public_gists,
                public_repos: nextUserDetails.public_repos,
                company: nextUserDetails.company,
                twitter: nextUserDetails.twitter_username,
                website: nextUserDetails.blog,
                avatar_url: nextUserDetails.avatar_url,
                nextUser: nextUser?.login,
                prevUser: prevUser?.login,
              },
            }}
          >
            <a class="no-underline text-white">{` Next >`}</a>
          </Link>
        </div>
      </main>
    </>
  );
}
