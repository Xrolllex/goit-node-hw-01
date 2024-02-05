const { readFile, writeFile } = require("fs/promises");

const contactsArray = async () => {
    try {
        const data = await readFile('./db.txt', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err.message);
        return [];
    }
}




const saveContacts = (contacts) => {
    writeFile("./db.txt", JSON.stringify(contacts, null, 2))
        .catch((err) => console.error(err.message));
}


function listContacts() {
    contactsArray()
    .then(contacts => {
        return contacts.map((contacts) =>{
            return {
                Name: contacts.name,
                Phone: contacts.phone,
                Email: contacts.email,
            }
        })
    })
    .then(result => console.table(result))
    .catch(err => console.error(err.message))
  }
  
  function getContactById(contactId) {
    contactsArray()
        .then(contacts => {
            const result = contacts.find(user => user.id === contactId);
            if (result) {
                console.log(`You found what you're looking for:\n${result.name}\n${result.phone}\n${result.email}`);
            } else {
                console.error(`Contact with ID ${contactId} not found.`);
            }
        })
        .catch(err => console.error(err.message))
}

  
  function removeContact(contactId) {
    contactsArray()
        .then(contacts => {
            const index = contacts.findIndex(user => user.id === contactId);
            if (index !== -1) {
                const deletedContact = contacts.splice(index, 1);
                saveContacts(contacts);
                console.log(`You removed your contact`, deletedContact[0]);
            } else {
                console.error(`Contact with ID ${contactId} not found.`);
            }
        })
        .catch(err => console.error(err.message));
}

  
function addContact(name, email, phone) {
    contactsArray()
        .then(contacts => {
            const newContact = {
                id: Date.now().toString(), // Unikalny identyfikator na podstawie daty
                name,
                email,
                phone
            };
            contacts.push(newContact);
            saveContacts(contacts);
            console.log(`You added a new contact`, newContact);
        })
        .catch(err => console.error(err.message));
}


  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };
  