const express = require('express'); //importa a biblioteca express
const path = require('path'); //importa a biblioteca path - manipula caminhos para arquivos
const app = express(); //cria uma instancia da aplicação

// Middleware para servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, '../frontend/build')));
/*
    app.use() - registra o middleware
    express.static() -middleware que serve arquivos estaticos
    path.join() -Constrói o caminho para a pasta build gerada pelo React  após a execução do comando npm run build.
    __dirname: Retorna o diretório atual do arquivo.
    Aqui, estamos dizendo ao Express para servir os arquivos da pasta build do React como conteúdo estático.
*/

// Rotas do React
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
/*
    app.get(): Define uma rota para lidar com requisições HTTP GET.
    O primeiro argumento recebe a rota acessada pelo navegador
    Re
 */

app.get('/sobre', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Porta para o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
