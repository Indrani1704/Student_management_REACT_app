import {
  Paper,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import type { Student } from "../../types/interface/student.types";

interface Props {
  student: Student;
}

function StudentProfile({ student }: Props) {
  return (
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
      >
        Academic Information
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography fontWeight="600">
            Name
          </Typography>
          <Typography>{student.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography fontWeight="600">
            Email
          </Typography>
          <Typography>{student.email}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography fontWeight="600">
            Age
          </Typography>
          <Typography>{student.age}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography fontWeight="600">
            Course
          </Typography>
          <Typography>{student.course}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default StudentProfile;