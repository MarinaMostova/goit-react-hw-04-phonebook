import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onFormSubmit = evt => {
    evt.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit({ id: nanoid(), name, number });

    this.resetForm();
  };

  resetForm = () =>
    this.setState({
      name: '',
      number: '',
    });

  onInputChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.onFormSubmit} className={css.form}>
        <label className={css.form__label}>
          Name
          <input
            onChange={this.onInputChange}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            className={css.form__input}
            placeholder="Enter name"
          />
        </label>

        <label className={css.form__label}>
          Number
          <input
            onChange={this.onInputChange}
            type="tel"
            name="number"
            value={number}
            placeholder="Enter phone number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            className={css.form__input}
          />
        </label>

        <button type="submit" className={css.form__button}>
          Add contact
        </button>
      </form>
    );
  }
}
export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
