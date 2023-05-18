import  { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import styled from '@emotion/styled'

const Container = styled.div`
  background-color: #E3F4F4;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  
`
const Box = styled.div`
  background-color: #F8F6F4;
  @media (max-width: 600px) {
    width: 90vw;
  }
`


const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'body', headerName: 'Body', width: 600 },
  ];

  return (
    <Container>
    <Box style={{ height: 450, width: '80%'}}>
      <DataGrid rows={data} columns={columns} />
    </Box>
    </Container>
  );
};

export default DataTable;
