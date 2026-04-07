import { Snackbar, Typography } from "@mui/material";

const Toast = ({
  open,
  text,
  onClose,
  backgroundColor,
}: {
  open: boolean;
  text: string;
  onClose: any;
  backgroundColor: string,
}) => {
  return (
    <Snackbar
      autoHideDuration={3000}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      style={{backgroundColor: backgroundColor, padding: 10, borderRadius: 8}}
    >
      <Typography>{text}</Typography>
    </Snackbar>
  );
};

export default Toast;
