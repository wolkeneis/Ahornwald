import { Alert, Button, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setFriendErrorVisible } from "../redux/interfaceSlice";

const LoginRequired = () => {
  const loginRequiredVisible = useAppSelector((state) => state.interface.loginRequiredVisible);
  const dispatch = useAppDispatch();

  return (
    <Snackbar
      action={
        <Button component="a" href={`${import.meta.env.VITE_MAIN_PAGE}/redirect/login`}>
          Login
        </Button>
      }
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={8000}
      onClose={() => dispatch(setFriendErrorVisible(false))}
      open={loginRequiredVisible}
    >
      <Alert onClose={() => dispatch(setFriendErrorVisible(false))} severity="error" variant="filled">
        You are not logged in. Please log in to continue.
      </Alert>
    </Snackbar>
  );
};

export default LoginRequired;
