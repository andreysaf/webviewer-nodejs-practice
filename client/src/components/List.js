import { useEffect, useState, useRef } from 'react';
import {
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';

function List({updateFileSelected}) {
  const [listOfFiles, setListOfFiles] = useState([]);

  const getTheFilesFromTheServer = async () => {
    const response = await fetch('http://localhost:3001/list-files');
    const data = await response.json();
    setListOfFiles([...data]);
  };

  useEffect(() => {
    console.log('useEffect with no dependencies in array');
    getTheFilesFromTheServer();
  }, []);

  useEffect(() => {
    console.log('useEffect with listOfFiles dependency');
    console.log(listOfFiles);
  }, [listOfFiles]);

  return (
    <Box p={4} w={'400px'}>
      <Heading>List of files</Heading>
      <Table variant='simple'>
        <TableCaption>Select the file to display it in WebViewer</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Extension</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listOfFiles.map((file) => {
              const fileNameAndExt = file.split('.');
              const fileName = fileNameAndExt[0];
              const ext = fileNameAndExt[1];
            return (
              <Tr key={file} onClick={() => {
                updateFileSelected(file);
              }}>
                <Td>{fileName}</Td>
                <Td>{ext.toUpperCase()}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

export default List;
