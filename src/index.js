import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink, InMemoryCache } from "apollo-client-preset";
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import App from "./components/App";

import "./index.css";

const GRAPHQL_ENDPOINT = "https://api.graph.cool/simple/v1/cjf4wcgwo0z4w01627nhp8n9e";

if (!GRAPHQL_ENDPOINT) {
  throw Error("GRAPHQL_ENDPOINTが設定されていません。");
}

const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.graph.cool/v1/cjf4wcgwo0z4w01627nhp8n9e`,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjf4wcgwo0z4w01627nhp8n9e' });

// Splits the requests based on the query type - 
// E.g. subscriptions go to wsLink and everything else to httpLink
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && 
           operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const ApolloApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(ApolloApp, document.getElementById("root"));
registerServiceWorker();
