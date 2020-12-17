import React, { useEffect } from "react";
import Moment from "react-moment";
import useIsLoading from "../../hooks/useIsLoading";
import LoadingSpinner from '../loaders/LoadingSpinner/index';


const TestimonyCard = ({ id, content, user, created_at, updated_at }) => {
  const { isLoading, setIsLoading } = useIsLoading();

  useEffect(() => {
    setIsLoading(false);
  }, [id]);
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div
      className="testimony-card grid grid-cols-12 p-4 my-4"
      id={`testimony-${id}`}
    >
      <div className="flex col-span-2 items-center">
        <div className="suggestion-avatar-half">
          <div className="avatar-img">
            <img
              src={user?.avatar_url}
              className="h-full w-full rounded-full"
              alt="avatar"
            />
          </div>
        </div>

        <p className="my-4 font-blue-dark-light font-sm ml-2">
          {user?.username}
        </p>
      </div>

      <h5 className="flex col-start-10 col-span-3 items-center">
        <Moment
          format="DD/MM/YYYY à hh:mm:ss"
          className="block w-full text-right italic font-blue-dark-light font-sm"
        >
          {created_at}
        </Moment>
      </h5>

      <div className="col-span-12 lg:col-span-12 flex flex-col justify-center grid grid-cols-2">
        <p className="col-span-2 my-2">{content}</p>
      </div>
    </div>
  );
};

export default TestimonyCard;
