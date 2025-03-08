import React from "react";
import FormInput from "./FormInput";
import { Form } from "react-router-dom";
import { Button } from "@mui/material";

const Search = () => {
  return (
    <Form
      method="post"
      style={{
        width: "90%",
        margin: "10px auto",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <FormInput name="search" placeholder="Search" type="text" />
      <Button
        type="submit"
        variant="contained"
        sx={{
          fontSize: { xs: "12px", md: "15px" },
          textTransform: "capitalize",
        }}
      >
        Search
      </Button>
    </Form>
  );
};

export default Search;
