const express = require('express'); // Importa a biblioteca express
const path = require('path'); // Importa a biblioteca path - manipula caminhos para arquivos
const app = express(); // Cria uma instância da aplicação
const cors = require('cors');

// Middleware para servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, '../frontend/build')));
/*
    app.use() - Registra o middleware
    express.static() - Middleware que serve arquivos estáticos
    path.join() - Constrói o caminho para a pasta build gerada pelo React após a execução do comando npm run build.
    __dirname: Retorna o diretório atual do arquivo.
    Aqui, estamos dizendo ao Express para servir os arquivos da pasta build do React como conteúdo estático.
*/

/*
Não utilizei o Express para gerenciar as rotas do frontend porque, em projetos React, a aplicação é baseada em um único arquivo HTML, o index.html, que serve como ponto de entrada. O React é responsável por renderizar dinamicamente o conteúdo a partir deste arquivo, e a navegação entre as páginas é gerenciada pelo react router. Portanto, não há necessidade de usar o Express para manipular as rotas no frontend. Nem tenho certeza de como isso é feito usando só o express. 

Abaixo, mostro como ficaria a configuração do Express caso fosse necessário enviar o index.html para todas as rotas:
*/
// Rotas do React
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.get('/calculadora', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.get('/imc', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Configuração do servidor
const PORT = 3001;  // Definindo a porta como 5000, a mesma para o React e o cálculo IMC
app.use(cors());
app.use(express.json());

// Função para classificar o IMC
const classificarIMC = (imc) => {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc >= 18.5 && imc < 24.9) return 'Normal';
  if (imc >= 25 && imc < 29.9) return 'Sobrepeso';
  if (imc >= 30 && imc < 34.9) return 'Obesidade grau I';
  if (imc >= 35 && imc < 39.9) return 'Obesidade grau II';
  return 'Obesidade grau III';
};

// Rota para calcular IMC
app.post('/calcular-imc', (req, res) => {
  const { peso, altura } = req.body;

  if (!peso || !altura || altura <= 0 || peso <= 0) {
    return res.status(400).json({ error: 'Peso e altura devem ser valores positivos.' });
  }

  const alturaMetros = altura / 100;
  const imc = peso / (alturaMetros * alturaMetros);
  const classificacao = classificarIMC(imc);

  res.json({ imc, classificacao });
});

// Iniciar o servidor na porta 5000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
