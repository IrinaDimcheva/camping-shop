import { useState } from "react";
import { Link } from "react-router-dom";

import styles from './SearchBar.module.css';

const SearchBar = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');
  // const [searchParam] = useState(['name', 'category']);

  const handleChange = (event) => {
    const searchWord = event.target.value;
    setQuery(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === '') {
      setFilteredData([]);
      return;
    }
    setFilteredData(newFilter);
  };

  const clearInputHandler = () => {
    setQuery('');
    setFilteredData([]);
  };

  return (
    <div className={styles.search}>
      <div className={styles['search-inputs']}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
          value={query}
        />
        <div className={styles['search-icon']}>
          {filteredData.length === 0 ? (
            <i className="fa-solid fa-magnifying-glass"></i>
          ) : (
            <i
              className={`${"fa-solid fa-xmark-large"} ${styles['clear-btn']}`}
              onClick={clearInputHandler}
            >X</i>
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className={styles['data-result']}>
          {filteredData.slice(0, 15).map((value, key) => {
            return <Link to={`/products/${value._id}`} className={data.item}>
              <p>{value.name}</p>
            </Link>
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;