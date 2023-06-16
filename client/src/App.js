import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Header from './Components/Header';
import PayView from './pages/PayView';
import BillView from './pages/BillView';
import BudgetsView from './pages/BudgetsView';
import AddCharge from './pages/AddCharge';
import Home from './pages/Home';
import { ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink, } from '@apollo/client';
  import { setContext } from '@apollo/client/link/context';
  import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import { StoreProvider } from './utils/GlobalState';



const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",

});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
          <Header />
          <StoreProvider>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="Login" element={<Login />} />
                <Route path="AddCharge" element={<AddCharge />} />
                <Route path="Bill" element={<BillView />} />
                <Route path="Pay" element={<PayView />} />
                <Route path="Budget" element={<BudgetsView />} />
              </Route>      
            </Routes>
          </StoreProvider>
      </div>
    </ApolloProvider>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/AddCharge">Add Charge</Link>
          </li>
          <li>
            <Link to="/Bill">Bills</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default App;