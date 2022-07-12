import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Mapple from "../../media/mapple.svg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleDrawer } from "../../redux/interfaceSlice";
import Navigator from "./Navigator";
import Profile from "./Profile";

const Header = () => {
  const drawerOpen = useAppSelector((state) => state.interface.drawerOpen);
  const drawerWidth = useAppSelector((state) => state.interface.drawerWidth);
  const mobile = useAppSelector((state) => state.interface.mobile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateHome = () => navigate("/");

  return (
    <>
      <AppBar drawerOpen={drawerOpen} drawerWidth={drawerWidth} mobile={mobile} position="fixed">
        <Toolbar>
          <IconButton
            aria-label="menu"
            color="inherit"
            edge="start"
            onClick={() => dispatch(toggleDrawer(null))}
            size="large"
            sx={{ mr: 2, ...(!mobile && drawerOpen && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <img
            alt="Ahornwald Icon"
            height={40}
            onClick={navigateHome}
            src={Mapple}
            style={{
              cursor: "pointer",
              marginRight: ".5em"
            }}
            width={40}
          />
          <Typography
            component="div"
            onClick={navigateHome}
            sx={{
              cursor: "pointer",
              flexGrow: 1
            }}
            variant="h6"
          >
            Ahornwald
          </Typography>
          <Profile />
        </Toolbar>
      </AppBar>
      <Navigator />
    </>
  );
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "drawerOpen" && prop !== "drawerWidth" && prop !== "mobile"
})<{
  drawerOpen: boolean;
  drawerWidth: number;
  mobile: boolean;
}>(({ theme, drawerOpen, drawerWidth, mobile }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(!mobile &&
    drawerOpen && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    })
}));

export default Header;
