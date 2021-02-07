import React, {useContext} from "react";
import UserContext from "../context/UserContext";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";

import ChatIcon from "@material-ui/icons/Chat";
import FaceIcon from "@material-ui/icons/Face";

const useStyles = makeStyles((theme) => ({
  appBar: {
    bottom: 0,
    top: "auto",
  },
  inputContainer: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(1),
    position: "relative",
    width: "100%",
  },
  icon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    // transition: theme.transitions.create('width'),
    width: "100%",
    // [theme.breakpoints.up('sm')]: {
    //   width: 120,
    //   '&:focus': {
    //     width: 200,
    //   },
    // },
  },
}));

export default function BottomBar(props) {
  const classes = useStyles();

  const {userData} = useContext(UserContext);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <div className={classes.inputContainer} style={{ maxWidth: "200px" }}>
          <div className={classes.icon}>
            <FaceIcon />
          </div>
            {userData.user ? (
              <InputBase
              value={userData.user.displayName}
              script={userData.user.handleName}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "name", "aria-readonly": true }}
              />
            ) : (
              <InputBase
              value={props.author}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              readOnly={true}
              inputProps={{ "aria-label": "name" }}
            />
            )}
          </div>
        <div className={classes.inputContainer}>
          <form onSubmit={props.handleSubmit}>
            <div className={classes.icon}>
              <ChatIcon />
            </div>
            <InputBase
              onChange={props.handleContent}
              value={props.content}
              placeholder="Type your message..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "content" }}
            />
          </form>
        </div>
      </Toolbar>
    </AppBar>
  );
}
