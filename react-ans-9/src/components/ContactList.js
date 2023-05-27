import { useContactContext } from "./context";

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


  export default ContactList;