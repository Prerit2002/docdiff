import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  DefaultOptions,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import {getRepos} from './queries';
// import { useQuery } from "@apollo/client";
import Sidebar from "./components/sidebar";
import Monaco from "./components/Monaco";
import Navbar from "./components/Navbar";
function App() {
  const [text, setText] = useState<string>("");
  const [token, setToken] = useState<String | null>();
  useEffect(() => {
    const code: string | null =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)![1];
    console.log(code);
    if (code) {
      axios
        .get(`http://localhost:4000/authenticate/${code}`)
        .then((response) => {
          // console.log(response.data.token)
          console.log(response.data);
          if (response.data.error !== "bad_code") {
            setToken(response.data.token);
          }
        });
    }
  });
  const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
  });
  console.log("token:", token);
  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `bearer ${token}`,
      },
    };
  });

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: "no-cache",
      // fetchPolicy: "cache-and-network",
      errorPolicy: "ignore",
    },
    query: {
      // fetchPolicy: "cache-first",
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  };

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
  });

  return (
    <div className="App">
      {/* <a
        href={`https://github.com/login/oauth/authorize?client_id=Iv1.644cd5b7b12c0fd5&scope=user&redirect_uri=http://localhost:3000/`}
      >
        <button className="m-2 bg-gray-800 text-white flex p-2 rounded-sm"> <img className="mr-1 mt-0.5 h-5 w-5" alt="github logo" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />Login With Github</button>
      </a> */}
      
      <ApolloProvider client={client}>
        {token !== null && (
          <>
          <Navbar />
          <div className="flex">
            <Sidebar setText={setText} />
            <Monaco text={text!} />
          </div>
          </>
          
        )}
      </ApolloProvider>
    </div>
  );
}

export default App;
