// @flow
import * as React from "react";
import {withRouter} from "react-router";
import Rating from "../../components/Rating";

type Properties = {
    match: {
        params: {
            id: ?number
        }
    }
};

const RatingScreen = ({match: {params: {id}}}: Properties): React.Node => {
    return (
        <Rating id={id}/>
    );
};

export default withRouter(RatingScreen);