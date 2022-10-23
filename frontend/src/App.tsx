import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from '@mui/icons-material/Book';

import Home from "./components/Home";
import Officers from "./components/Officers";
import OfficerCreate from "./components/OfficerCreate";
import Student from "./components/Student";
// import SignIn from "./components/Signin";
import StudentCreate from "./components/StudentCreate";
import BillCreate from "./components/BillCreate";
import Bills from "./components/Bills";
import { Subject } from "@mui/icons-material";
import SubjectCreate from "./components/SubjectCreate";
import Teacher_List from "./components/Teacher_list";
import Teacher_Create from "./components/Teacher_Create";
import Teacher_assessmentList from "./components/Teacher_assessmentList";
import Teacher_assessmentCreate from "./components/Teacher_assessmentcreate";
import SignIn from "./components/SignInStudent";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const menu = [
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/" },
  { name: "บันทึกข้อมูลนักศึกษา", icon: <PeopleIcon />, path: "/Student/create" },
  { name: "ข้อมูลนักศึกษา", icon: <BookIcon />, path: "Students" },
  { name: "List รายวิชา", icon: <BookIcon />, path: "/subjects" },
  { name: "สร้างข้อมูลอาจารย์", icon: <PeopleIcon />, path: "/Teacher_create" },
  { name: "List ข้อมูลอาจารย์", icon: <BookIcon />, path: "/Teacher_list" },
  { name: "สร้างบิล", icon: <BookIcon />, path: "/bill/create" },
  { name: "List ข้อมูลการชำระค่าลงทะเบียนเรียน", icon: <BookIcon />, path: "/bills" },
  { name: "ประเมินผู้สอน", icon: <PeopleIcon />, path: "/Teacher_assessment/create" },
  { name: "List ประเมินผู้สอน", icon: <BookIcon />, path: "/Teacher_assessment" },
];

function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                System Analysis and Design 1/65 (ระบบรายวิชา)
              </Typography>
              <Button color="inherit" onClick={signout}>
                ออกจากระบบ
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              {menu.map((item, index) => (
                <Link
                  to={item.path}
                  key={item.name}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem button>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/officers" element={<Officers />} />
                <Route path="/officer/create" element={<OfficerCreate />} />
                <Route path="/Students" element={<Student />} />
                <Route path="/Student/create" element={<StudentCreate />} />

                <Route path="/bills" element={<Bills />} />
                <Route path="/bill/create" element={<BillCreate />} />

                <Route path="/subjects" element={<Subject />} />
                <Route path="/subject/create" element={<SubjectCreate />} />

                <Route path="/Teacher_list" element={<Teacher_List />} />
                <Route path="/Teacher_create" element={<Teacher_Create />} />

                <Route path="/Teacher_assessment" element={<Teacher_assessmentList />} />
                <Route path="/Teacher_assessment/create" element={<Teacher_assessmentCreate />} /> 

              </Routes>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;

