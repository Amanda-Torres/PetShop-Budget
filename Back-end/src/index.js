const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());

// Rota que recebe os dados"
app.post('/orcamento', (req, res) => {
  const orcamento = req.body;
  console.log(orcamento);
  res.send('Orçamento recebido com sucesso');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


function verificarFimDeSemana() {
    var inputData = prompt("Digite uma data (no formato YYYY-MM-DD):");
    var data = new Date(inputData);
  
    if (data.getDay() === 0 || data.getDay() === 6) {
      //Fim de semana
    } else {
      //Não é fim de semana
    }
  }

//Adicionando os dados
  var petShops = {
    "Meu Canino Feliz": {
      dados: [2, 20, 40],

      calcularAumento: function() {
        var aumento1 = (this.dados[1] * 0.2) + this.dados[1];
        var aumento2 = (this.dados[2] * 0.2) + this.dados[2];
        this.dados[3] = aumento1;
        this.dados[4] = aumento2;
      }
    },

    "Vai Rex": {
      dados: [1.7, 15, 50, 20, 55],
    },

    "ChowChawgas": {
      dados: [0.800, 30, 45, 30, 45],
    }
  };
  
  // Chamando a função calcularAumento para "Meu Canino Feliz"
  petShops["Meu Canino Feliz"].calcularAumento();
  
  // Exemplo de uso:
  console.log("Meu Canino Feliz:", petShops["Meu Canino Feliz"].dados);
  console.log("Vai Rex:", petShops["Vai Rex"].dados);
  console.log("ChowChawgas:", petShops["ChowChawgas"].dados);