import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Spinner, Popover, Classes } from "@blueprintjs/core";
import close from "../img/close.png";
import MediaForm from "./Edit";
const axios = require("axios");
export default function Media(props) {
  const mediaName = props.MediaName;
  const media = mediaName.toLowerCase();
  const descriptionDataLocation = props.ToOrderValues.slice(1);
  const descriptionLabels = props.DataLabelsEdit.slice(1);
  const [medias, setMedias] = useState([]);
  const [Data, setData] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://floating-coast-95789.herokuapp.com/api/${media}s`);
        setMedias(response.data.data);
        setData(true);
      } catch (err) {
        console.log(err);
        setData(false);
      }
    }
    fetchData();
  },);

  const deleteEntry = async (elementToDelete) => {
    const originalCover = elementToDelete.cover.replace(
      "https://floating-coast-95789.herokuapp.com/api/image/",
      ""
    );

    const searchImageFile = await axios.get(
      `https://floating-coast-95789.herokuapp.com/api/file/${originalCover}`
    );
    const deletingImageFile = await axios.post(
      `https://floating-coast-95789.herokuapp.com/api/images/delete/${searchImageFile.data.file._id}`
    );

    const searchImageData = await axios.get(
      `https://floating-coast-95789.herokuapp.com/api/images/show/${originalCover}`
    );

    const deletingImageData = await axios.get(
      `https://floating-coast-95789.herokuapp.com/api/delete/${searchImageData.data.data._id}`
    );

    const response = await axios.delete(
      `https://floating-coast-95789.herokuapp.com/api/${elementToDelete}/` + elementToDelete._id
    );

    window.history.back();
  };

  return (
    <Router>
      <Switch>
        {medias.map((mediaElement, index) => (
          <Route key={index} path={`/Inventory/${mediaName}/${mediaElement.route}`}>
            <MediaSinopsis
              Sinopsis={mediaElement.sinopsis}
              Media={mediaElement.title}
              Cover={mediaElement.cover}
              MediaName={mediaName}
            />
          </Route>
        ))}
      </Switch>
      <Switch>
        {!Data ? (
          <></>
        ) : (
          medias.map((mediaElement, index) => (
            <Route
              key={index}
              path={`/Inventory/${mediaName}/Edit/${mediaElement.route}`}
            >
              <MediaForm
                New={false}
                MediaData={mediaElement}
                DataLabels={props.DataLabelsEdit}
                InputTypes={props.InputTypesEdit}
                MediaType={mediaName}
                PrevValuesOrder={props.ToOrderValues}
                SinopsisForm={props.Sinopsis}
                Permision={props.User.admin}
              />
            </Route>
          ))
        )}
        <Route path={`/Inventory/new/${mediaName}`}>
          <MediaForm
            New={true}
            MediaData={{ cover: "a" }}
            DataLabels={props.DataLabelsEdit}
            InputTypes={props.InputTypesEdit}
            MediaType={mediaName}
            SinopsisForm={props.Sinopsis}
            Permision={props.User.admin}
          />
        </Route>
      </Switch>
      <div className="page-container">
        {props.User.admin ? (
          <div className="Add-item">
            <Link to={`/Inventory/new/${mediaName}/`}>
              <Button
                large={true}
                active={true}
                intent="Warning"
                icon="insert"
                type="button"
                outlined={true}
                text={`Add a new ${mediaName}`}
              />
            </Link>
          </div>
        ) : (
          <div className="white-space"></div>
        )}

        {!Data ? (
          <Spinner intent="Primary" size={200} className="Spin" />
        ) : (
          <div className="List">
            {medias.map((mediaElement, index) => (
              <div className="Item" key={index}>
                <img
                  className="media-img"
                  src={mediaElement.cover}
                  alt={mediaElement.title}
                />
                <div className="title">
                  <h1>{mediaElement[props.ToOrderValues[0]]}</h1>
                </div>
                <div className="Description">
                  {descriptionLabels.map((label, index) => (
                    <>
                      <div className="description-text" key={index}>
                        <h2>
                          {label}:{" "}
                          {mediaElement[descriptionDataLocation[index]]}{" "}
                        </h2>
                      </div>
                    </>
                  ))}
                  {props.Sinopsis ? (
                    <Link to={`/Inventory/${mediaName}/${mediaElement.route}`}>
                      <div className="description-text">
                        <h2>Sinopsis</h2>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}
                  {props.User.admin || props.User.moderator ? (
                    <Link to={`/Inventory/${mediaName}/Edit/${mediaElement.route}`}>
                      <Button
                        intent="Warning"
                        fill={true}
                        active={true}
                        text="Edit"
                      />
                    </Link>
                  ) : (
                    <></>
                  )}
                  {props.User.admin ? (
                    <Popover
                      enforceFocus={false}
                      fill={true}
                      canEcapeKeyClose={true}
                    >
                      <Button
                        intent="Danger"
                        text="Delete"
                        active={true}
                        fill={true}
                      />
                      <div
                        className={`Popover-message ${Classes.POPOVER_DISMISS}`}
                      >
                        <h2>Confirm deletion</h2>
                        <p>
                          Are you sure you want to delete {mediaElement.title} ?
                        </p>

                        <div className="Popover-buttons">
                          <Button>No</Button>
                          <Button
                            intent="Danger"
                            onClick={(e) => deleteEntry(mediaElement)}
                          >
                            Yes
                          </Button>
                        </div>
                      </div>
                    </Popover>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Router>
  );
}
function MediaSinopsis(props) {
  const Text = props.Sinopsis.split("\n");
  const mediaName = props.MediaName;
  console.log(Text);
  return (
    <div className="Sinopsis">
      <Link to={`/Inventory/${mediaName}`}>
        <img className="close" src={close} alt="close" />
      </Link>
      <img className="sinopsis-img" src={props.Cover} alt="" />
      <h1>{props.Media}</h1>
      {Text.map((par, index) => (
        <p key={index}>{par}</p>
      ))}
      <Link to={`/Inventory/${mediaName}`}>
        <h3>Close</h3>
      </Link>
    </div>
  );
}
