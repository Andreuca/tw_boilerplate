import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patch } from "../utils/useAxios";

function EditUser({ projectList, setUserList, userList }) {
  let { id } = useParams();
  id = parseInt(id);
  const user = userList.filter((U) => U.id == id)[0];
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [project, setProject] = useState(user.projectId);

  const navigate = useNavigate();

  const onChangeSelect = (e) => {
    setProject(e.target.value);
  };

  async function onEditClick() {
    const user = {
      firstName: firstName,
      lastName: lastName,
      projectId: project,
    };
    if (!project) {
      alert('Project is invalid')
      return;
    }
    try {
      const response = await patch(`/user/${id}`, { ...user });
      if (response.status === 200) {
        setUserList((value) => {
            let newUsers = userList.filter((u) => u.id != id);
            newUsers = [...newUsers, response.data.user];
            return newUsers;
        });
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
          readOnly={true}
          value={email}
          isRequired={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Select
          placeholder="Project"
          onChange={onChangeSelect}
          isRequired={true}
          defaultValue={project}
        >
          {projectList.map((p) => (
            <option value={p.id} key={p.id}>
              {p.name}
            </option>
          ))}
        </Select>
      </Box>
      <Button colorScheme="green" marginTop="2em" onClick={onEditClick}>
        Edit User
      </Button>
    </Box>
  );
}

export default EditUser;
