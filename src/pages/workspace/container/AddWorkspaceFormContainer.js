import React, { useState } from "react";

import AddWorkspaceForm from "../components/AddWorkspaceForm";
import { useStoreActions, useStoreState } from "easy-peasy";
export default ({ open, handleClose, workspaces }) => {
  const [state, setState] = useState({ name: "", email: "" });

  const addCampain = useStoreActions(
    (actions) => actions.workspaces.addWorkspace
  );
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    addCampain(state);
    window.location.reload();
  };

  return (
    <AddWorkspaceForm
      handleFormSubmit={handleFormSubmit}
      state={state}
      setState={setState}
      handleClose={handleClose}
      open={open}
    />
  );
};
