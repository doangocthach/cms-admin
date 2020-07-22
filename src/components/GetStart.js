import React from "react";
import "./GetStart.css";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import CreateWorkspace from "./CreateWorkspace";

export default function GetStart() {
  return (
    <Box className="create-workspace">
      <h3>Create a Workspace for you and your team</h3>
      <Link to="/create">
        <button className="btn btn-create-workspace">
          +Create a Workspace
        </button>
      </Link>
    </Box>
  );
}
