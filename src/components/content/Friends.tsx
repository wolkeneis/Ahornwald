import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  Paper,
  Snackbar,
  Typography,
  useMediaQuery
} from "@mui/material";
import { v1 } from "moos-api";
import { useEffect, useState } from "react";
import { addFriend, removeFriend } from "../../logic/api";
import { updateProfileInformation } from "../../logic/profile";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFriendErrorVisible } from "../../redux/interfaceSlice";
import LoginRequired from "../LoginRequired";

const Friends = () => {
  const profile: v1.UserProfile = useAppSelector((state) => state.session.profile);
  const friends: v1.Friend[] = useAppSelector((state) => state.session.friends);
  const friendErrorVisible = useAppSelector((state) => state.interface.friendErrorVisible);
  const drawerOpen: boolean = useAppSelector((state) => state.interface.drawerOpen);
  const drawerWidth: number = useAppSelector((state) => state.interface.drawerWidth);
  const matchesClosedDrawer = useMediaQuery(`(min-width:${460}px)`);
  const matchesOpenDrawer = useMediaQuery(`(min-width:${drawerWidth + 460}px)`);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
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
            <Paper
              sx={{
                padding: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: "95%",
                zoom: drawerOpen ? (matchesOpenDrawer ? 1 : 0.8) : matchesClosedDrawer ? 1 : 0.8
              }}
            >
              <Typography variant="h5">Friendlist</Typography>
              <AddFriendField />
              {friends && friends.length > 0 && (
                <List sx={{ padding: 0 }}>
                  {friends?.map((friend) => (
                    <Friend friend={friend} key={friend.uid} />
                  ))}
                </List>
              )}
            </Paper>
          ) : (
            <LoginRequired />
          )}
        </>
      )}
    </Box>
  );
};

const AddFriendField = () => {
  const [friendId, setFriendId] = useState("");
  const [idValid, setIdValid] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIdValid(friendId.length <= 128);
  }, [friendId]);

  const onAdd = async () => {
    try {
      if (!friendId) {
        return setIdValid(false);
      }
      const successful = await addFriend({ friendId: friendId });
      if (!successful) {
        return dispatch(setFriendErrorVisible(true));
      }
      await updateProfileInformation();
    } catch (error) {
      dispatch(setFriendErrorVisible(true));
    }
  };

  return (
    <FormControl>
      <InputLabel htmlFor="friend-id">User ID</InputLabel>
      <OutlinedInput
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={onAdd}>
              <PersonAddIcon />
            </IconButton>
          </InputAdornment>
        }
        error={!idValid}
        id="friend-id"
        label="User ID"
        onChange={(event) => setFriendId(event.target.value)}
        sx={{ minWidth: 220 }}
        type="text"
        value={friendId}
      />
    </FormControl>
  );
};

const Friend = ({ friend }: { friend: v1.Friend }) => {
  const dispatch = useAppDispatch();

  const onRemove = async () => {
    try {
      const successful = await removeFriend({ friendId: friend.uid });
      if (!successful) {
        return dispatch(setFriendErrorVisible(true));
      }
      await updateProfileInformation();
    } catch (error) {
      dispatch(setFriendErrorVisible(true));
    }
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={onRemove}>
          <PersonRemoveIcon />
        </IconButton>
      }
    >
      <ListItemAvatar title={friend.username}>
        <Avatar src={(friend.avatar as string | null) ?? undefined}>{friend.username.slice(0, 2)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={friend.username}
        primaryTypographyProps={{
          sx: {
            maxWidth: 150,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
          }
        }}
        secondary={!friend.consensual ? "Unconsensual" : undefined}
        secondaryTypographyProps={
          !friend.consensual
            ? {
                sx: {
                  maxWidth: 150,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis"
                }
              }
            : undefined
        }
      />
    </ListItem>
  );
};

export default Friends;
