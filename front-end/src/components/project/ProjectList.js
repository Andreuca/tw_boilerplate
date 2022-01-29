import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import ProjectCard from "./ProjectCard";

function ProjectList({ projectList }) {
  return (
    <Box>
      <Flex wrap={"wrap"}>
        {projectList.map((a) => (
          <ProjectCard project={a} key={a.name} />
        ))}
      </Flex>
    </Box>
  );
}

export default ProjectList;
