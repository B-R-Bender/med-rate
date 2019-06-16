// @flow
import * as React from "react";

const Condition = ({match, children} : {match: boolean, children: React.Node | React.ChildrenArray<React.Node>}) => (
    match ? children : null
);

Condition.defaulProps = {
    match: false
};

export default Condition;