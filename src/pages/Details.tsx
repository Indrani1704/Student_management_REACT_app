import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SchoolIcon from "@mui/icons-material/School";
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
    <Box sx={{ minHeight: "100vh", background: "#f1f5f9" }}>
      
      {/* ===== College Header Banner ===== */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #0f172a, #1e3a8a)",
          color: "#fff",
          py: 5,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          ABC College of Engineering
        </Typography>
        <Typography variant="subtitle1">
          Student Academic Portal
        </Typography>
      </Box>

      {/* ===== Profile Section ===== */}
      <Container maxWidth="md" sx={{ mt: -4 }}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0px 15px 40px rgba(0,0,0,0.08)",
          }}
        >
          <Stack alignItems="center" spacing={2}>
            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: "#1e3a8a",
              }}
            >
              <SchoolIcon fontSize="large" />
            </Avatar>

            <Typography variant="h5" fontWeight="bold">
              {student.name}
            </Typography>

            <Typography color="text.secondary">
              {student.course} Department
            </Typography>
          </Stack>

          <Divider sx={{ my: 4 }} />

          {/* ===== Academic Details ===== */}
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#1e3a8a" }}
          >
            Academic Information
          </Typography>

          <Grid container spacing={4} sx={{ mt: 1 }}>
            <Grid xs={12} sm={6}>
              <Typography fontWeight={600}>
                Student Name
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