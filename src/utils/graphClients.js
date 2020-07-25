import ApolloClient from "apollo-boost";

const createGraphClient = (uri) => {
  const client = new ApolloClient({ uri });
  return client;
};

export const workspaceClient = createGraphClient(
  `${process.env.REACT_APP_API_HOST}/api/workspace`
);
export const campaignClient = createGraphClient(
  `${process.env.REACT_APP_API_HOST}/api/campaign`
);
