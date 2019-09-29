import { RouteComponentProps } from 'react-router-dom'

export interface Contact {
    id: string | undefined,
    email: string | undefined,
    name: string | undefined,
    dateCreated: string | undefined,
    dateModified: string | undefined
}


export interface ContactItemProps extends RouteComponentProps {
    id: string,
    getContact: (id: string) => {},
    addContact: (contact: Contact) => {},
    updateContact: (contact: Contact) => {},    
    deleteContact: (id: string) => {},
    readonly: boolean
}


export interface ContactItemState {
    contact: Contact
}

export default Contact