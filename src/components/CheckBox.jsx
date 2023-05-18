import React, { useState } from 'react';
import { Checkbox, Collapse, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
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
  width: 50%;
  padding: 10px;
  background-color: #F8F6F4;
  @media (max-width: 600px) {
    width: 90vw;
    margin-top: 30px;
  }
`

const DepartmentComponent = () => {
  const [departments, setDepartments] = useState([
    {
      name: 'Department A',
      selected : false,
      expanded : false,
      sub_departments: [
        {
          name: 'Sub Department A1',
          selected: false,
        },
        {
          name: 'Sub Department A2',
          selected: false,
        }
      ]
    },
    {
      name: 'Department B',
      selected: false,
      expanded : false,
      sub_departments: [
        {
          name: 'Sub Department B1',
          selected: false,
        },
        {
          name: 'Sub Department B2',
          selected: false,
        }
      ]
    }
  ]);

  const handleDepartmentToggle = (index) => {
    setDepartments(prevDepartments => {
      const updatedDepartments = [...prevDepartments];
      updatedDepartments[index].expanded = !updatedDepartments[index].expanded;
      return updatedDepartments;
    });
  };

  const handleSubDepartmentSelect = (departmentIndex, subDepartmentIndex) => {
    setDepartments(prevDepartments => {
      const updatedDepartments = [...prevDepartments];
      updatedDepartments[departmentIndex].sub_departments[subDepartmentIndex].selected =
        !updatedDepartments[departmentIndex].sub_departments[subDepartmentIndex].selected;

      // Check if all sub-departments are selected
      const allSubDepartmentsSelected = updatedDepartments[departmentIndex].sub_departments.every(
        subDepartment => subDepartment.selected
      );

      updatedDepartments[departmentIndex].selected = allSubDepartmentsSelected;

      return updatedDepartments;
    });
  };

  const handleDepartmentSelect = (index) => {
    setDepartments(prevDepartments => {
      const updatedDepartments = [...prevDepartments];
      updatedDepartments[index].selected = !updatedDepartments[index].selected;

      updatedDepartments[index].sub_departments.forEach(subDepartment => {
        subDepartment.selected = updatedDepartments[index].selected;
      });

      return updatedDepartments;
    });
  };

  return (
    <Container>
     <Box>
      <List>
       {departments.map((department, departmentIndex) => (
        <React.Fragment key={departmentIndex}>
          <ListItem button onClick={() => handleDepartmentToggle(departmentIndex)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={department.selected || department.sub_departments.every(subDepartment => subDepartment.selected)}
                indeterminate={!department.selected && department.sub_departments.some(subDepartment => subDepartment.selected)}
                onClick={() => 
                    handleDepartmentSelect(departmentIndex)
                }
              />
            </ListItemIcon>
            <ListItemText primary={department.name} />
            <IconButton edge="end" size="small" onClick={() => handleDepartmentToggle(departmentIndex)}>
              {department.expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={department.expanded} timeout="auto" unmountOnExit>
            <List disablePadding>
              {department.sub_departments.map((subDepartment, subDepartmentIndex) => (
                <ListItem button key={subDepartmentIndex}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={subDepartment.selected}
                      onChange={() => handleSubDepartmentSelect(departmentIndex, subDepartmentIndex)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDepartment.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
    </Box>
    </Container>
  );
};

export default DepartmentComponent;
