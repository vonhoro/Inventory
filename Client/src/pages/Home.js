import React from "react";
import { Button } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import lightNovelLink from "../img/links/lightNovelLink.jpg";
import mangaLink from "../img/links/mangaLink.jpg";
import animeLink from "../img/links/animeLink.jpg";
import figuresLink from "../img/links/figuresLink.jpg";

function Home(props) {

  return (
    <div className="Home">
      <h1>Za WeeeebZone</h1>
      <p>
        Here you can buy Light Novels, Manga, Anime and moreeeeee!(not really)
      </p>{" "}
      <div className="Links">
        <div className="Link">
          <img src={lightNovelLink} alt="Light Novels" />
          <Link to="/Inventory/LightNovel" className="Button">
            <Button text="Light Novels" large={true} active={true} />
          </Link>
        </div>

        <div className="Link">
          <img src={mangaLink} alt="Manga" />
          <Link to="/Inventory/Manga" className="Button">
            <Button text="Manga" large={true} active={true} />
          </Link>
        </div>

        <div className="Link">
          <img src={animeLink} alt="Anime" />
          <Link to="/Inventory/Anime" className="Button">
            <Button text="Anime" large={true} active={true} />
          </Link>
        </div>

        <div className="Link">
          <img src={figuresLink} alt="Figure" />
          <Link to="/Inventory/Figure" className="Button">
            <Button text="Figures" large={true} active={true} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
