import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { post } from "../utils/useAxios";

function AddProject({ setProjectList }) {
  const [projectName, setProjectName] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectDiff, setProjectDiff] = useState(1);

  const navigate = useNavigate();

  async function onAddClick() {
    const project = {
      name: projectName,
      link: projectLink,
      difficulty: projectDiff,
    };
    try {
      const response = await post("/project/", { ...project });
      if (response.status === 201) {
        setProjectList((value) => [...value, response.data.project]);
        navigate("/");
      } else {
        alert("Invalid");
      }
    } catch (error) {
      alert("Invalid");
      console.log(error);
    }
  }

  return (
    <Box textAlign="center" marginBottom="2em">
      <Heading>Add Project</Heading>
      <Box width={"60vw"} marginX="auto" marginTop="2em">
        <Input
          placeholder="Project name"
          marginBottom={"1em"}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Input
          placeholder="Project link"
          marginBottom={"1em"}
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
        />
        <NumberInput
          placeholder="Project difficulty"
          min="1"
          max="100"
          value={projectDiff}
          onChange={(value) => setProjectDiff(value)}
        >
          <NumberInputField />
        </NumberInput>
      </Box>
      <Button colorScheme="green" marginTop="2em" onClick={onAddClick}>
        Add Project
      </Button>
    </Box>
  );
}

export default AddProject;
