const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
app.use(bodyParser.json());

// Rota que recebe os dados
app.post('/orcamento', (req, res) => {
  const orcamento = req.body;
  const eFimDeSemana = verificarFimDeSemana(orcamento.data);
  calcularPreco(eFimDeSemana, orcamento.cachorroP, orcamento.cachorroG);
  console.log(orcamento);
  res.send('Orçamento recebido com sucesso');
});

// Inicia o servidor
app.listen(port, () => {
console.log(`Servidor rodando em http://localhost:${port}`);
});

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
    dados: [1.7, 15, 50, 24, 48],
  },

  "ChowChawgas": {
    dados: [0.800, 30, 45, 24, 48],
  }
};

petShops["Meu Canino Feliz"].calcularAumento();

function verificarFimDeSemana(inputData) {
    var data = new Date(inputData);

    if (data.getDay() === 5 || data.getDay() === 6) {
      return true;
    } else {
      return false;
    }
}

function calcularPreco(eFimDeSemana, cachorroP, cachorroG) {
  var totalPetshop1 = totalMeuCaninoFeliz(eFimDeSemana, cachorroP, cachorroG);
  var totalPetshop2 = totalVaiRex (eFimDeSemana, cachorroP, cachorroG);
  var totalPetshop3 = totalChowChawgas(eFimDeSemana, cachorroP, cachorroG);
  
  var menorValor = encontrarMenorValor(totalPetshop1, totalPetshop2, totalPetshop3);
  console.log("O menor número é:", menorValor);
}

//Calculos preço
  function totalMeuCaninoFeliz(eFimDeSemana, qunatidadeCachorroP, quantidadeCachorroG){
        var resultadoCachorroP = 0;
        var resultadoCachorroG = 0;
    if(eFimDeSemana){
        resultadoCachorroP = parseInt(petShops["Meu Canino Feliz"].dados[3]) * parseInt(qunatidadeCachorroP);
        console.log(resultadoCachorroP);
        resultadoCachorroG = parseInt(petShops["Meu Canino Feliz"].dados[4]) * parseInt(quantidadeCachorroG);
        console.log(resultadoCachorroG);
      } else {
        resultadoCachorroP = parseInt(petShops["Meu Canino Feliz"].dados[1]) * parseInt(qunatidadeCachorroP);
        console.log(resultadoCachorroP);
        resultadoCachorroG = parseInt(petShops["Meu Canino Feliz"].dados[2]) * parseInt(quantidadeCachorroG);
        console.log(resultadoCachorroG);
      }
      return resultadoCachorroP + resultadoCachorroG;
}

function totalVaiRex(eFimDeSemana, qunatidadeCachorroP, quantidadeCachorroG){
        var resultadoCachorroP = 0;
        var resultadoCachorroG = 0;
    if(eFimDeSemana){
        resultadoCachorroP = parseInt(petShops["Vai Rex"].dados[3]) * parseInt(qunatidadeCachorroP);
        console.log(resultadoCachorroP);
        resultadoCachorroG = parseInt(petShops["Vai Rex"].dados[4]) * parseInt(quantidadeCachorroG);
        console.log(resultadoCachorroG);
        } else {
        resultadoCachorroP = parseInt(petShops["Vai Rex"].dados[1]) * parseInt(qunatidadeCachorroP);
        console.log(resultadoCachorroP);
        resultadoCachorroG = parseInt(petShops["Vai Rex"].dados[2]) * parseInt(quantidadeCachorroG);
        console.log(resultadoCachorroG);
      }
      return resultadoCachorroP + resultadoCachorroG;

}

function totalChowChawgas(eFimDeSemana, qunatidadeCachorroP, quantidadeCachorroG){
  var resultadoCachorroP = 0;
        var resultadoCachorroG = 0;
    if(eFimDeSemana){
        resultadoCachorroP = parseInt(petShops["ChowChawgas"].dados[3]) * parseInt(qunatidadeCachorroP);
        console.log(resultadoCachorroP);
        resultadoCachorroG = parseInt(petShops["ChowChawgas"].dados[4]) * parseInt(quantidadeCachorroG);
        console.log(resultadoCachorroG);
      } else {
        resultadoCachorroP = parseInt(petShops["ChowChawgas"].dados[1]) * parseInt(qunatidadeCachorroP);
        console.log(resultadoCachorroP);
        resultadoCachorroG = parseInt(petShops["ChowChawgas"].dados[2]) * parseInt(quantidadeCachorroG);
        console.log(resultadoCachorroG);
      }
      return resultadoCachorroP + resultadoCachorroG;
}


// Clacular menor valor
function encontrarMenorValor(precoMeuCaninoFeliz, precoVaiRex, precoChowChawgas) {
  const menor = Math.min(precoMeuCaninoFeliz, precoVaiRex, precoChowChawgas);
  const iguais = [precoMeuCaninoFeliz, precoVaiRex, precoChowChawgas].filter(num => num === menor).length;

  if (iguais === 1) {
      const indexMenor = [precoMeuCaninoFeliz, precoVaiRex, precoChowChawgas].indexOf(menor);
      return {menor, indexMenor};
  } else if (iguais > 1) {

      const posicoes = [precoMeuCaninoFeliz, precoVaiRex, precoChowChawgas].reduce((acc, curr, index) => {
      if (curr === menor) {
          acc.push(index);
      }
      return acc;
      }, []);
      console.log(posicoes)
      var menorDistancia = Math.min(distanciaMeuCaninoFeliz, distanciaVaiRex, distanciaChowChawgas);
/* 
      const indexMenor = [precoMeuCaninoFeliz, precoVaiRex, precoChowChawgas].indexOf(menor);

      const iguais = [precoMeuCaninoFeliz, precoVaiRex, precoChowChawgas].filter(num => num === menor).length;

      if () {

      }



      const distanciaMeuCaninoFeliz = parseFloat(petShops["Meu Canino Feliz"].dados[0]);
      const distanciaVaiRex = parseFloat(petShops["Vai Rex"].dados[0]);
      const distanciaChowChawgas = parseFloat(petShops["ChowChawgas"].dados[0]);

      var menorDistancia = Math.min(distanciaMeuCaninoFeliz, distanciaVaiRex, distanciaChowChawgas);

    return;
  
  } */
}
}