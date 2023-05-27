import { useState } from "react";
import { useContactContext } from "./context";
import { darkTheme,lightTheme } from "../constant";

const AddContactForm = () => {
    const { addContact,themeDark } = useContactContext();
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
        <input style={themeDark? {...darkTheme,border:"1px solid white"}:{...lightTheme}} type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input style={themeDark? {...darkTheme,border:"1px solid white"}:{...lightTheme}} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Add Contact</button>
      </form>
    );
};


export default AddContactForm;