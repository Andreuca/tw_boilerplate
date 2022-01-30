import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/useAxios";

function AddUser({ projectList, setUserList}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState();

  const navigate = useNavigate();

  const onChangeSelect = (e) => {
    setProject(e.target.value);
  };

  async function onAddClick() {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email,
      projectId: project,
    };
    try {
      const response = await post("/user/", { ...user });
      if (response.status === 201) {
        setUserList(value => [...value, response.data.user])
        navigate("/users");
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
      <Heading>Add User</Heading>
      <Box width={"60vw"} marginX="auto" marginTop="2em">
        <Input
          placeholder="First name"
          marginBottom={"1em"}
          value={firstName}
          isRequired={true}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder="Last name"
          marginBottom={"1em"}
          value={lastName}
          isRequired={true}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          marginBottom={"1em"}
          value={email}
          isRequired={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Select
          placeholder="Project"
          onChange={onChangeSelect}
          isRequired={true}
        >
          {projectList.map((p) => (
            <option value={p.id} key={p.id}>
              {p.name}
            </option>
          ))}
        </Select>
      </Box>
      <Button colorScheme="green" marginTop="2em" onClick={onAddClick}>
        Add User
      </Button>
    </Box>
  );
}

export default AddUser;
