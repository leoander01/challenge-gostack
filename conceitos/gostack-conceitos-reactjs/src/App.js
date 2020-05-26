import React, { useState, useEffect } from "react";
// useState: He returns a pair of values: the current state and a function that updates the state
// useEffect: The Hook of Effect allows you to perform capture effects on components

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repository ${Date.now()}`,
      url: 'test.com',
      techs: ['React', 'JS']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`).then(response => {
      if (response.status === 204) {
        setRepositories(repositories.filter(repository => repository.id !== id));
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>) 
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
