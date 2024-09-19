import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

// const client = ...


   const query = gql`
      query getTodos {
        getTodos {
          id
          title
          user {
            name
          }
        }
      }
    `;
  
function App() {
  const {data, error} = useQuery(query);
  if(error) return <h1>Error Occured</h1>
  return (
    <div> {JSON.stringify(data)}</div>
  );
}

export default App
