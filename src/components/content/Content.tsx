import { styled } from "@mui/material";
import { v1 } from "moos-api";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchFriendCollections } from "../../logic/api";
import { setCollections } from "../../redux/contentSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Header from "../header/Header";
import Collection from "./Collection";
import Friends from "./Friends";
import Home from "./Home";

const Content = () => {
  const drawerOpen = useAppSelector((state) => state.interface.drawerOpen);
  const drawerWidth = useAppSelector((state) => state.interface.drawerWidth);
  const mobile = useAppSelector((state) => state.interface.mobile);
  const friends: v1.Friend[] = useAppSelector((state) => state.session.friends);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (friends) {
      friends.forEach(async (friend) => {
        try {
          const collections = await fetchFriendCollections({ friendId: friend.uid });
          if (collections === null) {
            throw new Error("No collections found");
          }
          dispatch(setCollections({ friendId: friend.uid, collections: collections }));
        } catch {}
      });
    }
  }, [friends]);

  return (
    <>
      <Header />
      <Main drawerOpen={drawerOpen} drawerWidth={drawerWidth} mobile={mobile}>
        <HeaderSpacer />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Collection />} path="/collection" />
          <Route element={<Friends />} path="/friends" />
        </Routes>
        <HeaderSpacer />
      </Main>
    </>
  );
};

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "drawerOpen" && prop !== "drawerWidth" && prop !== "mobile"
})<{
  drawerOpen: boolean;
  drawerWidth: number;
  mobile: boolean;
}>(({ theme, drawerOpen, drawerWidth, mobile }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${!mobile ? drawerWidth : 0}px`,
  ...(!mobile &&
    drawerOpen && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
}));

const HeaderSpacer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

export default Content;
