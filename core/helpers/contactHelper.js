// type: 'google','outlook'

export const normalizeContacts = (type, contacts = []) => {
    if (!type && !Array.isArray(contacts)) return [];

    // return {
    //     id: contacts[0]?.names[0]?.metadata?.source?.id ?? '',
    //     names: (contacts[0] && contacts[0]?.names[0]?.displayName) ?? '',
    //     phoneNumber: (contacts[0] && contacts[0]?.phoneNumbers[0]?.value) ?? '',
    //     email: (contacts[0] && contacts[0]?.emailAddresses && contacts[0]?.emailAddresses[0]?.value) ?? '',
    // };

    // console.log(contacts);


    return contacts.map((contact) => {

        if (type === 'outlook') {
            return {
                networkId: contact?.id,
                name: contact?.displayName || '',
                phone: contact?.mobilePhone || '',
                email: (contact?.emailAddresses && contact?.emailAddresses[0]?.address) || ''
            }
        }

        if (type === 'google') {
            return {
                networkId: (contact?.names && contact.names[0] && contact.names[0].metadata?.source?.id) || '',
                name: (contact && contact?.names && contact?.names[0]?.displayName) || '',
                phone: (contact && contact?.phoneNumbers && contact?.phoneNumbers[0]?.value) || '',
                email: (contact && contact?.emailAddresses && contact.emailAddresses[0] && contact.emailAddresses[0].value) || '',
            }
        }
    })
}
