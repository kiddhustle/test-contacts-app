import React, { Component } from "react";
// import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ListItemLink} from '../components'
import {Contact, ContactItemProps, ContactItemState} from '../interfaces'


export class ContactItem extends Component<ContactItemProps, ContactItemState > {

    constructor (props: ContactItemProps) {
        super(props)
        this.onKeyChange = this.onKeyChange.bind(this)
        this.getContact = props.getContact
        this.addContact = props.addContact
    }

    _isMounted = false;
    _isCreate = true;


    state: ContactItemState = {
        contact: {
            id: '',
            email: '',
            name: ''
        }
    }

    static defaultProps = {
        id: undefined,
        readonly: true
    }

    getContact (id: string) {
        throw Error('No getContact property passed')
    }

    addContact (contact: Contact) {
        throw Error('No getContact property passed')
    }
    
    async componentDidMount () {
        console.log('componentDidMount')
        console.log('props', this.props)
        console.log('state', this.state)
        const {id} = this.props
        this._isMounted = true
        this._isCreate = !(id !== undefined && id !== '')
        
        if(!this._isCreate) {
            try {
                const data: any = await this.getContact(id)
                const contact = Object.assign({}, data.contact)
                
                if (this._isMounted) {
                    this.setState(data, () => {console.log('STATE SET!!')})
                }
                
            } catch(e) {
                console.log(e)
            }
        } else {
            console.log('no id')
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    onKeyChange (e: any) {
        const {contact} = this.state
        // const {email, name} = contact
        let {id, value} = e.target

        let key:string = id.replace('contact-', '')
        if(key === 'email') {
            contact.email = value
        } else if( key === 'name') {
            contact.name = value
        }
        this.setState({contact})
    }

    render () {
        console.log('props', this.props)
        console.log('state', this.state)
        const {id, readonly} = this.props
        const {contact} = this.state
        const {name, email} = contact

        return (
            <form noValidate autoComplete="off">
                {this._isCreate ? (
                    <React.Fragment>
                        <TextField
                            id="contact-id"
                            label="ID"
                            value={id}
                            InputProps={{readOnly: true}}
                            />
                            <br />
                    </React.Fragment>
                    
                ) : (
                    null
                )}
                
                <TextField
                    id="contact-name"
                    label="Name"
                    value={name}
                    InputProps={{readOnly: readonly}}
                    onChange={this.onKeyChange}
                    />
                    <br />
                <TextField
                    id="contact-email"
                    label="Email"
                    value={email}
                    InputProps={{readOnly: readonly}}
                    onChange={this.onKeyChange}
                    /><br /><br />
                {this._isCreate ? (
                    <Button variant="contained" color="primary" onClick={() => {this.addContact(contact)}}>
                        Create
                    </Button>
                ) : (
                    <Button variant="contained" color="primary">
                        Save
                    </Button>
                )}
                
            </form>
        )
    }
    
}

export default ContactItem