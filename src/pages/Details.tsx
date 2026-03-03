import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

interface Student {
  _id?: string;
  name: string;
  email: string;
  age: number;
  course: string;
}

function Details() {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (id) {
      API.get<Student>(`/students/${id}`).then((res) =>
        setStudent(res.data)
      );
    }
  }, [id]);

  if (!student) return null;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f9" }}>
      {/* Banner */}
      <Box
        sx={{
          height: 220,
          background:
            "linear-gradient(90deg, #1e3a8a, #2563eb)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#fff",
        }}
      >
        <Avatar
          sx={{
            width: 90,
            height: 90,
            bgcolor: "#fff",
            color: "#1e3a8a",
            mb: 2,
          }}
        >
          <SchoolIcon fontSize="large" />
        </Avatar>

        <Typography variant="h4" fontWeight="bold">
          {student.name}
        </Typography>

        <Typography variant="subtitle1">
          Student Profile
        </Typography>
      </Box>

      {/* Info Section */}
      <Container maxWidth="md" sx={{ mt: -6 }}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            color="primary"
          >
            Student Information
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight="600">
                Full Name
              </Typography>
              <Typography color="text.secondary">
                {student.name}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography fontWeight="600">
                Email Address
              </Typography>
              <Typography color="text.secondary">
                {student.email}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography fontWeight="600">
                Age
              </Typography>
              <Typography color="text.secondary">
                {student.age} Years
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography fontWeight="600">
                Course Enrolled
              </Typography>
              <Typography color="text.secondary">
                {student.course}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default Details;