import React from "react";
import ListItem from '@material-ui/core/ListItem';

export const ListItemLink = function(props: any) {
    return <ListItem button component="a" {...props} />;
}

export default {
    ListItemLink
}