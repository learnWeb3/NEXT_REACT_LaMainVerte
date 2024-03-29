import React, { useState, useEffect } from "react";
import { findUserDatas } from "../../../requests/user";
import { getFollowedGardenAndRelatedData } from "../../../requests/gardens";
import { Link } from "react-router-dom";
import GardenCard from "../../../components/GardenCard";
import { useSelector } from "react-redux";
import empty_result from "../../../assets/backgrounds/empty_gardens.svg";

const UserGardens = ({ user }) => {
  const [gardens, setGardens] = useState([]);
  const [current_user, setCurrentUser] = useState(
    useSelector((state) => state.current_user)
  );

  useEffect(() => {
    const fetchPageDatas = async () => {
      const fetchUser = await findUserDatas(user.id);

      const userGardens = await getFollowedGardenAndRelatedData(
        fetchUser.gardens
      );
      setGardens(userGardens);
    };

    fetchPageDatas();
  }, []);

  return (
    <section
      id="user-gardens"
      className="bg-white radius p-4 overflow-auto flex flex-col h-full"
    >
      <div className="radius bg-light-brown p-2 flex items-center justify-between">
        {current_user && current_user.id == user.id ? (
          <>
            <h4>Mes jardins</h4>
            <Link to="/gardens/new" id="create-garden">
              Créer un nouveau jardin
            </Link>
          </>
        ) : (
          <h4>Jardins de {user.username}</h4>
        )}
      </div>

      <div
        className={
          gardens?.length > 1 ? "gardens overflow-y-scroll" : "gardens"
        }
      >
        {gardens.length > 0 ? (
          gardens?.map((garden) => (
            <GardenCard
              key={`garden-${garden.id}`}
              id={garden.id}
              name={garden.name}
              picture_url={garden.picture_url}
              picture_opacity={garden.picture_opacity}
              user={user}
              climate={garden.climate}
              location={garden.location}
              garden_type={garden.garden_type}
              created_at={garden.created_at}
              updated_at={garden.updated_at}
            />
          ))
        ) : (
          <div className="flex  flex-col items-center w-full justify-center my-10">
            <img
              src={empty_result}
              className="h-96 w-96"
              alt="no result found"
            />

            <h4 className="my-4">Rien pour le moment ...</h4>
          </div>
        )}
      </div>

      <div
        className={
          gardens?.length > 1 ? "gardens overflow-y-scroll" : "gardens"
        }
      >
        {gardens?.map((garden) => (
          <GardenCard
            key={`garden-${garden.id}`}
            id={garden.id}
            name={garden.name}
            picture_url={garden.picture_url}
            picture_opacity={garden.picture_opacity}
            user={user}
            climate={garden.climate}
            location={garden.location}
            garden_type={garden.garden_type}
            created_at={garden.created_at}
            updated_at={garden.updated_at}
          />
        ))}
      </div>
    </section>
  );
};

export default UserGardens;
