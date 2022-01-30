import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import AddProject from "./pages/AddProject";
import AddUser from "./pages/AddUser";
import EditProject from "./pages/EditProject";
import EditUser from "./pages/EditUser";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import { get } from "./utils/useAxios";

function App() {
  const [projectList, setProjectList] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/project/");
        if (response.status === 200) {
          setProjectList(response.data.projects);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/user/");
        if (response.status === 200) {
          setUserList(response.data.users);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <Box marginX={"1em"}>
      <Router>
        <Flex justifyContent={"flex-end"}>
          <Box marginRight={"1em"}>
            <Link to="/">Home</Link>
          </Box>
          <Box marginRight={"1em"}>
            <Link to="/users">Users</Link>
          </Box>
        </Flex>

        <Routes>
          <Route
            path="/user/add/"
            element={<AddUser projectList={projectList} setUserList={setUserList} />}
          />
          <Route
            path="/user/edit/:id"
            element={<EditUser projectList={projectList} setUserList={setUserList} userList={userList}/>}
          />
          <Route
            path="/project/add/"
            element={<AddProject setProjectList={setProjectList} />}
          />
          <Route
            path="/project/edit/:id"
            element={
              <EditProject
                projectList={projectList}
                setProjectList={setProjectList}
                canEdit={false}
              />
            }
          />
          <Route
            path="/users"
            element={
              <UserPage userList={userList} setUserList={setUserList} canEdit={true} />
            }
          />
          <Route
            path="/"
            element={
              <Home projectList={projectList} setProjectList={setProjectList} />
            }
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
