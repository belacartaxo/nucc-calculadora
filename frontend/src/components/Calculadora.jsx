import React, { useState } from "react";

const Calculadora = () => {
  const [n1, setN1] = useState(""); // Primeiro número
  const [n2, setN2] = useState(""); // Segundo número
  const [op, setOp] = useState(""); // Operador
  const [resultado, setResultado] = useState(""); // Resultado final
  const [isIgualPressionado, setIsIgualPressionado] = useState(false); // Controle para "="

  const operadores = ["+", "-", "*", "/"];

  const atualizarDisplay = () => {
    if (!n1) {
      return ""; // Não há nada para mostrar
    } else if (!op) {
      return n1; // Mostra apenas o primeiro número
    } else if (!n2) {
      return `${n1} ${op}`; // Mostra o número e o operador
    } else if (isIgualPressionado) {
      return `${n1} ${op} ${n2} = ${resultado}`; // Mostra o cálculo completo e o resultado
    } else {
      return `${n1} ${op} ${n2}`; // Mostra a operação atual
    }
  };

  const handleNumero = (numero) => {
    if (isIgualPressionado) {
      setN1(numero); // Reinicia a operação com o número pressionado
      setN2("");
      setOp("");
      setResultado("");
      setIsIgualPressionado(false);
      return;
    }

    if (!op) {
      setN1((prev) => prev + numero);
    } else {
      setN2((prev) => prev + numero);
    }
  };

  const handleOperador = (operador) => {
    if (!n1) return; // Evita operadores sem número
    if (isIgualPressionado) {
      setOp(operador); // Permite continuar do resultado anterior
      setN2(""); // Limpa o segundo número
      setIsIgualPressionado(false);
      return;
    }
    if (op && n2) {
      calcular(); // Resolve a operação atual antes de continuar
    }
    setOp(operador);
  };

  const calcular = () => {
    if (!n1 || !n2 || !op) return;

    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);
    let resultadoFinal;

    switch (op) {
      case "+":
        resultadoFinal = num1 + num2;
        break;
      case "-":
        resultadoFinal = num1 - num2;
        break;
      case "*":
        resultadoFinal = num1 * num2;
        break;
      case "/":
        resultadoFinal = num2 !== 0 ? num1 / num2 : "Erro";
        break;
      default:
        return;
    }

    setResultado(resultadoFinal.toFixed(2).toString());
    setN1(resultadoFinal.toFixed(2).toString()); // Resultado vira o novo n1
    setN2("");
    setOp("");
    setIsIgualPressionado(true); // Marca que "=" foi pressionado
  };

  const limpar = () => {
    setN1("");
    setN2("");
    setOp("");
    setResultado("");
    setIsIgualPressionado(false);
  };

  const apagarUltimo = () => {
    if (n2) {
      setN2((prev) => prev.slice(0, -1));
    } else if (op) {
      setOp("");
    } else if (n1) {
      setN1((prev) => prev.slice(0, -1));
    }
  };

  const handleIgual = () => {
    if (n1 && n2 && op) {
      calcular();
    }
  };

  return (
    <div className="calculadora-page">
      <div className="calculadora">
        <div className="display">{atualizarDisplay()}</div>
        <div className="row">
          <div className="tecla div-two-columns" onClick={limpar}>
            AC
          </div>
          <div className="tecla" onClick={apagarUltimo}>
            C
          </div>
          <div className="tecla" onClick={() => handleOperador("/")}>
            /
          </div>
        </div>
        <div className="row">
          {["7", "8", "9", "*"].map((item) => (
            <div
              key={item}
              className="tecla"
              onClick={() =>
                operadores.includes(item)
                  ? handleOperador(item)
                  : handleNumero(item)
              }
            >
              {item}
            </div>
          ))}
        </div>
        <div className="row">
          {["4", "5", "6", "-"].map((item) => (
            <div
              key={item}
              className="tecla"
              onClick={() =>
                operadores.includes(item)
                  ? handleOperador(item)
                  : handleNumero(item)
              }
            >
              {item}
            </div>
          ))}
        </div>
        <div className="row">
          {["1", "2", "3", "+"].map((item) => (
            <div
              key={item}
              className="tecla"
              onClick={() =>
                operadores.includes(item)
                  ? handleOperador(item)
                  : handleNumero(item)
              }
            >
              {item}
            </div>
          ))}
        </div>
        <div className="row">
          <div className="tecla" onClick={() => handleNumero("0")}>
            0
          </div>
          <div className="tecla" onClick={() => handleNumero(".")}>
            .
          </div>
          <div className="tecla div-two-columns" onClick={handleIgual}>
            =
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculadora;
