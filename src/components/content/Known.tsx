import { Alert, Avatar, Box, Card, CardHeader, CardMedia, CircularProgress, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFriendErrorVisible } from "../../redux/interfaceSlice";
import LoginRequired from "../LoginRequired";

const ProfileSettings = () => {
  const profile = useAppSelector((state) => state.session.profile);
  const mobile = useAppSelector((state) => state.interface.mobile);
  const friendErrorVisible = useAppSelector((state) => state.interface.friendErrorVisible);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: mobile ? 0 : 4
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={4000}
        onClose={() => dispatch(setFriendErrorVisible(false))}
        open={friendErrorVisible}
      >
        <Alert onClose={() => dispatch(setFriendErrorVisible(false))} severity="error" variant="filled">
          There was an error with this operation.
        </Alert>
      </Snackbar>
      {profile === undefined ? (
        <CircularProgress />
      ) : (
        <>
          {profile !== null ? (
            <>
              <Card
                sx={{
                  maxWidth: 385,
                  width: "fill-available"
                }}
              >
                <CardHeader
                  avatar={
                    <>
                      {profile.avatar ? (
                        <>
                          <Avatar alt={profile.username} src={(profile.avatar as string) ?? ""} />
                        </>
                      ) : (
                        <Avatar alt={profile.username}>{profile.username.substring(0, 2)}</Avatar>
                      )}
                    </>
                  }
                  subheader={profile.uid}
                  title={profile?.username}
                />
                <CardMedia
                  alt="Random Image"
                  component="img"
                  height="194px"
                  image={`https://picsum.photos/seed/${profile.uid.toLowerCase()}${profile.creationDate}/600`}
                />
              </Card>
            </>
          ) : (
            <LoginRequired />
          )}
        </>
      )}
    </Box>
  );
};

const Friend = ({ uid }: { uid: string }) => {
  const dispatch = useAppDispatch();
};

export default ProfileSettings;
