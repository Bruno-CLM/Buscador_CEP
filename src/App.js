import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './services/api.js';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    //https://viacep.com.br/ws/06414-000/json/

    if (input == '') {
      alert("Preencha o campo CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    }catch {
      alert("CEP Inexistente");
      setInput('');
    }
  }

  return (
    <>
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite o seu CEP..." pattern="[0-9]{5}-[0-9]{3}" value={input} onChange={(e) => setInput(e.target.value)}></input>

        <button className="buttonSearch"><FiSearch size={25} color="#FFF" onClick={handleSearch} /></button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
    </>
  );
}

export default App;
