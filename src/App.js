import "./App.css";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import Main from "./components/main/Main";
import Auth from "./components/auth/Auth";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export var isAuth = false;

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  setInterval(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, 1000);

  if (!user) {
    return <Auth />;
  }

  return (
    <Router>
      <div className="App">
        <Header user={user} />
        <div className="homePage">
          <SideBar />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/:ticker">
              <Main />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
