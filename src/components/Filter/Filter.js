import css from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ filter, onFilter }) => {
  return (
    <div className={css.filter}>
      <label className={css.title} htmlFor="filter">
        Find contact by name
      </label>
      <input
        onChange={onFilter}
        className={css.input}
        type="text"
        name="name"
        value={filter}
        id="filter"
      />
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};
