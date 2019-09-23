import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Avatar from '@material-ui/core/Avatar';

import CssBaseline from '@material-ui/core/CssBaseline';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {Contact} from './interfaces'

import { BrowserRouter as Router, Route, Link as RouterLink } from "react-router-dom";


// pages
import Home from './pages/Home'
import ContactItem from './pages/ContactItem'

import { GraphQLClient } from 'graphql-request'

import QUERYIES from './queries'

const nanoid = require('nanoid')

function Header () {
  return (
    
    <header>
      <nav>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="inherit" href="/new/">
          Add new contact
        </Link>
      </Breadcrumbs>
      </nav>
    </header>
  )
}

interface AppProps {
}

interface AppState {
  errorLoading: boolean,
  isLoading: boolean,
  errorMessage: string,
  data: any
}

class App extends Component<AppProps, {}> {
  constructor (props: AppProps) {
    super(props)
    this.client = new GraphQLClient('/')
    this.getContact = this.getContact.bind(this)
    this.addContact = this.addContact.bind(this)
    this.updateContact = this.updateContact.bind(this)
    this.deleteContact = this.deleteContact.bind(this)
  }

  state: AppState = {
    errorLoading: false,
    isLoading: true,
    errorMessage: '',
    data: {
      contacts: []
    }
  }

  client: any = undefined

  async componentDidMount () {
    try {
      const data = await this.client.request(QUERYIES.contacts)
      // const data = res.json()
      this.setState({data})
    } catch (e) {
      console.log(e)
    }
  }

  async getContact (id: string) {
    try {
      const data = await this.client.request(`
      {
        contact(id: "${id}") {
            id, name, email
        }
      }`)
      console.log('getContact', data)
      return data
    } catch (e) {
      console.warn(e)
    }
  }

  async addContact (contact: Contact) {
    const newContact = Object.assign({}, {contact})
    newContact.contact.id = nanoid()
    const gQuery = `
    mutation addContact($contact: InputContact) {
      addContact(contact: $contact) {
        id, name, email
      } 
    }`
    const gVariables = {
      contact: newContact.contact
    }
    try {
      const data = await this.client.request(gQuery, gVariables)
      return data
    } catch (e) {
      console.warn(e)
    }
  }

  async updateContact (contact: Contact) {
    const newContact = Object.assign({}, {contact})
  
    const gQuery = `
    mutation updateContact($contact: InputContact) {
      updateContact(contact: $contact) {
        id, name, email
      } 
    }`
    const gVariables = {
      contact: newContact.contact
    }
    try {
      const data = await this.client.request(gQuery, gVariables)
      return data
    } catch (e) {
      console.warn(e)
    }
  }

  // deleteContact(id: ID): Boolean
  async deleteContact (id: string) {
    const gQuery = `
    mutation deleteContact($id: ID) {
      deleteContact(id: $id)
    }`
    const gVariables = {
      id
    }
    // debugger
    try {
      const success =  await this.client.request(gQuery, gVariables)
      return success.deleteContact
    } catch (e) {
      console.warn(e)
    }
  }

  render() {

    const {data} = this.state
    return (
      <Router forceRefresh={true}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Header></Header>
        <Route exact path="/"
          render={
            (routeProps) => <Home {...routeProps} {...data} />
          } />
        <Route exact path="/new"
          render={
            (routeProps) => {
              return (
                <ContactItem 
                readonly={false}
                getContact={(id: number) => {}}
                addContact={this.addContact}
                  {...routeProps} {...data} id={undefined} />
                )
            }
          }
          />
        <Route path="/contact/:id"
          render={
            (routeProps) => {
              return (
                <ContactItem 
                  getContact={this.getContact}
                  updateContact={this.updateContact}
                  deleteContact={this.deleteContact}
                  isEdit={true}
                  {...routeProps} {...data} id={routeProps.match.params.id} />
                )
            }
          }
          />
          
        </Container>
      </Router>
    );
  }
}

export default App;
