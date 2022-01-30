import {
  Box,
  Button,
  Heading,
  NumberInput,
  NumberInputField,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectList from "../components/project/ProjectList";

function Home({ projectList, setProjectList }) {
  const [projectDiff, setProjectDiff] = useState(1);

  return (
    <Box>
      <Box textAlign="center" marginBottom="2em">
        <Heading>Proiecte</Heading>
        <Box width="60vw" mx="auto" mt="1em">
          <Text as="h4">Filter by minimum difficulty</Text>
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
      </Box>
      <Link to="/project/add">
        <Button colorScheme="green" marginBottom="1em">
          Add Project
        </Button>
      </Link>

      <ProjectList
        projectList={projectList}
        setProjectList={setProjectList}
        projectDiff={projectDiff}
      />
    </Box>
  );
}

export default Home;
