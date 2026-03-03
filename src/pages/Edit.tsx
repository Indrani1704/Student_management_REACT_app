import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import API from "../api/axios";
import { toast } from "react-toastify";
import type { Student } from "../types/interface/student.types";

interface StudentForm {
  name: string;
  email: string;
  age: string;
  course: string;
}

const studentSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(1, "Age must be valid"),
  course: Yup.string().required("Course is required"),
});

function Edit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<StudentForm>({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof StudentForm, string>>
  >({});

  // Fetch student data safely with typing
  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      try {
        const res = await API.get<Student>(`/students/${id}`);

        setForm({
          name: res.data.name,
          email: res.data.email,
          age: String(res.data.age),
          course: res.data.course,
        });
      } catch {
        toast.error("Failed to load student");
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = async () => {
    try {
      await studentSchema.validate(form, {
        abortEarly: false,
      });
      setErrors({});
      return true;
    } catch (err: any) {
      const validationErrors: any = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] =
          error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (!id) return;

    const isValid = await validate();
    if (!isValid) return;

    try {
      await API.put(`/students/${id}`, {
        ...form,
        age: Number(form.age),
      });

      toast.success("Student updated successfully ");
      navigate("/");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef2f7, #f8fafc)",
        py: 8,
      }}
    >
      <Container maxWidth="sm">
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
            mb={4}
            textAlign="center"
          >
            Edit Student Information
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Full Name"
                name="name"
                fullWidth
                value={form.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />

              <TextField
                label="Email Address"
                name="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />

              <TextField
                label="Age"
                name="age"
                type="number"
                fullWidth
                value={form.age}
                onChange={handleChange}
                error={Boolean(errors.age)}
                helperText={errors.age}
              />

              <TextField
                label="Course"
                name="course"
                fullWidth
                value={form.course}
                onChange={handleChange}
                error={Boolean(errors.course)}
                helperText={errors.course}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  borderRadius: 3,
                  background:
                    "linear-gradient(90deg, #2563eb, #1e3a8a)",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Update
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default Edit;