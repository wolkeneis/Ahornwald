import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Content from "./components/content/Content";
import LinkBehavior from "./components/LinkBehavior";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectTheme, setDrawerOpen, setMobile } from "./redux/interfaceSlice";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    }
  }
});

const lightTheme = createTheme({
  palette: {
    mode: "light"
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    }
  }
});

function App() {
  const [muiTheme, setTheme] = useState(darkTheme);
  const theme = useAppSelector((state) => state.interface.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      dispatch(selectTheme(storedTheme === "light-theme" ? "light-theme" : "dark-theme"));
    }
    const userAgent = (navigator as NewNavigator).userAgentData?.platform ?? navigator.userAgent;
    let operatingSystem: string;
    if (/android/i.test(userAgent)) {
      operatingSystem = "android";
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      operatingSystem = "ios";
    } else if (/Win/.test(userAgent)) {
      operatingSystem = "windows";
    } else if (/Mac/i.test(userAgent)) {
      operatingSystem = "mac";
    } else {
      operatingSystem = "unknown";
    }
    const mobile: boolean =
      (navigator as NewNavigator).userAgentData?.mobile || operatingSystem === "android" || operatingSystem === "ios";
    dispatch(setMobile(mobile));
    if (!mobile) {
      dispatch(setDrawerOpen(true));
    }
  }, [dispatch]);

  useEffect(() => {
    setTheme(theme === "dark-theme" ? darkTheme : lightTheme);
    if (theme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Routes>
        <Route element={<Content />} path="*" />
      </Routes>
    </ThemeProvider>
  );
}

interface NewNavigator extends Navigator {
  userAgentData?: {
    mobile: boolean;
    platform: string;
  };
}

export default App;
