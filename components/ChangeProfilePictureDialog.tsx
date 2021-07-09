import React, { useState } from "react";
import axios from "axios";
import { client } from "../util/util";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";

const ChangeProfilePictureDialog = ({
  setOpenProfilePicture,
  openProfilePicture,
}) => {
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState("");

  function onFileChange(event: any, fileHandler: Function): void {
    // Update the state
    fileHandler(event.target.files[0]);
    setImgPreview(URL.createObjectURL(event.target.files[0]));
  }

  function onClose(): void {
    setOpenProfilePicture(false);
    setImgFile(null);
  }
  async function handleSubmit() {
    const formData = new FormData();
    formData.append("profileImage", imgFile);
    try {
      let res = await client.post(`/user/profileImage`, formData);

      onClose();
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
    }
  }

  return (
    <div>
      <Dialog open={openProfilePicture} onClose={onClose}>
        <DialogContent>
          <Button variant="contained" component="label">
            Select Image
            <input
              type="file"
              hidden
              onChange={(e) => onFileChange(e, setImgFile)}
              accept="image/jpeg, image/png"
            />
          </Button>
          <img
            src={imgPreview}
            sizes="100px"
            style={{
              marginLeft: "1rem",
              display: "inline",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "transparent",
            }}
          />
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

export default ChangeProfilePictureDialog;
