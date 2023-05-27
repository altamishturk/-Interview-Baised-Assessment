import React from 'react';
import "./App.css";
import AddContactForm from "./components/AddContactForm";
import ContactList from "./components/ContactList";
import { useContactContext } from './components/context';
import {darkTheme,lightTheme} from "./constant";



// App component as the root component
const App = () => {
  const {themeDark,toggleTheme} = useContactContext();
  

  return (
    <div style={themeDark?darkTheme:lightTheme}>
      <div style={{minHeight:"100vh"}} className="container">
        <div className='theme-toggler'><button style={themeDark? {...darkTheme,border: "2px solid white"}:{...lightTheme,border: "2px solid black"}} onClick={()=>toggleTheme()}>{themeDark?"Dark-Theme":"Light-Theme"}</button></div>
        <h1>Contact Management</h1>
        <AddContactForm/>
        <ContactList />
      </div>
    </div>
  );
};

export default App;
