import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Teams from "./containers/Teams";
import Create from "./containers/Create";
import User from "./containers/User";
import GlobalContextProvider from "./context/GlobalContextProvider";
import React from "react";

function App() {
  return (
    <GlobalContextProvider>
      <Router>
        <div className="h-screen">
          <Header />
          <Switch>
            <Route path="/user/:id">
              <User />
            </Route>
            <Route path="/teams">
              <Teams />
            </Route>
            <Route path="/">
              <Create />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </GlobalContextProvider>
  );
}

export default App;
