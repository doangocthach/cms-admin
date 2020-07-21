import React, { useState, useEffect } from "react";
import ListWorkspace from "./components/ListWorkspace";
import GetStart from "./components/GetStart";
import axios from "./utils/axios";
import CreateWorkspace from "./components/CreateWorkspace";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
function App() {
  const [workspaces, setWorkspace] = useState([]);
  useEffect(() => {
    axios.get("/list").then((res) => setWorkspace(res.data));
  }, []);
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/create">
          <CreateWorkspace />
        </Route>
        <Route exact path="/">
          <div className="workspace" style={{ textAlign: "center" }}>
            <div className="main-content-wrapper">
              <GetStart />
              <ListWorkspace workspaces={workspaces} />
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
