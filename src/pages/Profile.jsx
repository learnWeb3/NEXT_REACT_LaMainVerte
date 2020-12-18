import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserInformations from "../components/ProfilePage/UserInformations";
import FollowedGardens from "../components/ProfilePage/FollowedGardens";
import UserGardens from "../components/ProfilePage/UserGardens";
import UserPosts from "../components/ProfilePage/UserPosts";

const Profile = () => {
  const [user, setUser] = useState(useSelector((state) => state.current_user));

  return (
    <section className="grid grid-cols-12 min-h-80vh gap-4 bg-light-brown">
      <div className="hidden md:block md:col-span-1 lg:col-span-2 bg-man relative"></div>
      <div className="flex flex-col col-span-12 lg:col-span-10 grid grid-cols-2 gap-4 p-4">
        <div className="col col-span-2 lg:col-span-1 lg-h-80vh h-screen overflow-auto">
          <UserInformations user={user && user} />
        </div>
        <div className="col col-span-2 lg:col-span-1 lg-h-80vh h-screen overflow-auto">
          <FollowedGardens user={user && user} />
        </div>
        <div className="col col-span-2 lg:col-span-1 lg-h-80vh h-screen overflow-auto">
          <UserGardens user={user} />
        </div>
        <div className="col col-span-2 lg:col-span-1 lg-h-80vh h-screen verflow-auto">
          <UserPosts user={user && user} />
        </div>
      </div>
    </section>
  );
};

export default Profile;
