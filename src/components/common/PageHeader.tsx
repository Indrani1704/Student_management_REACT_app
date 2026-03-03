import { Typography, Stack } from "@mui/material";

interface Props {
  title: string;
  subtitle?: string;
}

function PageHeader({ title, subtitle }: Props) {
  return (
    <Stack mb={4}>
      <Typography variant="h4" fontWeight="bold">
        {title}
      </Typography>
      {subtitle && (
        <Typography color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}

export default PageHeader;