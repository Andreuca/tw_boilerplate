import { Box } from "@chakra-ui/react";
import React from "react";
import ProjectList from "../components/project/ProjectList";
import { Button } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Home({ projectList }) {
  return (
    <Box>
      <Box textAlign="center" marginBottom="2em">
        <Heading>Proiecte</Heading>
      </Box>
      <Link to="/project/add">
        <Button colorScheme="green" marginBottom="1em">
          Add Project
        </Button>
      </Link>

      <ProjectList projectList={projectList} />
    </Box>
  );
}

export default Home;
