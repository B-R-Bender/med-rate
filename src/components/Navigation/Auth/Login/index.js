// @flow
import * as React from "react";
import {connect} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import type {Login as LoginProps} from "../../../../types/Auth";
import {actions} from "../../../../store/Auth";
import {useStyles} from "./styles";
import DialogActions from "@material-ui/core/DialogActions";
import {LOGIN_KEYS, loginBuilder} from "../../../../types/Auth";

type Properties = {
    open: boolean,
    onClose: () => void,
    onLogin: (data: LoginProps) => void
};

const Login = ({open, onClose, onLogin}: Properties): React.Node => {
    const classes = useStyles();
    const [name, setName] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const handleNameChange = (event) => setName(event.target.value);

    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleCancel = () => {
        setName("");
        setPassword("");
        onClose();
    };

    const handleLogin = () => {
        const loginData = loginBuilder({[LOGIN_KEYS.LOGIN]: name, [LOGIN_KEYS.PASSWORD]: password});
        onLogin(loginData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleCancel} aria-labelledby="simple-dialog-title">
            <DialogTitle id="simple-dialog-title">Вход в систему</DialogTitle>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField id="name"
                           label="Имя пользователя"
                           className={classes.textField}
                           value={name}
                           onChange={handleNameChange}
                           margin="normal"/>
                <TextField id="password"
                           label="Пароль"
                           type="password"
                           className={classes.textField}
                           value={password}
                           onChange={handlePasswordChange}
                           margin="normal"/>
            </form>
            <DialogActions>
                <Button color={"secondary"} onClick={handleCancel}>
                    Отмена
                </Button>
                <Button variant="contained" color={"primary"} onClick={handleLogin}>
                    Войти
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default connect(null, {onLogin: actions.loginUser})(Login);