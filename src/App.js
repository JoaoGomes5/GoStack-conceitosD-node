import React , {useState , useEffect }from "react";

import "./styles.css";
import api from './services/api';


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
        api.get('/repositories').then((response) => {
            setRepositories(response.data);
        });
  }, [])

  async function handleAddRepository() {

    api.post(`/repositories`, 
    { 
      title : `Repo teste ${Date.now()}`,
      url: "https://github.com/JoaoGomes5/GoStack-conceitosD-nodejs",
      techs: ["Node", "ReactJS"]
    }).then(response => { 
      setRepositories(
        [
          ...repositories,
          response.data
        ]);
    })
  }

  async function handleRemoveRepository(id) {

    api.delete(`/repositories/${id}`).then(response => {
        const data = repositories.filter(repositorie => {
          return repositorie.id !== id;
        });

        setRepositories(data);
    });

  
  }

  return (
    <div>
      <ul data-testid="repository-list">

      {repositories.map((repository)=>{
          return (
            <li key={repository.id}>

              <h1>{repository.title}</h1>

              <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>

            </li>
          );
        })}
       

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
