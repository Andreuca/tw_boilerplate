import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import UserCard from "./UserCard";

function UserList({ userList, setUserList, userEmail, canEdit }) {
  return (
    <Box>
      <Flex wrap={"wrap"}>
        {userList.map((a) => {
          if (a.email.includes(userEmail))
            return (
              <UserCard
                key={a.id}
                user={a}
                setUserList={setUserList}
                canEdit={canEdit}
              />
            );
        })}
      </Flex>
    </Box>
  );
}

export default UserList;
