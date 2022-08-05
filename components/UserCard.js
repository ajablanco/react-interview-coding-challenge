import useGetUserDetails from "../hooks/useGetUserDetails";
import Link from "next/link";

export default function UserCard({ user }) {
  const userDetails = useGetUserDetails(user.login);

  if (!userDetails) return null;

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
            <Link href={`/profiles/${userDetails.login}`}>
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
