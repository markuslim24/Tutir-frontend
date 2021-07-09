import React, { useState } from "react";

import Dropzone from "react-dropzone";
import axios from "axios";
import { client } from "../util/util";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Chip,
  Input,
  InputAdornment,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import Alerts from "../components/Alerts";

const UploadVideoDialog = ({
  openForm,
  handleUploadClose,
  getTableData,
}: any) => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagField, setTagField] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleAlerts = (message: string) => {
    setIsAlert(true);
    setAlertMessage(message);
  };

  function onClose(): void {
    handleUploadClose();
    setVideoFile(null);
    setTitle("");
    setDescription("");
    setNotes([]);
    setThumbnail(null);
    setTags([]);
  }

  function onFileChange(event: any, fileHandler: Function): void {
    // Update the state
    fileHandler(event.target.files[0]);
  }
  function onMultiFileChange(event: any, fileHandler: Function): void {
    // Update the state
    if (event.target.files.length + notes.length > 5) {
      console.log("too many files!");
    } else {
      let tmp = notes;
      tmp.push(...event.target.files);
      setNotes([...tmp]);
    }
  }

  const handleTagFieldEnter = () => {
    if (tagField !== "") {
      let tmp = tags;
      let tagToAdd = tagField.toLowerCase();
      let isDuplicate = false;
      tmp.forEach((tag) => {
        if (tag == tagToAdd) {
          isDuplicate = true;
        }
      });
      if (!isDuplicate) {
        tmp.push(tagToAdd);
        setTags(tmp);
        setTagField("");
      }
    }
  };

  const handleTagFieldKeyPress = (e) => {
    if (e.keyCode == 13) {
      handleTagFieldEnter();
    }
  };

  const handleTagChipDelete = (index: number) => {
    let tmp = tags;
    if (index > -1) {
      tmp.splice(index, 1);
    }
    setTags([...tmp]);
  };

  async function handleSubmit() {
    setIsSubmitDisabled(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile);
    formData.append("thumbnail", thumbnail);
    notes.forEach((note) => {
      formData.append("notes", note);
    });
    tags.forEach((tag) => {
      formData.append("tags", tag);
    });

    try {
      let res = await client.post("/video/upload", formData);
      onClose();
      getTableData();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        let code = err.response?.data.code;
        // if (code === "invalid_params") {
        //   return handleAlerts("invalid params!");
        // } else if (code === "auth_login_failed") {
        //   return handleAlerts("Incorrect username/password!");
        // }
      }
      throw err;
    } finally {
      setIsSubmitDisabled(false);
    }
  }

  return (
    <div>
      <Dialog open={openForm} onClose={onClose}>
        <DialogTitle id="form-dialog-title">Upload Video</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To upload a video, please select your video file(currently mp4 only)
            and fill in the respective details.
          </DialogContentText>
          <Button variant="contained" component="label">
            Select Video File
            <input
              required
              type="file"
              hidden
              onChange={(e) => onFileChange(e, setVideoFile)}
              accept="video/mp4"
            />
          </Button>
          <Typography display="inline" style={{ marginLeft: "1rem" }}>
            {videoFile ? videoFile.name : ""}
          </Typography>
        </DialogContent>
        <DialogContent>
          <Button variant="contained" component="label">
            Select Thumbnail
            <input
              type="file"
              hidden
              onChange={(e) => onFileChange(e, setThumbnail)}
              accept="image/jpeg, image/png"
            />
          </Button>
          <Typography display="inline" style={{ marginLeft: "1rem" }}>
            {thumbnail ? thumbnail.name : ""}
          </Typography>
        </DialogContent>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="description"
            label="Description..."
            type="text"
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <Button variant="contained" component="label">
            Select PDF Notes(optional)
            <input
              multiple
              type="file"
              hidden
              onChange={(e) => onMultiFileChange(e, setNotes)}
              accept="application/pdf"
            />
          </Button>
          {notes.length > 0
            ? notes.map((note) => (
                <Typography key={note.name}>{note.name}</Typography>
              ))
            : ""}
        </DialogContent>
        <DialogContent>
          <Input
            required
            margin="dense"
            id="tags"
            placeholder="Add a tag..."
            type="text"
            value={tagField}
            onKeyDown={handleTagFieldKeyPress}
            onChange={(e) => setTagField(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button onClick={handleTagFieldEnter}>
                  <AddIcon />
                </Button>
              </InputAdornment>
            }
          />
        </DialogContent>
        <DialogContent>
          {" "}
          {tags.length > 0
            ? tags.map((tag, index) => (
                <Chip
                  style={{
                    marginRight: "0.5rem",
                  }}
                  color="primary"
                  key={index}
                  label={tag}
                  onDelete={() => handleTagChipDelete(index)}
                />
              ))
            : ""}
        </DialogContent>
        <Alerts
          isAlert={isAlert}
          isError={true}
          setIsAlert={setIsAlert}
          message={alertMessage}
        />
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadVideoDialog;
