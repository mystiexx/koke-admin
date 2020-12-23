import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { MdPowerSettingsNew } from 'react-icons/md'
import { FaHome, FaServicestack, FaShoppingBag, FaUserAstronaut } from "react-icons/fa";
import { SiAboutDotMe } from 'react-icons/si'
import {TiGroup} from 'react-icons/ti'
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        backgroundColor: "#8423FF",
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    active: {
        backgroundColor: "#8423FF",
        boxShadow: "4px 4px 10px 0 rgba(0,0,0,.1),4px 4px 15px -5px rgba(21,114,232,.4)",
        color: "#ffffff",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("Dashboard");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logOut = () => {
        localStorage.removeItem('token');
        window.location.href="/"
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        KOKE
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <Link onClick={() => setActive("Dashboard")} to="/">
                    <ListItem
                        button
                        key="Dashoard"
                        style={{ marginTop: "20px"}}
                        className={active === "Dashboard" ? classes.active : ""}
                    >
                        <ListItemIcon>
                            <FaHome style={{ fontSize: "20px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Link>

                <Divider />
                <Link onClick={() => setActive("About")} to="/about">
                    <ListItem
                        button
                        key="About"
                        style={{ marginTop: "20px" }}
                        className={active === "About" ? classes.active : ""}
                    >
                        <ListItemIcon>
                            <SiAboutDotMe style={{ fontSize: "20px" }} />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItem>
                </Link>

                <Divider />
                <Link onClick={() => setActive("Service")} to="/service">
                    <ListItem
                        button
                        key="Service"
                        style={{ marginTop: "20px" }}
                        className={active === "Service" ? classes.active : ""}
                    >
                        <ListItemIcon>
                            <FaServicestack style={{ fontSize: "20px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Service" />
                    </ListItem>
                </Link>

                <Divider />
                <Link onClick={() => setActive("Shop")} to ="/shop">
                    <ListItem
                        button
                        key="Shop"
                        style={{ marginTop: "20px" }}
                        className={active === "Shop" ? classes.active : ""}
                    >
                        <ListItemIcon>
                            <FaShoppingBag style={{ fontSize: "20px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Shop" />
                    </ListItem>
                </Link>

                <Divider />
                <Link onClick={() => setActive("Members")} to="/members">
                    <ListItem
                        button
                        key="Members"
                        style={{ marginTop: "20px" }}
                        className={active === "Members" ? classes.active : ""}
                    >
                        <ListItemIcon>
                            <TiGroup style={{ fontSize: "20px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Members" />
                    </ListItem>
                </Link>

                <Divider />
                <Link>
                    <ListItem
                        button
                        key="Users"
                        style={{ marginTop: "20px" }}
                        className={active === "Users" ? classes.active : ""}
                    >
                        <ListItemIcon>
                            <FaUserAstronaut style={{ fontSize: "20px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                </Link>

                <Divider />
                <Link onClick={logOut}>
                    <ListItem
                        button
                        key="logout"
                        style={{ marginTop: "20px" }}
                        className={active === "Logout" ? classes.active : ""}
                    >
                        <ListItemIcon>
                            <MdPowerSettingsNew style={{ fontSize: "20px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </Link>

              
            </Drawer>
            {props.children}
        </div>
    );
}
