import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const Form = ({ onEncrypt }) => {
  const [value, setValue] = useState("");
  return (
    <Box component="form" autoComplete="off" noValidate>
      <TextField
        id="plain-text"
        label="Plain Text"
        variant="outlined"
        onChange={event => setValue(event.target.value)}
        fullWidth
        multiline
        sx={{
          mb: 2,
          maxWidth: 600,
          mx: "auto",
          display: "block",
        }}
        minRows={6}
      />
      <Button
        variant="contained"
        onClick={() => onEncrypt(value.trim())}
        sx={{
          mx: "auto",
          display: "block",
          px: 3,
          py: 1,
          fontSize: 20,
        }}
      >
        Encrypt
      </Button>
    </Box>
  );
};

export default Form;
