import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Statistic from "../../components/Statistic";
import useGetUserDetails from "../../hooks/useGetUserDetails";

export default function Home() {
  const router = useRouter();
  const { username } = router.query;

  const userDetails = useGetUserDetails(username);

  if (!userDetails) return null;

  return (
    <>
      <Head>
        <title>User Profile - Coding Challenge</title>
      </Head>

      <main>
        <div class="flex items-center bg-slate-50 h-80 rounded-md shadow-lg shadow-blue-800 m-8">
          <div class="flex flex-wrap justify-center w-64 ">
            <img
              src={userDetails.avatar_url || userDetails.url}
              alt="profile pic"
              width={115}
              height={115}
              class="rounded-full m-6"
            />
            <h3 class="text-center font-bold w-full">{userDetails.name}</h3>
            <h4 class="text-center text-sm w-full">{userDetails.login}</h4>
            <br />
            <h4 class="text-center  text-sm w-full">{userDetails.location}</h4>

            <a
              href={`${userDetails.website}`}
              class="text-center text-xs w-full"
            >
              {userDetails.url}
            </a>
          </div>
          <div class="p-8 w-full">
            <div class="flex w-full justify-between pt-8 mx-2">
              <Statistic
                stat={userDetails.public_repos}
                name={"Public Repos"}
              />
              <Statistic
                stat={userDetails.public_gists}
                name={"Public Gists"}
              />
              <Statistic stat={userDetails.followers} name={"Followers"} />
              <Statistic stat={userDetails.following} name={"Following"} />
            </div>
            <div class="p-8 pt-12">
              <div>
                <text class="font-bold text-sm">Biography: </text>
                <text class="text-sm">
                  {userDetails.bio ? userDetails.bio : "N/A"}
                </text>
              </div>
              <div>
                <text class="font-bold text-sm">Company: </text>
                <text class="text-sm">
                  {userDetails.company ? userDetails.company : "N/A"}
                </text>
              </div>
              <div>
                <text class="font-bold text-sm">Twitter: </text>
                <a class="text-center text-sm">
                  {userDetails.twitter ? `@${userDetails.twitter}` : "N/A"}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-full justify-center">
          <Link href={`/profiles/${userDetails.previousUser}`}>
            <a class="no-underline text-white" href="/">
              {`< Back `}
            </a>
          </Link>

          <text class=" text-white mx-4"> | </text>

          <Link href={`/profiles/${userDetails.nextUser}`}>
            <a class="no-underline text-white">{` Next >`}</a>
          </Link>
        </div>
      </main>
    </>
  );
}
