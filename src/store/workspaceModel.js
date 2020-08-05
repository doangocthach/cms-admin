import { workspaceClient } from "../utils/graphClients";
import { thunk, action } from "easy-peasy";
import gql from "graphql-tag";
const query = gql`
  query($page: Int, $query: String) {
    getListWorkspace(page: $page, query: $query) {
      listWorkspace {
        id
        name
        email
        createdAt
      }
      totalWorkspace
    }
  }
`;
const mutation = gql`
  mutation($name: String, $email: String) {
    createWorkspace(name: $name, email: $email) {
      id
      name
      email
      createdAt
    }
  }
`;
const workspaceModel = {
  workspaces: [],
  page: 1,
  searchValue: "",
  getWorkspaces: thunk(async (actions, payload) => {
    const res = await workspaceClient.query({
      query,
      variables: { page: payload.page, query: payload.searchValue },
      fetchPolicy: "no-cache",
    });
    actions.setListWorkspaces(res.data.getListWorkspace);
  }),
  setListWorkspaces: action((state, payload) => {
    state.workspaces = payload.listWorkspace;
    state.totalWorkspace = payload.totalWorkspace;
  }),

  addWorkspace: thunk(async (actions, payload) => {
    const res = await workspaceClient.mutate({ mutation, variables: payload });
  }),
};
export default workspaceModel;
