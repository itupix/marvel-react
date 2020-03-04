import React, { useContext } from 'react';
import { Details, Offset, Total } from '../contexts';
import './Navigation.scss';

const Navigation = () => {
  const details = useContext(Details);
  const offset = useContext(Offset);
  const total = useContext(Total);

  const isFirst = offset.value === 0;
  const numberOfPages = Math.ceil(total.value / 20);
  const currentPage = offset.value / 20 + 1;
  const isLast = numberOfPages === currentPage;
  const isVisible = numberOfPages > 1 && !details.value;

  const decrement = () => offset.set(offset.value - 20);
  const increment = () => offset.set(offset.value + 20);

  return (
    <nav className="navigation">
      {isVisible && (
        <>
          <span>{currentPage} / {numberOfPages}</span>
          <button onClick={decrement} disabled={isFirst}>❮</button>
          <button onClick={increment} disabled={isLast}>❯</button>
        </>
      )}
    </nav>
  )
};

export default Navigation;