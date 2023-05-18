import DataTable from "../components/DataTable"
import DepartmentComponent from "../components/CheckBox"
import {  Button } from '@mui/material';
import styled from '@emotion/styled'
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: #E3F4F4;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  position: relative;
  @media (max-width: 600px) {
    flex-direction: column; 
    margin: 10px;
  }
`
const Parent = styled.div`
  position: absolute;
  top: 20px;
  right: 50px;

`


const PostDetails = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem('formData')
  const logOut = ()=>{
    localStorage.removeItem('formData')
    navigate("/")
  }
  if(!userData){
    return(<h1 style={{color: '#537188'}}>You are not logged in <Link style={{color: 'blue'}} to={'/'}>Log In </Link> </h1>)

  }
  return (
    <Container>
     <Parent>
     <Button onClick={()=>logOut()} variant="contained" color="primary" >
        Log Out
      </Button>
      </Parent>
      <DataTable />
      <DepartmentComponent/>
    </Container>
  )
}

export default PostDetails