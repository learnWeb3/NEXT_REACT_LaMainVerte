import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { getGarden } from "../../requests/gardens";
import useIsLoading from "../../hooks/useIsLoading";
import IconUpdate from '../base_components/icons/IconUpdate/index';
import IconClimate from '../base_components/icons/IconClimate/index';
import IconLabel from '../base_components/icons/IconLabel/index';
import IconLocation from '../base_components/icons/IconLocation/index';
import DataContainer from './DataContainer/index';
import LoadingSpinner from '../loaders/LoadingSpinner/index';

const GardenCard = ({ id }) => {
  const [garden, setGarden] = useState();
  const history = useHistory();
  const { isLoading, setIsLoading } = useIsLoading();

  const handleRedirect = (id) => {
    history.push("/garden/" + id);
  };

  useEffect(() => {
    const fetchAndSetGarden = async (id) => {
      const garden = await getGarden(id);
      setGarden(garden);
      setIsLoading(false);
    };
    id && fetchAndSetGarden(id);
  }, [id]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div
      className="card card-garden p-4"
      id={`garden-${id}`}
      onClick={(event) => handleRedirect(id)}
    >
      <div
        className="card-image"
        style={{
          backgroundImage: `url(${garden.garden.picture_url})`,
        }}
      >
        <div className="garden-datas">
          <DataContainer
            icon={IconUpdate}
            dataText={
              <Moment format="DD/MM:YYYY à hh:mm:ss">
                {garden.garden.updated_at}
              </Moment>
            }
          />

          <DataContainer icon={IconClimate} dataText={garden.climate?.name} />
          <DataContainer icon={IconLabel} dataText={garden.type?.name} />
          <DataContainer icon={IconLocation} dataText={garden.location?.name} />
        </div>
      </div>
      <div className="card-footer p-4 flex items-center justify-between">
        <h4>{garden.garden.name?.toUpperCase()}</h4>{" "}
        <h4 className="italic">Par {garden.user?.username}</h4>
      </div>
    </div>
  );
};

export default GardenCard;
