import React from "react";
import "./ListWorkspace.scss";
import { Card } from "@material-ui/core";
import { red, blue } from "@material-ui/core/colors";
export default function ListWorkspace({ workspaces }) {
  return (
    <div className="list-workspace">
      <ul>
        {/* <li>
          <Card className="card-wrapper">
            <a href={"/#"} className="card-content-wrapper">
              <b>Doan Ngoc Thach</b>
              <p>thachdn.nde18048@vtc.edu.vn</p>
            </a>
          </Card>
        </li>
        <li>
          <Card className="card-wrapper">
            <a href={"/#"} className="card-content-wrapper">
              <b>vcl</b>
              <p>email</p>
            </a>
          </Card>
        </li>
        <li>
          <Card className="card-wrapper">
            <a href={"/#"} className="card-content-wrapper">
              <b>vcl</b>
              <p>email</p>
            </a>
          </Card>
        </li>
        <li>
          <Card className="card-wrapper">
            <a href={"/#"} className="card-content-wrapper">
              <b>vcl</b>
              <p>email</p>
            </a>
          </Card>
        </li>
        <li>
          <Card className="card-wrapper">
            <a href={"/#"} className="card-content-wrapper">
              <b>vcl</b>
              <p>email</p>
            </a>
          </Card>
        </li>
        <li>
          <Card className="card-wrapper">
            <a href={"/#"} className="card-content-wrapper">
              <b>vcl1</b>
              <p>email</p>
            </a>
          </Card>
        </li>
        <li>
          <Card className="card-wrapper">
            <a href={"/#"} className="card-content-wrapper">
              <b>vcl</b>
              <p>email</p>
            </a>
          </Card>
        </li> */}

        {workspaces.map((workspace) =>
          workspace.isActive ? (
            <li key={workspace._id} style={{ backgroundColor: blue }}>
              <Card className="card-wrapper">
                <a href={"/#"} className="card-content-wrapper">
                  <b href="/">{workspace.name}</b>
                  <p>{workspace.email}</p>
                </a>
              </Card>
            </li>
          ) : (
            <li key={workspace._id}>
              <Card className="card-wrapper" style={{ background: "#ff0000" }}>
                <a href={"/#"} className="card-content-wrapper">
                  <b href="/">{workspace.name}</b>
                  <p>{workspace.email}</p>
                </a>
              </Card>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
