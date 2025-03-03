import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import React from "react";

const FormInput = ({ type, placeholder, name }) => {
  return (
    <>
      <TextField
        type={type}
        id="outlined-basic"
        variant="outlined"
        fullWidth
        size="small"
        placeholder={placeholder}
        name={name}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default FormInput;
