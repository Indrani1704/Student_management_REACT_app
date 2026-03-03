import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import type { Student } from "../../types/interface/student.types";

interface Props {
  students: Student[];
  onDelete: (id?: string) => void;
}

function StudentTable({ students, onDelete }: Props) {
  return (
    <Paper sx={{ borderRadius: 4, p: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f1f5f9" }}>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Course</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {students.map((student) => (
            <TableRow key={student._id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell align="center">
                <IconButton
                  component={Link}
                  to={`/student/${student._id}`}
                >
                  <Visibility />
                </IconButton>
                <IconButton
                  component={Link}
                  to={`/edit/${student._id}`}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(student._id)}
                >
                  <Delete color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default StudentTable;