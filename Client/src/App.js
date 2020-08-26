import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Alignment,
  Navbar,
  ButtonGroup,
  Button,
} from "@blueprintjs/core";
import { UserContext } from "./context/userContext";
// Pages

import Home from "./pages/Home";
import About from "./pages/About";
import Manga from "./pages/Manga";
import LN from "./pages/Light-Novels";
import Anime from "./pages/Anime";
import Figures from "./pages/Figures";


import "./css/index.css";

function App() {
  const [user, setUser] = useState({
    normal: true,
    admin: null,
    moderator: null,
  });
  return (
    <Router>
      <Navbar className="Nav-bar" fixedToTop={true}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Za WeeeebZone </Navbar.Heading>
          <Navbar.Divider />
          <ButtonGroup minimal={true} large={true}>
            <Link to="/Inventory">
              {" "}
              <Button icon="home">Home</Button>
            </Link>

            <Link to="/Inventory/About">
              {" "}
              <Button>About</Button>
            </Link>
            <Link to="/Inventory/Anime">
              <Button>Anime</Button>
            </Link>
            <Link to="/Inventory/Manga">
              <Button>Manga</Button>
            </Link>
            <Link to="/Inventory/Figure">
              <Button>Figures</Button>
            </Link>
            <Link to="/Inventory/LightNovel">
              <Button>Light-novels</Button>
            </Link>
          </ButtonGroup>
        </Navbar.Group>
      </Navbar>
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <Route path="/Inventory/About">
            <About />
          </Route>
          <Route path="/Inventory/LightNovel">
            <LN />
          </Route>
          <Route path="/Inventory/Manga">
            <Manga />
          </Route>
          <Route path="/Inventory/Anime">
            <Anime />
          </Route>
          <Route path="/Inventory/Figure">
            <Figures />
          </Route>
          <Route exact path="/Inventory">
            <Home />
          </Route>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
