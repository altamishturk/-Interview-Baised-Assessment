import { createContext, useContext, useState } from "react";

// Create a new context
const ContactContext = createContext();

// Custom Hook to access the ContactContext
const useContactContext = () => useContext(ContactContext);

// ContactProvider component to provide contact data to child components
const ContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [themeDark, setThemeDark] = useState(true);

  // Function to add a new contact
  const addContact = (name, email) => {
    const newContact = { id: Date.now(), name, email };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  // Function to delete a contact
  const deleteContact = (id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  // Function to toggle theme
  const toggleTheme = () => {
    setThemeDark(prev => !prev);
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, deleteContact,themeDark,toggleTheme }}>
      {children}
    </ContactContext.Provider>
  );
};



export {useContactContext,ContextProvider}