import React, { useState, useEffect } from "react";

import Dropzone from "react-dropzone";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import { Component } from "react";
import { FormatListNumberedRtlOutlined } from "@material-ui/icons";

const UploadVideoDialog = ({ openForm, handleUploadClose }: any) => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  function onClose(): void {
    handleUploadClose();
    setVideoFile(null);
    setTitle("");
    setDescription("");
    setNotes([]);
    setThumbnail(null);
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

  function handleSubmit(): void {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile, videoFile.name);
    formData.append("thumbnail", thumbnail, thumbnail.name);
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
          {videoFile ? videoFile.name : ""}
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
          {thumbnail ? thumbnail.name : ""}
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
            ? notes.map((note) => <h3 key={note.name}>{note.name}</h3>)
            : ""}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadVideoDialog;
