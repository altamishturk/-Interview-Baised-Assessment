import React, { useState, useContext, createContext } from 'react';
import "./App.css";

// Create a new context
const ContactContext = createContext();

// Custom Hook to access the ContactContext
const useContactContext = () => useContext(ContactContext);

// ContactProvider component to provide contact data to child components
const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  // Function to add a new contact
  const addContact = (name, email) => {
    const newContact = { id: Date.now(), name, email };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  // Function to delete a contact
  const deleteContact = (id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};

// ContactList component to display the list of contacts
const ContactList = () => {
  const { contacts, deleteContact } = useContactContext();

  return (
    <div id="contact-list">
      {contacts.map(contact => (
        <div className="contact-card" key={contact.id}>
          <h3>Name: {contact.name}</h3>
          <p>Email: {contact.email}</p>
          <button onClick={() => deleteContact(contact.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

// AddContactForm component to add a new contact
const AddContactForm = () => {
  const { addContact } = useContactContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addContact(name, email);
    setName('');
    setEmail('');
  };

  return (
    <form id="add-contact-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Add Contact</button>
    </form>
  );
};

// App component as the root component
const App = () => {
  return (
    <ContactProvider>
      <div className="container">
        <h1>Contact Management</h1>
        <AddContactForm />
        <ContactList />
      </div>
    </ContactProvider>
  );
};

export default App;
