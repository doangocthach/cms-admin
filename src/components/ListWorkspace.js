import React from "react";
import "./ListWorkspace.scss";

export default function ListWorkspace({workspaces}) {
  return (
    <div className="list-workspace">
      <ul>
        {workspaces.map((workspace) => (
          <li key={workspace._id}>
            <a href="/">{workspace.name}</a>
            <p>{workspace.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
