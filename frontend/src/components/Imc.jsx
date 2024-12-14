import React, { useState } from 'react';

const Imc = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');  // Novo estado para a classificação
  const [error, setError] = useState(null);

  const calcularIMC = async () => {
    if (!peso || !altura) {
      setError('Por favor, insira peso e altura válidos.');
      return;
    }
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/calcular-imc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ peso: parseFloat(peso), altura: parseFloat(altura) }),
      });

      if (!response.ok) {
        throw new Error('Erro ao calcular o IMC no servidor.');
      }

      const data = await response.json();
      setImc(data.imc);
      console.log(data.classificacao)
      setClassificacao(data.classificacao);  // Armazena a classificação no estado
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='imc'>
      <h1>Calcule o seu IMC</h1>
      <div className="inputs">
        <div className="peso">
          Peso em kg:
          <input 
            type="number" 
            name="peso" 
            id="peso" 
            value={peso} 
            onChange={(e) => setPeso(e.target.value)} 
          />
        </div>
        <div className="altura">
          Altura em cm:
          <input 
            type="number" 
            name="altura" 
            id="altura" 
            value={altura} 
            onChange={(e) => setAltura(e.target.value)} 
          />
        </div>
      </div>
      <button onClick={calcularIMC}>Calcular IMC</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imc !== null && (
        <div className='res'>
          <p>O seu IMC é: {imc.toFixed(2)}</p>
          <p>Classificação: {classificacao}</p>  {/* Exibe a classificação do IMC */}
        </div>
      )}
    </div>
  );
};

export default Imc;
