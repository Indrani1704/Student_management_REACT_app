import { Box, Container } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function PageLayout({ children }: Props) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#eef2f7,#f8fafc)",
        py: 6,
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}

export default PageLayout;