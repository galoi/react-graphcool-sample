import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink, InMemoryCache } from "apollo-client-preset";

import App from "./components/App";

import "./index.css";

const GRAPHQL_ENDPOINT = "";

if (!GRAPHQL_ENDPOINT) {
  throw Error("GRAPHQL_ENDPOINTが設定されていません。");
}
const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT
  }),
  cache: new InMemoryCache()
});

const ApolloApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(ApolloApp, document.getElementById("root"));
registerServiceWorker();
