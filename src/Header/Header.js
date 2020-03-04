import React, { useState, useContext } from 'react';
import Navigation from '../Navigation';
import { Query, Offset } from '../contexts';
import './Header.scss';

const Header = () => {
  const query = useContext(Query);
  const offset = useContext(Offset);
  const [currentQuery, setCurrentQuery] = useState('');
  
  const onSubmit = e => {
    e.preventDefault();
    query.set(currentQuery);
    offset.set(null);
  };

  const onChange = e => setCurrentQuery(e.target.value);

  return (
    <header>
      <h1>M<span>ARVEL</span></h1>
      <form className="search" onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={currentQuery} />
        <input type="submit" value="🔎" />
      </form>
      <Navigation />
    </header>
  );
};

export default Header;