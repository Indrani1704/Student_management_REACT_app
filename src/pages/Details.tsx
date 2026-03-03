import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import type { Student } from "../types/interface/student.types";

function Details() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      try {
        const res = await API.get<Student>(`/students/${id}`);
        setStudent(res.data);
      } catch {
        toast.error("Failed to load student");
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) return null;

  return (
    <Box sx={{ minHeight: "100vh", background: "#f4f6f9", py: 8 }}>
      <Container maxWidth="md">
        <Paper
          sx={{
            p: 5,
            borderRadius: 4,
            boxShadow:
              "0px 15px 40px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            color="primary"
          >
            Student Information
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={4}>
            <Grid xs={12} sm={6}>
              <Typography fontWeight={600}>
                Full Name
              </Typography>
              <Typography color="text.secondary">
                {student.name}
              </Typography>
            </Grid>

            <Grid xs={12} sm={6}>
              <Typography fontWeight={600}>
                Email Address
              </Typography>
              <Typography color="text.secondary">
                {student.email}
              </Typography>
            </Grid>

            <Grid xs={12} sm={6}>
              <Typography fontWeight={600}>
                Age
              </Typography>
              <Typography color="text.secondary">
                {student.age} Years
              </Typography>
            </Grid>

            <Grid xs={12} sm={6}>
              <Typography fontWeight={600}>
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