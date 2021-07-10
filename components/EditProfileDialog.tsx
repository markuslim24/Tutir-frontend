import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/slice/auth";
import { client } from "../util/util";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const EditProfileDialog = ({ openEditProfile, setOpenEditProfile }) => {
  const [name, setName] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const dispatch = useDispatch();

  function onClose(): void {
    setOpenEditProfile(false);
    setName("");
  }

  async function handleSubmit() {
    try {
      setIsSubmitDisabled(true);
      let res = await client.post("/user/name", { name });
      dispatch(updateUser(res.data.payload));
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        let code = err.response?.data.code;
        console.log(code);
      }
      throw err;
    } finally {
      setIsSubmitDisabled(false);
    }
  }

  return (
    <div>
      <Dialog open={openEditProfile} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            type="text"
            label="New Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
            color="primary"
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProfileDialog;
