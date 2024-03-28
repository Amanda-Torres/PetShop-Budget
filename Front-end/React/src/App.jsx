import { useState } from 'react';

function App() {
  // Estados para armazenar os valores dos inputs
  const [data, setData] = useState('');
  const [numero1, setNumero1] = useState(0);
  const [numero2, setNumero2] = useState(0);

    // Função para lidar com a submissão do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode fazer algo com os valores dos inputs, como enviar para o servidor
    console.log('Data:', data);
    console.log('Número 1:', numero1);
    console.log('Número 2:', numero2);
  };

  return (
    <div>
      <h1>Meu App</h1>
      <form onSubmit={handleSubmit}>
        {/* Input para data */}
        <label>
          Data:
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </label>
        <br />
        {/* Input para quantidade de cachorros pequenos */}
        <label>
          Quantidade de cachorros pequenos:
          <input
            type="number"
            value={numero1}
            onChange={(e) => setNumero1(parseInt(e.target.value))}
          />
        </label>
        <br />
        {/* Input para quantidade de cachorros grandes */}
        <label>
          Quantidade de cachorros grandes:
          <input
            type="number"
            value={numero2}
            onChange={(e) => setNumero2(parseInt(e.target.value))}
          />
        </label>
        <br />
        {/* Botão de submissão */}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;