import React, { useState } from "react";

// custom hook allowing to perform validations on the inputs of a form
const useFormAnalysis = () => {
  const alertMessages = {
    isEmpty: "Ce champ est obligatoire",
    passwordsAreDifferent: "Les mots de passes ne sont pas similaires",
  };

  // state to store and set user informations filled in the form
  const [userDatas, setUserdatas] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  //for the gardenForm
  const [gardenData, setGardenData] = useState({
    garden_type_id: "",
    name: "",
    area: "",
    climate_id: "",
    location_id: ""
  })

  // state to store and set alerts to be displayed under the related input
  const [alerts, setAlerts] = useState({
    alertLastname: "",
    alertFirstname: "",
    alertEmail: "",
    alertPassword: "",
    alertPasswordConfirmation: "",
    alertName: "",
    alertArea: "",
    alertGardenType: "",
    alertClimate: "",
    alertLocation: ""
  });

  // onInput event handler logic
  const handleInput = (datas) => {
    let { value, id } = datas;
    const newUserDatas = { ...userDatas };
    newUserDatas[id] = value;
    setUserdatas({ ...newUserDatas });

    const newGardenData = { ...gardenData };
    newGardenData[id] = value;
    setGardenData({ ...newGardenData });

    // PASSWORD CONFIRMATION CHECK
    if (userDatas.password !== userDatas.password_confirmation) {
      setAlerts({
        ...alerts,
        password_confirmation: alertMessages.passwordsAreDifferent,
      });
    } else {
      setAlerts({
        ...alerts,
        password_confirmation: "",
      });
    }

    //garden area check if area is a float
    if (typeof parseFloat(gardenData.area) !== 'number' && gardenData.area !== '') {
      setAlerts({
        ...alerts,
        alertArea: "veuillez entrer un nombre",
      })
    } else {
      setAlerts({
        ...alerts,
        alertArea: "",
      })
    }
  };

  // onBlur event handler logic
  const handleBlur = (datas) => {
    let { value, id } = datas;
    const newAlerts = { ...alerts };

    value === ""
    ? (newAlerts[id] = alertMessages.isEmpty)
    : (newAlerts[id] = "");

    setAlerts(newAlerts);

  };

  // returning objects with function for setters and values for getters
  return {
    userDatas,
    gardenData,
    alerts,
    // setUserdatas,
    // setAlerts,
    handleInput: (datas) => handleInput(datas),
    handleBlur: (datas) => handleBlur(datas),
  };
};

export default useFormAnalysis;
