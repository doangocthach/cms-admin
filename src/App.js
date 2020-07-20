import React, { useState, useEffect } from "react";
import ListWorkspace from "./components/ListWorkspace";
import CreateWorkspace from "./components/CreateWorkspace";
import axios from "./utils/axios";

function App() {
  const [workspaces, setWorkspace] = useState([]);
  useEffect(() => {
    axios.get("/list").then((res) => setWorkspace(res.data));
  }, []);
  return (
    <div className="workspace" style={{ textAlign: "center" }}>
      <ListWorkspace workspaces={workspaces} />
      <CreateWorkspace />
    </div>
  );
}

export default App;
