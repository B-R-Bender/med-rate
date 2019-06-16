// @flow
import * as React from "react";
import {connect} from "react-redux";
import {Map, Set} from "immutable";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import type {Register} from "../../../../types/Auth";
import {REGISTER_KEYS, registerBuilder} from "../../../../types/Auth";
import {useStyles} from "./styles";
import {actions as authActions} from "../../../../store/Auth";
import {actions, selectors} from "../../../../store/Meta";
import type {Dictionary} from "../../../../types/Meta";
import MenuItem from "@material-ui/core/MenuItem";
import {DICTIONARY_KEYS} from "../../../../types/Meta";

const {PASSWORD_CONFIRM, PASSWORD, LOGIN, POLYCLINIC, CITY, REGION, OMS, NAME: FULL_NAME, EMAIL} = REGISTER_KEYS;

const {ID, NAME} = DICTIONARY_KEYS;

type Properties = {
    regions: Dictionary,
    cities: Map<number, Dictionary>,
    polyclinics: Map<number, Dictionary>,
    open: boolean,
    onClose: () => void,
    onRegister: (data: Register) => void,
    loadRegions: () => void,
    loadCities: (id: number) => void,
    loadPolyclinics: (id: number) => void,
};

function stateReducer(cities, loadCities, polyclinics, loadPolyclinics) {
    return function (state, action) {
        //$FlowFixMe types
        switch (action.type) {
            case REGION:
                if (!cities.get(action.payload)) loadCities(action.payload);
                return state.set(action.type, action.payload);
            case CITY:
                if (!polyclinics.get(action.payload)) loadPolyclinics(action.payload);
                return state.set(action.type, action.payload);
            case FULL_NAME:
            case OMS:
            case POLYCLINIC:
            case EMAIL:
            case LOGIN:
            case PASSWORD:
            case PASSWORD_CONFIRM:
                //$FlowFixMe types
                return state.set(action.type, action.payload);
            default:
                return state;
        }
    }
}

const Registration = ({regions, cities, polyclinics, open, onClose, onRegister, loadRegions, loadCities, loadPolyclinics}: Properties): React.Node => {
    const classes = useStyles();
    const [state, dispatch] = React.useReducer(stateReducer(cities, loadCities, polyclinics, loadPolyclinics), registerBuilder());

    React.useEffect(() => {
        loadRegions();
    }, []);

    const handleStateChange = (type) => (event) => dispatch({type, payload: event.target.value});

    const handleCancel = () => {
        dispatch(registerBuilder());
        onClose();
    };

    const handleRegister = () => {
        onRegister(state);
    };

    return (
        <Dialog open={open} onClose={handleCancel} aria-labelledby="simple-dialog-title">
            <DialogTitle id="simple-dialog-title">Регистрация в системе</DialogTitle>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField id={FULL_NAME}
                           label="Имя пользователя"
                           className={classes.textField}
                           value={state.get(FULL_NAME)}
                           required
                           onChange={handleStateChange(FULL_NAME)}
                           margin="normal"/>
                <TextField id={OMS}
                           label="Номер полиса ОМС"
                           className={classes.textField}
                           required
                           value={state.get(OMS)}
                           onChange={handleStateChange(OMS)}
                           margin="normal"/>
                <TextField id={REGION}
                           label="Регион"
                           className={classes.textField}
                           select
                           value={state.get(REGION)}
                           onChange={handleStateChange(REGION)}
                           margin="normal">
                    <MenuItem value={0}>Не выбрано</MenuItem>
                    {regions.map((region: Dictionary) => (
                        <MenuItem key={region.get(ID)} value={region.get(ID)}>
                            {region.get(NAME)}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id={CITY}
                           label="Город"
                           className={classes.textField}
                           select
                           value={state.get(CITY)}
                           onChange={handleStateChange(CITY)}
                           margin="normal">
                    <MenuItem value={0}>Не выбрано</MenuItem>
                    {cities.get(state.get(REGION), Set()).map((city: Dictionary) => (
                        <MenuItem key={city.get(ID)} value={city.get(ID)}>
                            {city.get(NAME)}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id={POLYCLINIC}
                           label="Медицинская организация"
                           className={classes.textField}
                           select
                           value={state.get(POLYCLINIC)}
                           onChange={handleStateChange(POLYCLINIC)}
                           margin="normal">
                    <MenuItem value={0}>Не выбрано</MenuItem>
                    {polyclinics.get(state.get(CITY), Set()).map((polyclinic: Dictionary) => (
                        <MenuItem key={polyclinic.get(ID)} value={polyclinic.get(ID)}>
                            {polyclinic.get(NAME)}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id={EMAIL}
                           label="E-Mail"
                           className={classes.textField}
                           type="email"
                           required
                           value={state.get(EMAIL)}
                           onChange={handleStateChange(EMAIL)}
                           margin="normal"/>
                <TextField id={LOGIN}
                           label="Логин"
                           className={classes.textField}
                           required
                           value={state.get(LOGIN)}
                           onChange={handleStateChange(LOGIN)}
                           margin="normal"/>
                <TextField id={PASSWORD}
                           label="Пароль"
                           className={classes.textField}
                           type="password"
                           required
                           value={state.get(PASSWORD)}
                           onChange={handleStateChange(PASSWORD)}
                           margin="normal"/>
                <TextField id={PASSWORD_CONFIRM}
                           label="Пароль еще раз"
                           className={classes.textField}
                           type="password"
                           required
                           value={state.get(PASSWORD_CONFIRM)}
                           onChange={handleStateChange(PASSWORD_CONFIRM)}
                           margin="normal"/>
            </form>
            <DialogActions>
                <Button color={"secondary"} onClick={handleCancel}>
                    Отмена
                </Button>
                <Button variant="contained" color={"primary"} onClick={handleRegister}>
                    Войти
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state) => ({
    regions: selectors.getRegions(state),
    cities: selectors.getCities(state),
    polyclinics: selectors.getPolyclinics(state)
});

export default connect(
    mapStateToProps,
    {
        onRegister: authActions.registerUser,
        loadRegions: actions.loadRegions,
        loadCities: actions.loadCities,
        loadPolyclinics: actions.loadPolyclinics,
    }
)(Registration);