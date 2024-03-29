const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(cors());

// Rota que recebe os dados
app.post('/orcamento', (req, res) => {
  const orcamento = req.body;
  const eFimDeSemana = verificarFimDeSemana(orcamento.data);
  const resultado = calcularPreco(eFimDeSemana, orcamento.cachorroP, orcamento.cachorroG);
  res.send(resultado);
});

// Inicia o servidor
app.listen(port, () => {
console.log(`Servidor rodando em http://localhost:${port}`);
});

function verificarFimDeSemana(inputData) {
  var data = new Date(inputData);
  
  if (data.getDay() === 0 || data.getDay() === 6) {
    return true;
  } else {
    return false;
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

petShops["Meu Canino Feliz"].calcularAumento();

function calcularPreco(eFimDeSemana, cachorroP, cachorroG) {
  var totalPetshop1 = totalMeuCaninoFeliz(eFimDeSemana, cachorroP, cachorroG);
  var totalPetshop2 = totalVaiRex (eFimDeSemana, cachorroP, cachorroG);
  var totalPetshop3 = totalChowChawgas(eFimDeSemana, cachorroP, cachorroG);
  
  return encontrarMenorValor(totalPetshop1, totalPetshop2, totalPetshop3);
}

//Calculos preço
  function totalMeuCaninoFeliz(eFimDeSemana, qunatidadeCachorroP, quantidadeCachorroG){
        var resultadoCachorroP = 0;
        var resultadoCachorroG = 0;
    if(eFimDeSemana){
        resultadoCachorroP = parseInt(petShops["Meu Canino Feliz"].dados[3]) * parseInt(qunatidadeCachorroP);
        resultadoCachorroG = parseInt(petShops["Meu Canino Feliz"].dados[4]) * parseInt(quantidadeCachorroG);
      } else {
        resultadoCachorroP = parseInt(petShops["Meu Canino Feliz"].dados[1]) * parseInt(qunatidadeCachorroP);
        resultadoCachorroG = parseInt(petShops["Meu Canino Feliz"].dados[2]) * parseInt(quantidadeCachorroG);
      }
      return resultadoCachorroP + resultadoCachorroG;
}

function totalVaiRex(eFimDeSemana, qunatidadeCachorroP, quantidadeCachorroG){
        var resultadoCachorroP = 0;
        var resultadoCachorroG = 0;
    if(eFimDeSemana){
        resultadoCachorroP = parseInt(petShops["Vai Rex"].dados[3]) * parseInt(qunatidadeCachorroP);
        resultadoCachorroG = parseInt(petShops["Vai Rex"].dados[4]) * parseInt(quantidadeCachorroG);
        } else {
        resultadoCachorroP = parseInt(petShops["Vai Rex"].dados[1]) * parseInt(qunatidadeCachorroP);
        resultadoCachorroG = parseInt(petShops["Vai Rex"].dados[2]) * parseInt(quantidadeCachorroG);
      }
      return resultadoCachorroP + resultadoCachorroG;

}

function totalChowChawgas(eFimDeSemana, qunatidadeCachorroP, quantidadeCachorroG){
  var resultadoCachorroP = 0;
        var resultadoCachorroG = 0;
    if(eFimDeSemana){
        resultadoCachorroP = parseInt(petShops["ChowChawgas"].dados[3]) * parseInt(qunatidadeCachorroP);
        resultadoCachorroG = parseInt(petShops["ChowChawgas"].dados[4]) * parseInt(quantidadeCachorroG);
      } else {
        resultadoCachorroP = parseInt(petShops["ChowChawgas"].dados[1]) * parseInt(qunatidadeCachorroP);
        resultadoCachorroG = parseInt(petShops["ChowChawgas"].dados[2]) * parseInt(quantidadeCachorroG);
      }
      return resultadoCachorroP + resultadoCachorroG;
}


// Clacular menor valor
function encontrarMenorValor(precoMeuCaninoFeliz, precoVaiRex, precoChowChawgas) {
  const relacaoIndexPetShop = {
    0: "Meu Canino Feliz",
    1: "Vai Rex",
    2: "ChowChawgas"
  };

  var nomePetShop = "";

  const menorPreco = Math.min(precoMeuCaninoFeliz, precoVaiRex, precoChowChawgas);
  const iguais = [precoMeuCaninoFeliz, precoVaiRex, precoChowChawgas].filter(num => num === menorPreco).length;

  if (iguais === 1) {
      const indexMenor = [precoMeuCaninoFeliz, precoVaiRex, precoChowChawgas].indexOf(menorPreco);
      nomePetShop = relacaoIndexPetShop[indexMenor];  
  } else if (iguais > 1) {
    const posicoes = [precoMeuCaninoFeliz, precoVaiRex, precoChowChawgas].reduce((acc, curr, index) => {
    if (curr === menorPreco) {
        acc.push(index);
    }
    return acc;
    }, []);

    var distancias = [];

    posicoes.forEach(posicao => {
      if (relacaoIndexPetShop[posicao]) {
        distancias.push(petShops[relacaoIndexPetShop[posicao]].dados[0]);
      }
    });
    
    const menorDistancia = Math.min(...distancias);

    var indexMenorDistancia = posicoes[distancias.indexOf(menorDistancia)];

    nomePetShop = relacaoIndexPetShop[indexMenorDistancia];
  }
  return { nomePetShop, menorPreco };
}