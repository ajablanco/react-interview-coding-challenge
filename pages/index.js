import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import UserCard from "../components/UserCard";

export default function Home() {
  const [users, setUsers] = useState([]);

  const api = "https://api.github.com/users";

  const getUsers = () => {
    axios
      .get(api)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("error", err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Github User Viewer - Coding Challenge</title>
        <meta
          name="description"
          content="View a list of Github users provided by the Github Users API"
        />
      </Head>

      <main>
        <div class="flex flex-wrap justify-center items-center h-screen">
          {users
            .map((user, id) => (
              <div class="flex w-1/3 justify-center">
                <UserCard
                  user={user}
                  nextUser={users[id + 1]}
                  prevUser={users[id - 1]}
                  key={id}
                />
              </div>
            ))
            .slice(0, 6)}
        </div>
      </main>
    </>
  );
}
