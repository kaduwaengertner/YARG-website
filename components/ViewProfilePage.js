import { useRouter } from "next/router";
import useUser from "/lib/useUser";
import Link from "next/link";
import { useState, useEffect } from "react";


const ViewProfilePage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { slug } = router.query;
  const username = slug?.[0];
  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STREAM_DATABASE}/members.json`
        );
        const data = await response.json();
        console.log(router.query.username);
        const memberId = Object.keys(data).find(
          (id) => data[id].name === router.query.username?.toLowerCase()
        );
        setMemberData(data[memberId]);
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMemberData();
  }, [router.query.username]);

  return (
    <div>
      {memberData ? (
        <div>
          <p>Name: {memberData.name}</p>
          <p>Role: {memberData.role}</p>
          <p>Name: {memberData.name_display}</p>
          <p>Commands: {memberData.commands_used}</p>
          <p>Language: {memberData.language}</p>
          <p>Messages: {memberData.messages_twitch}</p>
          <p>SXP: {memberData.season_experience}</p>
          <p>XP: {memberData.total_experience}</p>
          {user?.isLoggedIn && user?.name === router.query.username && (
            <div>
              <Link href="/dashboard">
                Edit Profile
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>Profile: {router.query.username}</h1>
          <p>Member data not found.</p>
        </div>
      )}
    </div>
  );
};

export default ViewProfilePage;
