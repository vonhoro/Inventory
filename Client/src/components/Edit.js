import React, { useState, useEffect } from "react";
import {
  Button,
  FormGroup,
  InputGroup,
  FileInput,
  TextArea,
} from "@blueprintjs/core";

const axios = require("axios");
export default function Edit(props) {
  const labels = props.DataLabels;
  const inputType = props.InputTypes;
  const mediaType = props.MediaType;

  const apiDirection = mediaType.toLowerCase();
  const [oldValues, setOldValues] = useState([]);
  const [values, setValues] = useState(props.MediaData, {});
  const [imagePrev, setImagePrev] = useState(props.MediaData.cover);
  const [render, setRender] = useState(false);
  const [originalCover, setOriginalCover] = useState(
    props.MediaData.cover.replace("https://floating-coast-95789.herokuapp.com/api/image/", "")
  );
  const [waiting, setWaiting] = useState(false);
  useEffect(() => {
    //const a = props.DataLabels.toLowerCase();
    if (props.New) {
      const shownValues = props.DataLabels.map((element) => "");

      setOldValues(shownValues);
    } else {
      let prevValuesInitial = props.MediaData;

      let prevValuesArray = Object.entries(prevValuesInitial);
      let preValuesArrayOrdered = [];

      let i = 0;
      for (const ele of props.PrevValuesOrder) {
        let j = 0;
        for (const element of prevValuesArray) {
          if (prevValuesArray[j][0] === props.PrevValuesOrder[i]) {
            preValuesArrayOrdered.push(prevValuesArray[j][1]);
          }
          j += 1;
        }
        i += 1;
      }

      setOldValues(preValuesArrayOrdered);
    }

    setRender(true);
  },[] );
  const uploadImage = async (e) => {
    e.persist();
    const File = e.target.files[0];
    const FilePrev = URL.createObjectURL(e.target.files[0]);
    setImagePrev(FilePrev);
    setValues({ ...values, cover: File });
  };
  const changeValues = (e, label) => {
    const name = label.toLowerCase();
    const value = e.target.value;
    if (name === "volumes" || name === "copies" || name === "price") {
      if (parseInt(value) < 0) return;

      setValues({ ...values, [name]: parseInt(value) });

      return;
    }
    setValues({ ...values, [name]: value });
    console.log(values);
  };
  const formSubmited = async (e) => {
    e.preventDefault();
    setWaiting(true);
    let dataToSend = values;
    dataToSend[labels[0].toLowerCase()] = dataToSend[
      labels[0].toLowerCase()
    ].trim();
    const newImage = typeof dataToSend.cover === "string" ? false : true;

    if (props.New) {
      const caption = dataToSend[labels[0].toLowerCase()];
      const imageToUpload = dataToSend.cover;

      let formData = new FormData();

      formData.append("caption", caption);
      formData.append("file", imageToUpload);

      const uploadedImage = await axios.post(
        "https://floating-coast-95789.herokuapp.com/api/image",
        formData
      );

      dataToSend = {
        ...dataToSend,
        cover: `https://floating-coast-95789.herokuapp.com/api/image/${uploadedImage.data.image.filename}`,
      };
      const Route = dataToSend[labels[0].toLowerCase()]
        .replace(/\W/g, "_")
        .replace(/_{1,}/gm, "_");
      dataToSend.route = Route;
      console.log(dataToSend);
      const createMedia = await axios.post(
        `https://floating-coast-95789.herokuapp.com/api/${apiDirection}`,
        dataToSend
      );
      window.history.back()
    }
    if (newImage) {
      const searchImageFile = await axios.get(
        `https://floating-coast-95789.herokuapp.com/api/file/${originalCover}`
      );
      const deletingImageFile = await axios.post(
        `https://floating-coast-95789.herokuapp.com/api/images/delete/${searchImageFile.data.file._id}`
      );

      const searchImageData = await axios.get(
        `https://floating-coast-95789.herokuapp.com/api/images/show/${originalCover}`
      );
      const otherId = searchImageData.data.data._id;
      console.log(otherId);
      const deletingImageData = await axios.get(
        `https://floating-coast-95789.herokuapp.com/api/delete/${otherId}`
      );

      const caption = dataToSend[labels[0].toLowerCase()];
      const imageToUpload = dataToSend.cover;

      let formData = new FormData();

      formData.append("caption", caption);
      formData.append("file", imageToUpload);

      const uploadedImage = await axios.post(
        "https://floating-coast-95789.herokuapp.com/api/image",
        formData
      );

      dataToSend = {
        ...dataToSend,
        cover: `https://floating-coast-95789.herokuapp.com/api/image/${uploadedImage.data.image.filename}`,
      };
      const Route = dataToSend[labels[0].toLowerCase()]
        .replace(/\W/g, "_")
        .replace(/_{1,}/gm, "_");
      dataToSend.route = Route;

      const updateMedia = await axios.put(
        `https://floating-coast-95789.herokuapp.com/api/${apiDirection}/${dataToSend._id}`,
        dataToSend
      );
      window.history.back()
    } else {
      const Route = dataToSend[labels[0].toLowerCase()]
        .replace(/\W/g, "_")
        .replace(/_{1,}/gm, "_");

      dataToSend.route = Route;
      console.log(dataToSend);
      const updateMedia = await axios.put(
        `https://floating-coast-95789.herokuapp.com/api/${apiDirection}/${dataToSend._id}`,
        dataToSend
      );
      window.history.back()
    }
  };
  return (
    <div>
      {!render ? (
        <></>
      ) : (
        <div className="form-div">
          <form className="Edit" onSubmit={(e) => formSubmited(e)}>
            {props.Permision ? (
              <FileInput
                text="Choose a cover Image"
                buttonText="Browse"
                className="File-input"
                fill={true}
                large={true}
                intent="Primary"
                onInputChange={(e) => uploadImage(e)}
              />
            ) : (
              <></>
            )}

            {labels.map((label, index) => (
              <FormGroup
                key={index}
                inline={true}
                label={label}
                LabelFor={label}
                className="Edit-entry"
                intent="Primary"
              >
                <InputGroup
                  className="Edit-input"
                  defaultValue={oldValues[index]}
                  type={inputType[index]}
                  intent="Primary"
                  placeholder={oldValues[index]}
                  id={label}
                  large={true}
                  fill={true}
                  required
                  min="0"
                  onChange={(e) => changeValues(e, label)}
                />
              </FormGroup>
            ))}

            {props.SinopsisForm ? (
              <FormGroup
                label="Sinopsis"
                LabelFor="Sinopsis"
                className="Edit-entry"
                intent="Primary"
                inline={true}
              >
                <TextArea
                  className="Edit-input"
                  fill={true}
                  defaultValue={props.MediaData.sinopsis}
                  intent="Primary"
                  large={true}
                  placeholder={props.MediaData.sinopsis}
                  required
                  onChange={(e) => changeValues(e, "Sinopsis")}
                />
              </FormGroup>
            ) : (
              <> </>
            )}
            <div className="edit-buttons">
              <Button
                className="submit-button"
                active={true}
                large={true}
                type="button"
                intent="Primary"
                text="Cancel"
                loading={waiting}
                onClick={(e) =>
                  window.history.back()
                }
              />

              <Button
                className="submit-button"
                active={true}
                large={true}
                type="submit"
                intent="Warning"
                text="Save"
                loading={waiting}
              />
            </div>
          </form>
          <img className="image-preview" src={imagePrev} alt="Preview" />
        </div>
      )}
    </div>
  );
}
