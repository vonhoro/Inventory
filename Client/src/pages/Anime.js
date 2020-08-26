import React, { useContext } from "react";
import List from "../components/List";
import { UserContext } from "../context/userContext";
export default function Anime(props) {
  const { user } = useContext(UserContext);
  return (
    <List
      MediaName="Anime"
      DataLabelsEdit={["Title", "Volumes", "Copies", "Price"]}
      InputTypesEdit={["text", "number", "number", "number"]}
      ToOrderValues={["title", "volumes", "copies", "price"]}
      Sinopsis={true}
      User={user}
    />
  );
}
