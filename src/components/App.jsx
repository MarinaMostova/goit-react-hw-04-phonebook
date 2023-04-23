import React, { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(savedContacts);
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState !== this.state)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleFormSubmit = data => {
    const nameInContacts = this.state.contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    nameInContacts
      ? alert(`${data.name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [data, ...contacts],
        }));
  };

  handleContactDelete = idItem => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== idItem),
    }));
  };

  handleFilterChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const filteredContacts = this.getVisibleContacts();

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>

        <ContactForm onSubmit={this.handleFormSubmit} />

        <h2 className={css.contacts__title}>Contacts</h2>
        <Filter filter={this.state.filter} onFilter={this.handleFilterChange} />

        <ContactList
          contacts={filteredContacts}
          onDelete={this.handleContactDelete}
        />
      </div>
    );
  }
}

export default App;
