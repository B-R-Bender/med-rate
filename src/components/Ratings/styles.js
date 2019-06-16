import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    summary: {
        alignItems: "center"
    },
    heading: {
        flexGrow: 1,
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    detailedSummary: {
        display: "flex",
        alignItems: "center",
        marginRight: "1em"
    },
    detailedSummaryHeading: {
        marginRight: "1em"
    }
}));