import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import css from './App.module.css';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
];

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? defaultContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(
    () => window.localStorage.setItem('contacts', JSON.stringify(contacts)),
    [contacts]
  );

  const handleFormSubmit = data => {
    const nameInContacts = contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    nameInContacts
      ? alert(`${data.name} is already in contacts`)
      : setContacts(contacts => [data, ...contacts]);
  };

  const handleContactDelete = idItem => {
    setContacts(contacts => contacts.filter(contact => contact.id !== idItem));
  };

  const handleFilterChange = evt => {
    setFilter(evt.target.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getVisibleContacts();

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={handleFormSubmit} />
      <h2 className={css.contacts__title}>Contacts</h2>

      <Filter filter={filter} onFilter={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleContactDelete} />
    </div>
  );
};

export default App;
