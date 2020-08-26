import React, { useContext } from "react";
import { Button } from "@blueprintjs/core";
import { UserContext } from "../context/userContext";
export default function About(props) {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="page-container">
      <h1>About</h1>
      <p>
        This website was made with the intention of learning how to use express
        to set up a server with mongo db, because of that t is possible to create/delete/edit
        entries on the different pages.
      </p>
      <p>
        I also used this project to learn about react router, how to create a
        rest api, upload images and all that. Other important thing is that I
        used blueprintjs for my UI, being that the first time I use something
        of that nature, it is also  my first project using sass.
      </p>
      <p>
        The last thing is I am using the useContext hook of react to handle global
        variables in this case you can change your user by clicking on the
        buttons, each user has different priviledge an options, though, because
        they are general, there is not back end implemented on them.
      </p>

      <div className="change-user-buttons">
        <Button
          className="Boton"
          text="Normal User"
          active={user.normal}
          onClick={(e) =>
            setUser({
              normal: !user.normal,
              moderator: null,
              admin: null,
            })
          }
        />
        <Button
          className="Boton"
          text="Moderator(restricted)"
          active={user.moderator}
          onClick={(e) =>
            setUser({
              normal: null,
              moderator: !user.moderator,
              admin: null,
            })
          }
        />
        <Button
          className="Boton"
          text="Admin(full priviledge)"
          active={user.admin}
          onClick={(e) =>
            setUser({
              normal: null,
              moderator: null,
              admin: !user.admin,
            })
          }
        />
      </div>
    </div>
  );
}
