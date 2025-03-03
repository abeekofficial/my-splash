import React from "react";
import FormInput from "./FormInput";
import { Form } from "react-router-dom";
import { Button } from "@mui/material";

const Search = () => {
  return (
    <Form
      method="post"
      style={{
        width: "50%",
        margin: "10px auto",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <FormInput name="search" placeholder="Search" type="text" />
      <Button type="submit" variant="outlined" color="text.primary">
        Search
      </Button>
    </Form>
  );
};

export default Search;
