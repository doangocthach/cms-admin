import { thunk } from "easy-peasy";
import gql from "graphql-tag";
import { campaignClient } from "../utils/graphClients";
import { action } from "easy-peasy";
const query = gql`
  query($page: Int, $query: String) {
    getListCampaign(page: $page, query: $query) {
      listCampaign {
        _id
        name
        email
        googleAnalytics {
          trackingId
          viewId
          isActive
        }
        createdAt
        expiredAt
      }
      totalCampaign
    }
  }
`;

const mutation = gql`
  mutation(
    $name: String
    $email: String
    $createdAt: String
    $expiredAt: String
  ) {
    createCampaign(
      name: $name
      email: $email
      createdAt: $createdAt
      expiredAt: $expiredAt
    ) {
      _id
      name
      email
      googleAnalytics {
        trackingId
        isActive
      }
      createdAt
      expiredAt
    }
  }
`;

const getGaTraffic = gql`
  query($campaignId: String) {
    getGaTraffic(campaignId: $campaignId) {
      pageviews
      users
      newUsers
      sessions
      avgSessionDuration
      bounceRate
    }
  }
`;

const getSources = gql`
  query($campaignId: String) {
    getSources(campaignId: $campaignId) {
      sourceMedium
      users
      newUsers
      sessions
      bounceRate
      pageviewsPerSession
      avgSessionDuration
    }
  }
`;

const getGaTrafficByDay = gql`
  query($campaignId: String, $startDate: String, $endDate: String) {
    getGaTrafficByDay(
      campaignId: $campaignId
      startDate: $startDate
      endDate: $endDate
    ) {
      date
      numberOfUser
    }
  }
`;

const campaignModel = {
  campaigns: [],
  totalCampaign: null,
  searchValue: "",
  page: 1,

  getCampaigns: thunk(async (actions, payload) => {
    const res = await campaignClient.query({
      query,
      variables: { page: payload.page, query: payload.searchValue },
      fetchPolicy: "no-cache",
    });
    actions.setListCamapigns(res.data.getListCampaign);
  }),
  setListCamapigns: action((state, payload) => {
    state.campaigns = payload.listCampaign;
    state.totalCampaign = payload.totalCampaign;
  }),

  addCampaign: thunk(async (actions, payload) => {
    const res = await campaignClient.mutate({
      mutation,
      variables: {
        name: payload.name,
        email: payload.email,
        createdAt: payload.createdAt,
        expiredAt: payload.expiredAt,
      },
    });
  }),

  getGaTraffic: thunk(async (actions, payload) => {
    const res = await campaignClient.query({
      query: getGaTraffic,
      variables: {
        //  campaignId: props.match.params.campaignId,
        campaignId: payload,
      },
    });
    actions.SetGaTraffic(res.data.getGaTraffic);
  }),
  SetGaTraffic: action((state, payload) => {
    state.gaTraffic = payload;
  }),

  getSourcesAnalytics: thunk(async (actions, payload) => {
    const res = await campaignClient.query({
      query: getSources,
      variables: { campaignId: payload },
    });
    // .then((res) => {
    //   console.log(res.data.getSources);
    //   setGaSources(res.data.getSources);
    // });
    actions.setSourcesAnalytics(res.data.getSources);
  }),
  setSourcesAnalytics: action((state, payload) => {
    state.gaSources = payload;
  }),

  getGaTrafficByDay: thunk(async (actions, payload) => {
    try {
      const res = await campaignClient.query({
        query: getGaTrafficByDay,
        variables: {
          campaignId: payload.campaignId,
          startDate: payload.starDate,
          endDate: payload.endDate,
        },
      });
      actions.setGaTrafficByDay(res.data.getGaTrafficByDay);
    } catch (e) {
      console.log(e.message);
    }
  }),
  setGaTrafficByDay: action((state, payload) => {
    state.gaTrafficByDay = payload;
  }),

  enableTrackingId: thunk(async (actions, payload) => {
    const res = await campaignClient.mutate({
      mutation: gql`
        mutation($campaignId: String, $campaignName: String) {
          enableTracking(campaignId: $campaignId, campaignName: $campaignName)
        }
      `,
      variables: {
        campaignId: payload.campaignId,
        campaignName: payload.campaignName,
      },
    });
    actions.setTrackingId(res.data.enableTracking);
  }),
  setTrackingId: action((state, payload) => {
    console.log(payload);
    state.trackingId = payload;
  }),
};

export default campaignModel;
