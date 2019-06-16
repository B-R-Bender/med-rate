// @flow
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {makeStyles} from "@material-ui/core/styles";
import Rating from "material-ui-rating";

type Properties = {};

const ratings = [{
    id: 1,
    user: "ivanov",
    polyclinic: "ГБУЗ РК Симферопольская поликлиника № 4",
    rating: 3
}, {
    id: 2,
    user: "ivanov",
    polyclinic: "ГБУЗ РК Симферопольская поликлиника № 4",
    rating: 4
}, {
    id: 3,
    user: "ivanov",
    polyclinic: "ГБУЗ РК Поликлиника № 3",
    rating: 3
}];

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        margin: "0 1em"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

const Moderator = ({}: Properties): React.Node => {
    const classes = useStyles();

    return (
        <div style={{display: "flex"}}>
            {ratings.map(rating => (
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={<Avatar>I</Avatar>}
                            action={
                                <IconButton aria-label="Settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title={rating.polyclinic}
                            subheader={<Rating value={rating.rating} max={5} readOnly/>}
                        />
                    </Card>
                )
            )}
        </div>
    );
};

export default Moderator;