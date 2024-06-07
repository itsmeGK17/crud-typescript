import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  TableContainer,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import axios from "axios";
import { orange } from "@mui/material/colors";

interface Student {
  id: number;
  stuname: string;
  email: string;
  handleSubmit: (e: React.FormEvent<HTMLInputElement>) => void;
}
const List: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  // console.log("student", students);
  useEffect(() => {
    fetchJsonData();
  }, []);

  const fetchJsonData = async () => {
    try {
      const respons = await axios.get<Student[]>(
        "http://localhost:3333/student"
      );
      // console.log("first",respons.data)
      setStudents(respons.data);
    } catch (error) {
      throw new Error("Somthing is Wrong ");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3333/student/${id}`);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      throw new Error("Somthing is Wrong ");
    }
  };

  const handleEdite = async (id: number) => {
    try {
      await axios.patch(`http://localhost:3333/student/${id}`,{
        headers: {
            contentType:"appliccation/json"
        },
        body: JSON.stringify({

        })
      });
    } catch (error) {
      throw new Error("Somthing is Wrong ");
    }
  };

  return (
    <>
      <Grid md={6} xs={12}>
        <Box
          sx={{ backgroundColor: orange[400] }}
          textAlign="center"
          color={"white"}
          mx={3}
          mb={3}
        >
          <Typography variant="h4">Student List</Typography>
        </Box>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#777777" }}>
              <TableCell align="center">No.</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students &&
              students?.map((student, id) => {
                // console.log("123456", student);
                return (
                  <TableRow key={id}>
                    <TableCell align="center">{id + 1}</TableCell>
                    <TableCell align="center">{student?.stuname}</TableCell>
                    <TableCell align="center">{student?.email}</TableCell>
                    <TableCell align="center">
                      <Tooltip placement="top" arrow title="Read">
                        <Button>
                          <VisibilityIcon/>
                        </Button>
                      </Tooltip>
                      <Tooltip placement="top" arrow title="Edit">
                        <Button>
                          <EditIcon onClick={() => handleEdite(student.id)} />
                        </Button>
                      </Tooltip>
                      <Tooltip placement="top" arrow title="Delete">
                        <Button onClick={() => handleDelete(student.id)}>
                          <DeleteForeverIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;
