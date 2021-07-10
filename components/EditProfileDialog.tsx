import React, { useState, useEffect } from "react";
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

const EditProfileDialog = ({ openEditProfile, setOpenEditProfile, user }) => {
  const [name, setName] = useState(user.name);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setName(user.name);
  }, [user.name]);

  function onClose(): void {
    setOpenEditProfile(false);
  }

  async function handleSubmit() {
    if (name) {
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
    } else {
      onClose();
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
