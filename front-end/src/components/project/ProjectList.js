import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import ProjectCard from "./ProjectCard";

function ProjectList({ projectList, setProjectList, projectDiff }) {
  return (
    <Box>
      <Flex wrap={"wrap"}>
        {projectList.map((a) => {
          if (a.difficulty >= projectDiff)
            return <ProjectCard
              project={a}
              key={a.id}
              setProjectList={setProjectList}
            />;
        })}
      </Flex>
    </Box>
  );
}

export default ProjectList;
