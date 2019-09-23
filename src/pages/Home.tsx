import React, { Component } from "react";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import {ListItemLink} from '../components'

export const Home = function (props: any): any {
    const {contacts} = props
    return (
        <List
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Contacts
            </ListSubheader>
          }
        >
        {contacts.map((contact: any, i: number) => {
          return (
          <ListItemLink key={contact.id} href={`/contact/${contact.id}`}>
            <ListItemText
              primary={contact.name}
              secondary={contact.email}
              >
            </ListItemText>
          </ListItemLink>
        )})}
        </List>
    )
}

export default Home