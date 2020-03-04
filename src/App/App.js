import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Characters from '../Characters';
import Error from '../Error';
import Loader from '../Loader';
import CharacterDetails from '../CharacterDetails';
import { fetchCharacters } from '../services';
import { Query, Details, Total, Offset, useQuery, useDetails, useTotal, useOffset } from '../contexts';
import './App.scss';

const getCharacters = async ({ setStatus, setCharacters, query, offset, total }) => {
  setStatus('loading');
  const characters = await fetchCharacters({ query, offset, total });

  if(characters) {
    setCharacters(characters);
    setStatus('ok');
  } else {
    setStatus('error');
  }
};

const updateCharacters = params => () => {
  getCharacters(params);
};

const App = () => {
  const [status, setStatus] = useState(null);
  const [characters, setCharacters] = useState(null);

  const details = useDetails();
  const query = useQuery();
  const total = useTotal();
  const offset = useOffset();

  useEffect(updateCharacters({ setStatus, setCharacters, query, offset, total }), [query.value, offset.value]);

  return (
    <Total.Provider value={total}>
      <Offset.Provider value={offset}>
        <Query.Provider value={query}>
          <Details.Provider value={details}>
            <Header />
            <main>
              {{
                loading: <Loader centered />,
                error: <Error message="Impossible de d'afficher la liste des personnages à cause d'une erreur technique." />,
                ok: <Characters characters={characters} />
              }[status]}
              <CharacterDetails/>
            </main>
          </Details.Provider>
        </Query.Provider>
      </Offset.Provider>
    </Total.Provider>
  );
};

export default App;