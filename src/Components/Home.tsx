import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography, Box, Button } from "@mui/material";
import { deepPurple, green, orange } from "@mui/material/colors";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import axios from "axios";
import List from "./List";
import axios from "axios";

interface Student {
  id: number;
  stuname: string;
  email: string;
  handleSubmit: (e: React.FormEvent<HTMLInputElement>) => void;
}

interface FormData {
  stuname: string;
  email: string;
}

const Home: React.FC = () => {
  //   const classess = useStyles();

  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<FormData>({
    stuname: "",
    email: "",
  });

  const [status, setStatus] = useState(false);

  // console.log("student", students);

  // useEffect(() => {
  //   fetchJsonData();
  // }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const respons = await axios.post<Student[]>(
        `http://localhost:3333/student`,
        formData
      );
      // console.log("first",respons.data)
      setStatus(true);
      setStudents(respons.data);
    } catch (error) {
      throw new Error("Somthing is Wrong ");
    }
  };

  if (status) {
    return <Home />;
  }

  return (
    <>
      <Box textAlign="center" color={deepPurple[400]} p={2}>
        <Typography variant="h2">React-Crud</Typography>
      </Box>
      <Grid>
        <Grid md={6} xs={12}>
          <Box
            sx={{ backgroundColor: green[400] }}
            textAlign="center"
            color={"white"}
            mx={3}
            mb={3}
          >
            <Typography variant="h4">Add Student</Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container mx={3} spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextField
                  variant="outlined"
                  placeholder=" Enter Name"
                  name="stuname"
                  value={formData.stuname}
                  onChange={handleInput}
                  fullWidth
                />
                <Grid item xs={12} mt={1}>
                  <TextField
                    variant="outlined"
                    placeholder=" Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInput}
                    fullWidth
                  />
                </Grid>
                <Box m={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Add
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid>
          <List />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
