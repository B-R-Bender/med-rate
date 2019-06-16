import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        padding: theme.spacing(1, 2),
        alignItems: "center",
        justifyContent: "center"
    },
    link: {
        display: "flex",
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));