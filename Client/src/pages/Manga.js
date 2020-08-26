import React, { useContext } from "react";
import List from "../components/List";
import { UserContext } from "../context/userContext";
export default function Manga(props) {
  const { user } = useContext(UserContext);
  return (
    <List
      MediaName="Manga"
      DataLabelsEdit={["Title", "Magazine", "Volumes", "Copies", "Price"]}
      InputTypesEdit={["text", "text", "number", "number", "number"]}
      ToOrderValues={["title", "magazine", "volumes", "copies", "price"]}
      Sinopsis={true}
      User={user}
    />
  );
}
