import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { v1 } from "moos-api";
import { useEffect } from "react";
import { fetchFriendCollections } from "../../logic/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCollection } from "../../redux/sessionSlice";
import LoginRequired from "../LoginRequired";

const Home = () => {
  const profile: v1.UserProfile = useAppSelector((state) => state.session.profile);
  const friends: v1.Friend[] = useAppSelector((state) => state.session.friends);
  const collections: {
    [key: string]: v1.Collection[];
  } = useAppSelector((state) => state.session.collections);
  const mobile = useAppSelector((state) => state.interface.mobile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (friends) {
      friends.forEach(async (friend) => {
        try {
          const collections = await fetchFriendCollections({ friendId: friend.uid });
          if (collections === null) {
            throw new Error("No collections found");
          }
          dispatch(setCollection({ friendId: friend.uid, collections: collections }));
        } catch {}
      });
    }
  }, [friends]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: mobile ? 0 : 4
      }}
    >
      {profile === undefined ? (
        <CircularProgress />
      ) : (
        <>
          {profile !== null ? (
            <Box
              sx={{
                display: "flex",
                flexFlow: "wrap",
                justifyContent: "space-around",
                margin: "auto",
                paddingX: "5%"
              }}
            >
              {Object.keys(collections).map((friendId: string) => {
                const collectionList = collections[friendId];
                return collectionList.map((collection) => <Collection collection={collection} key={collection.id} />);
              })}
            </Box>
          ) : (
            <LoginRequired />
          )}
        </>
      )}
    </Box>
  );
};

const Collection = ({ collection }: { collection: v1.Collection }) => {
  return (
    <Paper
      elevation={4}
      onClick={() => console.log("Wald")}
      sx={{
        userSelect: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        padding: 2,
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "80vw",
        transform: "scale(0.98)",
        margin: 4,
        "&:hover": {
          transform: "scale(1)"
        }
      }}
    >
      <Box
        alt="Thumbnail"
        component="img"
        draggable={false}
        src={collection.thumbnail}
        sx={{ userSelect: "none", width: "calc(25vw - 2rem)", minWidth: "120px", maxWidth: "200px", margin: 2 }}
      />
      <Typography
        sx={{
          marginTop: 2,
          width: "calc(25vw - 2rem)",
          minWidth: "120px",
          maxWidth: "200px",
          margin: 2,
          textTransform: "uppercase"
        }}
        variant="body1"
      >
        {collection.name}
      </Typography>
    </Paper>
  );
};

export default Home;
