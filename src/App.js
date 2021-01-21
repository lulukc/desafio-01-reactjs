import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(res =>{
      setRepositories(res.data)  
    })
  }, [])

  async function handleAddRepository() {

    const repository = {
      title: "Gympoint-Desafio-Gostack",
      url: "https://github.com/lulukc/Gympoint-Desafio-Gostack",
      techs: ["JavaScript", "NodeJS", "react JS"]
    }
    const response = await api.post('/repositories', repository)
    setRepositories([...repositories, response.data])  
  }

  async function handleRemoveRepository(id) {

    const repositoryIndex = repositories.findIndex(r => r.id === id)
    let array = [...repositories]
    if(repositoryIndex >= 0){
      array.splice(repositoryIndex, 1)
      setRepositories(array)
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(r => (
          < li key={r.id} > { r.title}
            < button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>))
        }
      </ul >
      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
