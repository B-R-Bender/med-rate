import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        padding: theme.spacing(2),
        paddingTop: 0
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
}));