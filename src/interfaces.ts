export interface Contact {
    id: string | undefined,
    email: string | undefined,
    name: string | undefined
}


export interface ContactItemProps {
    id: string,
    getContact: (id: string) => {},
    addContact: (contact: Contact) => {},
    readonly: boolean
}


export interface ContactItemState {
    contact: Contact
}

export default Contact