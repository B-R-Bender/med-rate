// @flow
import * as React from "react";

const Ternary = ({match, children} : {match: boolean, children: React.Node}) => {
    const childrenArray = React.Children.toArray(children);
    return (
        match ? childrenArray[0] : childrenArray[1]
    );
};

export default Ternary;