const contacts = require('./contacts.js');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);

    case 'get':
      const contact = await contacts.getContactById(id);
      return console.log(contact);

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      return console.log(newContact);

    case 'update':
      const updateContact = await contacts.updateContactById(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);

    case 'remove':
      const delContact = await contacts.removeContact(id);
      return console.log(delContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);

// invokeAction({ action: 'list' });

// invokeAction({ action: 'get', id: 'AeHIrLTr6JkxGE6SN-0Rw' });

// invokeAction({
//   action: 'add',
//   name: 'Melon',
//   email: 'melon@gmail.com',
//   phone: '(050) 999-9999',
// });

// invokeAction({
//   action: 'update',
//   id: '9BXQsTnGZ1vkuf8KBvKeB',
//   name: 'Melon222',
//   email: 'melon222@gmail.com',
//   phone: '(050) 999-9999',
// });

// invokeAction({
//   action: 'remove',
//   id: '9BXQsTnGZ1vkuf8KBvKeB',
// });
