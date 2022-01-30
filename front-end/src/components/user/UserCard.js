import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { remove } from "../../utils/useAxios";

function UserCard({ user, setUserList, canEdit }) {
  const onDeleteClick = async () => {
    try {
      const response = await remove(`/user/${user.id}`);
      if (response.status == 200) {
        if (setUserList) {
          setUserList((oldUsers) => {
            const newUsers = oldUsers.filter((u) => u.id != user.id);
            return newUsers;
          });
        }
      }
    } catch (error) {
      alert("error");
    }
  };

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
          >
            {user.email}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {user.firstName}
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {user.lastName}
        </Box>
        {canEdit && (
          <Box>
            <Link to={`/project/edit/${user.id}`}>
              <Button colorScheme="blue" marginTop="2em" size={"sm"} mr="1em">
                Edit user
              </Button>
            </Link>
            <Button
              colorScheme="red"
              marginTop="2em"
              size={"sm"}
              onClick={onDeleteClick}
            >
              Delete user
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default UserCard;
