// @flow
import * as React from "react";
import {Set} from "immutable";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Rating from 'material-ui-rating'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import type {Ratings as RatingsType} from "../../types/Ratings";
import {RATINGS_KEYS} from "../../types/Ratings";
import {useStyles} from "./styles";

type Properties = {
    ratings: Set<RatingsType>,
    processing: boolean,
    loadRatings: () => void
};

const Ratings = ({ratings, processing, loadRatings}: Properties): React.Node => {
    React.useEffect(() => {
        loadRatings();
    }, []);

    const classes = useStyles();

    return ratings.map(rating => (
        <ExpansionPanel key={rating.get(RATINGS_KEYS.POLYCLINIC)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} classes={{content: classes.summary}}>
                <Typography className={classes.heading}>{rating.get(RATINGS_KEYS.POLYCLINIC)}</Typography>
                <Rating className={classes.secondaryHeading} value={rating.get(RATINGS_KEYS.COMMON_RATING)} max={5} readOnly/>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {rating.get(RATINGS_KEYS.DETAILED_RATING).map((value, name) => (
                    <div key={name} className={classes.detailedSummary}>
                        <Typography className={classes.detailedSummaryHeading}>{name}</Typography>
                        <Rating value={value} max={5} readOnly/>
                    </div>
                )).toSet()}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    ));
};

export default Ratings;