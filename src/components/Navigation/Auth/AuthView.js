// @flow
import * as React from "react";
import IconButton from "@material-ui/core/IconButton";

import AccountCircle from '@material-ui/icons/AccountCircle';

import type {Login, Register} from "../../../types/Auth";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {LOGIN_KEYS} from "../../../types/Auth";
import Registration from "./Register";
import LoginComponent from "./Login";
import Ternary from "../../HOC/Ternary";
import Condition from "../../HOC/Condition";
import Typography from "@material-ui/core/Typography";

type Properties = {
    login: Login,
    loginProcessing: boolean,
    registration: Register,
    registrationProcessing: boolean,
    onLogout: () => void
};

const AuthView = ({login, loginProcessing, onLogout}: Properties): React.Node => {
    const loggedIn = Boolean(login.get(LOGIN_KEYS.TOKEN));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loginOpen, setLoginOpen] = React.useState(false);
    const [registerOpen, setRegisterOpen] = React.useState(false);

    const handleUserMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleUserMenuClose = () => setAnchorEl(null);
    const handleLoginOpen = () => setLoginOpen(true);
    const handleLoginClose = () => {
        setLoginOpen(false);
        handleUserMenuClose();
    };
    const handleRegisterOpen = () => setRegisterOpen(true);
    const handleRegisterClose = () => setRegisterOpen(false);

    return (
        <div>
            <IconButton aria-label="Account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleUserMenuOpen}
                        color="inherit">
                <Condition match={loggedIn}>
                    <Typography style={{margin: "0 1em"}}>{login.get(LOGIN_KEYS.LOGIN)}</Typography>
                </Condition>
                <AccountCircle/>
            </IconButton>
            <Menu id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleUserMenuClose}
            >
                {!loggedIn && <MenuItem onClick={handleLoginOpen}>Вход</MenuItem>}
                {loggedIn && <MenuItem onClick={onLogout}>Выход</MenuItem>}
                <MenuItem onClick={handleRegisterOpen}>Регистрация</MenuItem>
            </Menu>
            <LoginComponent open={loginOpen} onClose={handleLoginClose}/>
            <Registration open={registerOpen} onClose={handleRegisterClose}/>
        </div>
    );
};

export default AuthView;