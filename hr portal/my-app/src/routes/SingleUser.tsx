import {
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import "../App.css";
import Person from "../components/Person";
import Documents from "../components/Documents";
import { Link } from "react-router-dom";
import SecondaryNav from "../components/SecondaryNav";

function SingleUser() {
  return (
    <>
      <Container>
        <SecondaryNav />
      </Container>
      <Tabs className="tabs" variant="soft-rounded" colorScheme="green">
        <TabList>
          <Link to="/">
            <Button className="backbtn">Back</Button>
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
    </>
  );
}

export default SingleUser;
