import {
  Container,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Pagination,
  Stack,
  Box,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import type { Student } from "../types/interface/student.types";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 5;

function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState<number>(1);

  const fetchStudents = async () => {
    try {
      const res = await API.get<Student[]>("/students");
      setStudents(res.data);
    } catch {
      toast.error("Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id) return;

    try {
      await API.delete(`/students/${id}`);
      toast.success("Student deleted");
      fetchStudents();
    } catch {
      toast.error("Delete failed");
    }
  };

  const paginatedStudents = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return students.slice(start, start + ITEMS_PER_PAGE);
  }, [students, page]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2f7 0%, #f9fafc 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#1e293b" }}
          >
            Student Information
          </Typography>

          <Button
            variant="contained"
            component={Link}
            to="/add"
            sx={{
              borderRadius: 3,
              px: 3,
              background: "linear-gradient(90deg, #6366f1, #4f46e5)",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
             Add Student
          </Button>
        </Stack>

        {/* Table Card */}
        <Paper
          sx={{
            borderRadius: 4,
            p: 3,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#f1f5f9",
                }}
              >
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Age</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Course</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => (
                  <TableRow
                    key={student._id ?? student.email}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f8fafc",
                      },
                    }}
                  >
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.age}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        component={Link}
                        to={`/student/${student._id}`}
                        sx={{ color: "#0ea5e9" }}
                      >
                        <Visibility />
                      </IconButton>

                      <IconButton
                        component={Link}
                        to={`/edit/${student._id}`}
                        sx={{ color: "#6366f1" }}
                      >
                        <Edit />
                      </IconButton>

                      <IconButton
                        onClick={() => handleDelete(student._id)}
                        sx={{ color: "#ef4444" }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No students found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <Stack mt={4} alignItems="center">
            <Pagination
              count={Math.ceil(students.length / ITEMS_PER_PAGE)}
              page={page}
              onChange={(_, value) => setPage(value)}
              shape="rounded"
              color="primary"
            />
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home;