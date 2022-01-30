import {
  Box,
  Button,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserCard from "../components/user/UserCard";
import { get, patch } from "../utils/useAxios";

function EditProject({ projectList, setProjectList, canEdit }) {
  let { id } = useParams();
  id = parseInt(id);
  const project = projectList.filter((p) => p.id == id)[0];
  const [projectName, setProjectName] = useState(project.name);
  const [projectLink, setProjectLink] = useState(project.link);
  const [projectDiff, setProjectDiff] = useState(project.difficulty);
  const [users, setUsers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await get(`/user/byProject/${project.id}/${offset}`);
        if (response.status === 200) {
          setUsers(response.data.rows);
          setCount((value) => value + 1);
          setTotalCount(response.data.count);
        }
      } catch (error) {
        alert("error");
      }
    };

    fetchUser();
  }, []);

  const onNextPageClick = async () => {
    try {
      const response = await get(`/user/byProject/${project.id}/${offset + 1}`);
      if (response.status === 200) {
        setOffset((value) => value + 1);
        setCount((value) => value + 1);
        setUsers(response.data.rows);
      }
    } catch (error) {
      alert("error");
    }
  };

  const onPreviousPageClick = async () => {
    try {
      const response = await get(`/user/byProject/${project.id}/${offset - 1}`);
      if (response.status === 200) {
        setOffset((value) => value - 1);
        setCount((value) => value - 1);
        setUsers(response.data.rows);
      }
    } catch (error) {
      alert("error");
    }
  };

  async function onEditClick() {
    try {
      const response = await patch(`/project/${project.id}`, {
        name: projectName,
        link: projectLink,
        difficulty: projectDiff,
      });
      if (response.status === 200) {
        setProjectList((value) => {
          let newProjects = projectList.filter((p) => p.id != id);
          newProjects = [...newProjects, response.data.project];
          return newProjects;
        });
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
      <Heading>Edit Project {project.name}</Heading>
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
      <Button colorScheme="green" marginTop="2em" onClick={onEditClick}>
        Edit Project
      </Button>
      <Box w="80vh" mx="auto">
        {users.map((user) => (
          <Box textAlign={"left"} key={user.id}>
            <UserCard user={user} canEdit={canEdit} />
          </Box>
        ))}
        {totalCount > 0 && (
          <Flex justifyContent={"space-between"}>
            <Button
              colorScheme="green"
              marginTop="2em"
              onClick={onPreviousPageClick}
              disabled={offset <= 0}
            >
              Previous page
            </Button>
            <Button
              colorScheme="green"
              marginTop="2em"
              onClick={onNextPageClick}
              disabled={totalCount <= count}
            >
              Next page
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
}

export default EditProject;
