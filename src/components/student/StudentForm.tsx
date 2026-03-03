import {
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import type { Student } from "../../types/interface/student.types";

interface Props {
  initialData?: Student;
  onSubmit: (data: Student) => void;
  buttonText: string;
}

const schema = Yup.object({
  name: Yup.string().required("Name required"),
  email: Yup.string().email().required(),
  age: Yup.number().required(),
  course: Yup.string().required(),
});

function StudentForm({
  initialData,
  onSubmit,
  buttonText,
}: Props) {
  const [form, setForm] = useState<Student>(
    initialData || {
      name: "",
      email: "",
      age: 0,
      course: "",
    }
  );

  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    try {
      await schema.validate(form, {
        abortEarly: false,
      });
      setErrors({});
      onSubmit({ ...form, age: Number(form.age) });
    } catch (err: any) {
      const validationErrors: any = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] =
          error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            error={Boolean(errors.age)}
            helperText={errors.age}
          />
          <TextField
            label="Course"
            name="course"
            value={form.course}
            onChange={handleChange}
            error={Boolean(errors.course)}
            helperText={errors.course}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 3,
              background:
                "linear-gradient(90deg,#2563eb,#1e3a8a)",
            }}
          >
            {buttonText}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default StudentForm;