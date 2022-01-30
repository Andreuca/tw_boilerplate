import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { remove } from "../../utils/useAxios";


function projectCard({ project, setProjectList }) {

  const onDeleteClick = async () => {
    try {
      const response = await remove(`/project/${project.id}`)
      if(response.status == 200) {
        setProjectList(oldProjects => {
          const newProjects = oldProjects.filter(p => p.id != project.id)
          return newProjects
        })
      } 
    } catch (error) {
      alert('error')
    }
  }

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      marginRight="2em"
      mt={"1em"}
    >
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {project.difficulty} difficulty
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {project.name}
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {project.link}
          </Box>
        </Box>
        <Link to={`/project/edit/${project.id}`} >
          <Button colorScheme="blue" marginTop="2em" size={"sm"} mr="1em">
            Edit Project
          </Button>
        </Link>
        <Button colorScheme="red" marginTop="2em" size={"sm"} onClick={onDeleteClick}>
          Delete Project
        </Button>
      </Box>
    </Box>
  );
}

export default projectCard;
