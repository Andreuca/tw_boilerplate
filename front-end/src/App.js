import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Home from "./pages/Home";
import { Flex, Box } from "@chakra-ui/react";
import AddProject from "./pages/AddProject";
import { useState } from "react";

function App() {
  const [projectList, setProjectList] = useState([]);

  return (
    <Box marginX={"1em"}>
      <Router>
        <Flex justifyContent={"flex-end"}>
          <Box marginRight={"1em"}>
            <Link to="/">Home</Link>
          </Box>
          <Box marginRight={"1em"}>
            <Link to="/page1">page1</Link>
          </Box>
          <Box marginRight={"1em"}>
            <Link to="/page2">page2</Link>
          </Box>
        </Flex>

        <Routes>
          <Route
            path="/project/add"
            element={<AddProject setProjectList={setProjectList} />}
          />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />

          <Route path="/" element={<Home projectList={projectList} />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
