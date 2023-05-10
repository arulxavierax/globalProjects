import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import "../App.css";
import Person from "../components/Person";
import Documents from "../components/Documents";
import { Link, Navigate } from "react-router-dom";

function SingleUser() {
  return (
    <Tabs className="tabs" variant="soft-rounded" colorScheme="green">
      <TabList>
        <Link to="/">
          <Button>Back</Button>
        </Link>
        <Tab>Person</Tab>
        <Tab>Documents</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Person />
        </TabPanel>
        <TabPanel>
          <Documents />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default SingleUser;
