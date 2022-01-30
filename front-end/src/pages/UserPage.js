import { Box, Button, Heading, Text, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserList from "../components/user/UserList";

function UserPage({ userList, setUserList, canEdit }) {
  const [userEmail, setUserEmail] = useState("");

  return (
    <Box>
      <Box textAlign="center" marginBottom="2em">
        <Heading>Users</Heading>
        <Box width="60vw" mx="auto" mt="1em">
          <Text as="h4">Filter by user email</Text>
          <Input
            placeholder="User email"
            marginBottom={"1em"}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Box>
      </Box>
      <Link to="/user/add">
        <Button colorScheme="green" marginBottom="1em">
          Add User
        </Button>
      </Link>

      <UserList
        userList={userList}
        setUserList={setUserList}
        userEmail={userEmail}
        canEdit={canEdit}
      />
    </Box>
  );
}

export default UserPage;
