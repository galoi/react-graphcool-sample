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

const SIMPLE_ENDPOINT = "https://api.graph.cool/simple/v1/cjf4wcgwo0z4w01627nhp8n9e";

if (!SIMPLE_ENDPOINT) {
  throw Error("ENDPOINTが設定されていません。");
}

const SUBSCRIPTIONS_ENDPOINT = "wss://subscriptions.graph.cool/v1/cjf4wcgwo0z4w01627nhp8n9e";

if (!SUBSCRIPTIONS_ENDPOINT) {
  throw Error("Subscription用のENDPOINTが設定されていません。");
}

// http linkを生成
const httpLink = new HttpLink({ uri: SIMPLE_ENDPOINT });

// WebSocket linkを生成
const wsLink = new WebSocketLink({
  uri: SUBSCRIPTIONS_ENDPOINT,
  options: {
    reconnect: true
  }
});

// queryの種類によって、接続先を切り替える
// split()は第一引数がtrueならば第二引数を、falseならば第三引数を返す
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
