import {
  Box,
  Button,
  Center,
  Container,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { Dispatch, useEffect, useState } from "react";
import { RootState, store } from "../store/store";
import {
  downloadDocument,
  getDocuments,
  uploadDocument,
} from "../store/documents/documents.action";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../App.css";
import { DownloadIcon } from "@chakra-ui/icons";

function Documents() {
  const toast = useToast();
  const { id } = useParams();
  const [isDoc, setIsDoc] = useState<any>("");
  const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
  const { data, error, loading } = useSelector(
    (store: RootState) => store.documents
  );

  const formdata = new FormData();
  formdata.append("document", isDoc);

  useEffect(() => {
    dispatchStore(getDocuments(id));
  }, [id]);

  if (loading) {
    return (
      <Center h="300px">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  if (error) {
    return <h1>Something Went Wrong!</h1>;
  }

  const handleChange = (e: any) => {
    setIsDoc(e.target.files[0]);
  };

  const handleFile = () => {
    dispatchStore(uploadDocument(id, formdata)).then((res: any) => {
      toast({
        title: "Document Uploaded.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  const handleDownload = (e: string) => {
    dispatchStore(downloadDocument(e));
  };

  return (
    <Box>
      <Container>
        <form
          name="uploader"
          action="/fileupload"
          method="post"
          encType="multipart/form-data"
        >
          <Input type="file" name="document" onChange={handleChange} />
          <Button onClick={handleFile}>Submit</Button>
        </form>
      </Container>

      <Container className="table">
        <Table>
          <Thead>
            <Tr>
              <Th>sl no.</Th>
              <Th>File Name</Th>
              <Th>Created Time</Th>
            </Tr>
          </Thead>
          {data?.map((e: any, i: number) => (
            <Tbody key={e.UniqueId}>
              <Tr>
                <Td>{i + 1}</Td>
                <Td>{e.Name}</Td>
                <Td>{e.TimeCreated.slice(0, 10)}</Td>
                <Td onClick={() => handleDownload(e.ServerRelativeUrl)}>
                  <DownloadIcon />
                </Td>
              </Tr>
            </Tbody>
          ))}
        </Table>
      </Container>
    </Box>
  );
}

export default Documents;
