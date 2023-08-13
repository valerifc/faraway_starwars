import React from "react";
import Typography from "@mui/material/Typography";

type PageTitleProps = {
  children: JSX.Element | string;
};

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <Typography
      variant="h4"
      sx={{
        mt: 2,
        mb: 2,
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
      }}
    >
      {children}
    </Typography>
  );
};

export default PageTitle;
