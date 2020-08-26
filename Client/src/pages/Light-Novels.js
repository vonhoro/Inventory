import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import List from "../components/List";

export default function LN(props) {
  const { user } = useContext(UserContext);
  return (
    <List
      MediaName="LightNovel"
      DataLabelsEdit={["Title", "Publisher", "Volumes", "Copies", "Price"]}
      InputTypesEdit={["text", "text", "number", "number", "number"]}
      ToOrderValues={["title", "publisher", "volumes", "copies", "price"]}
      Sinopsis={true}
      User={user}
    />
  );
}
