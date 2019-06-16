// @flow
import * as React from "react";
import {connect} from "react-redux";

import {actions, selectors} from "../../store/Ratings";
import Ratings from "../../components/Ratings";

const mapStateToProps = (state) => ({
    ratings: selectors.getRatings(state),
    processing: selectors.getRatingsProcessing(state),
});

export default connect(mapStateToProps, {loadRatings: actions.loadRatings})(Ratings);