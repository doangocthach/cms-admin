import React, { useState } from "react";
import AddCampaignForm from "../components/AddCampaignForm";
import { useStoreActions, useStoreState } from "easy-peasy";

export default ({ open, handleClose, campaigns }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    createdAt: Date.now(),
    expiredAt: new Date().setDate(new Date().getDate() + 1),
  });
  const addCampain = useStoreActions(
    (actions) => actions.campaigns.addCampaign
  );
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    addCampain({
      name: state.name,
      email: state.email,
      createdAt: state.createdAt.toString(),
      expiredAt: state.expiredAt.toString(),
    });

    window.location.reload();
  };
  return (
    <AddCampaignForm
      handleClose={handleClose}
      setState={setState}
      state={state}
      handleFormSubmit={handleFormSubmit}
      open={open}
    />
  );
};
