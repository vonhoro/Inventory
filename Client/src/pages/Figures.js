import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import List from "../components/List";

export default function Anime(props) {
  const { user } = useContext(UserContext);
  return (
    <List
      MediaName="Figure"
      DataLabelsEdit={["Name", "Producer", "Copies", "Price"]}
      InputTypesEdit={["text", "text", "number", "number"]}
      ToOrderValues={["name", "producer", "copies", "price"]}
      Sinopsis={false}
      User={user}
    />
  );
}
