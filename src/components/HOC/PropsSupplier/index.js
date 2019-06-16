// @flow
import * as React from "react";

type SupplierProps = {
    children: React.Node | React.ChildrenArray<React.Node>,
    supplyingProps: {}
};

const PropsSupplier = ({children, ...supplyingProps}: SupplierProps) => (
    React.Children.map(children, child => React.cloneElement(child, {...supplyingProps}))
);

PropsSupplier.defaultProps = {
    supplyingProps: {}
};

export default PropsSupplier;