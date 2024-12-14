import React, { useState, useEffect } from 'react';
import Home from "./components/Home";
import Calculadora from "./components/Calculadora";
import Imc from "./components/Imc";

function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  // Quando o caminho mudar, atualiza o componente
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const renderComponent = () => {
    switch (currentRoute) {
      case '/':
        return <Home />;
      case '/imc':
        return <Imc />;
      case '/calculadora':
        return <Calculadora />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      {renderComponent()}
    </div>
  );
}

export default App;