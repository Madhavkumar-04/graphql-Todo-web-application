import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </StrictMode>,
)