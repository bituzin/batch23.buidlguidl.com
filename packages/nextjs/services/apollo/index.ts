import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const subgraphUri = "https://api.studio.thegraph.com/query/1722630/batch-23-buidlguidl/version/latest";

const client = new ApolloClient({
    link: new HttpLink({
        uri: subgraphUri,
    }),
    cache: new InMemoryCache(),
});

export default client;
