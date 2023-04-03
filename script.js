function calculaSorteio() {
  const selectTypeOfBet = document.querySelector(
    "input[name='aposta']:checked"
  ).value;

  if (selectTypeOfBet == "animal") {
    const valueOfAnimal = Number(document.querySelector(".form-select").value);
    const valueOfBet = Number(document.getElementById("valueOfBet").value);
    const drawnAnimals = raffleAnimals();

    if (valueOfAnimal == drawnAnimals[0]) {
      const earnedValue = valueOfBet * 12;
      showResult(drawnAnimals, valueOfAnimal, valueOfBet, "12x", earnedValue);
    } else if (drawnAnimals.includes(valueOfAnimal)) {
      const earnedValue = valueOfBet * 3;
      showResult(drawnAnimals, valueOfAnimal, valueOfBet, "3x", earnedValue);
    } else {
      console.log(valueOfAnimal);
      showResult(drawnAnimals, valueOfAnimal, valueOfBet, null, null);
    }
  } else if (selectTypeOfBet == "dozens") {
    const valueOfDozen = Number(document.querySelector(".form-select").value);
    const valueOfBet = Number(document.getElementById("valueOfBet").value);
    const drawnDozens = raffleDozens();

    if (valueOfDozen == drawnDozens[0]) {
      const earnedValue = valueOfBet * 50;
      showResult(drawnDozens, valueOfDozen, valueOfBet, "50x", earnedValue);
    } else if (drawnDozens.includes(valueOfDozen)) {
      const earnedValue = valueOfBet * 7;
      showResult(drawnDozens, valueOfDozen, valueOfBet, "7x", earnedValue);
    } else if (!drawnDozens.includes(valueOfDozen)) {
      const result = verifyDozens(drawnDozens, valueOfDozen);
      if (result.includes(true)) {
        const earnedValue = valueOfBet * 1;
        showResult(drawnDozens, valueOfDozen, valueOfBet, "1x", earnedValue);
      } else {
        showResult(drawnDozens, valueOfDozen, valueOfBet);
      }
    }
  }
}

function verifyDozens(drawnDozensToCheck, valueOfDozen) {
  let dozens = {
    1: [1, 2, 3, 4],
    2: [5, 6, 7, 8],
    3: [9, 10, 11, 12],
    4: [13, 14, 15, 16],
    5: [17, 18, 19, 20],
    6: [21, 22, 23, 24],
    7: [25, 26, 27, 28],
    8: [29, 30, 31, 32],
    9: [33, 34, 35, 36],
    10: [37, 38, 39, 40],
    11: [41, 42, 43, 44],
    12: [45, 46, 47, 48],
    13: [49, 50, 51, 52],
    14: [53, 54, 55, 56],
    15: [57, 58, 59, 60],
    16: [61, 62, 63, 64],
    17: [65, 66, 67, 68],
    18: [69, 70, 71, 72],
    19: [73, 74, 75, 76],
    20: [77, 78, 79, 80],
    21: [81, 82, 83, 84],
    22: [85, 86, 87, 88],
    23: [89, 90, 91, 92],
    24: [93, 94, 95, 96],
    25: [97, 98, 99, 0],
  };
  let drawnDozens = drawnDozensToCheck;
  let result = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 1; j < 26; j++) {
      if (dozens[j].includes(drawnDozens[i])) {
        if (dozens[j].includes(valueOfDozen)) {
          result.push(true);
        } else {
          result.push(false);
        }
      }
    }
  }
  return result;
}

function showResult(
  drawnAnimals,
  valueOfAnimal,
  valueOfBet,
  multiplier,
  earnedValue
) {
  const resultElement = document.getElementById("result");
  resultElement.innerText = "";
  drawnAnimals.forEach((value) => {
    const li = document.createElement("li");
    li.textContent = `${
      drawnAnimals.indexOf(value) + 1
    }° valor sorteado: ${value}`;
    resultElement.appendChild(li);
  });

  const textOfBet = document.createElement("p");
  textOfBet.innerText = `
  Seu numero de aposta é: ${valueOfAnimal}
  Seu valor de aposta foi: R$${valueOfBet}
  `;

  resultElement.appendChild(textOfBet);

  if (multiplier != null && earnedValue != null) {
    const textOfearnedValue = document.createElement("p");
    textOfearnedValue.innerText = `Você ganhou um multiplicador de ${multiplier}, ou seja, ganhou R$${earnedValue}. Parabéns!!!`;
    resultElement.appendChild(textOfearnedValue);
  } else {
    const textOfLose = document.createElement("p");
    textOfLose.innerText = `Você perdeu quem sabe na proxíma`;
    resultElement.appendChild(textOfLose);
  }
}

function raffleAnimals() {
  const drawnAnimals = [];
  let animalValueRandom;
  for (let i = 0; i < 3; i++) {
    animalValueRandom = Math.ceil(Math.random() * 25);
    if (drawnAnimals.includes(undefined)) {
      animalValueRandom = Math.ceil(Math.random() * 25);
    } else if (drawnAnimals.includes(animalValueRandom)) {
      animalValueRandom = Math.ceil(Math.random() * 25);
    } else if (animalValueRandom == 0) {
      animalValueRandom = Math.ceil(Math.random() * 25);
    } else {
      drawnAnimals.push(animalValueRandom);
    }
  }

  if (drawnAnimals.includes(undefined) || drawnAnimals.length != 3) {
    const newDrawnAnimals = raffleAnimals();
    return newDrawnAnimals;
  }
  return drawnAnimals;
}

function raffleDozens() {
  const drawnAnimals = [];
  let animalValueRandom;
  for (let i = 0; i < 3; i++) {
    animalValueRandom = Math.ceil(Math.random() * 99);
    if (drawnAnimals.includes(undefined)) {
      animalValueRandom = Math.ceil(Math.random() * 99);
    } else if (drawnAnimals.includes(animalValueRandom)) {
      animalValueRandom = Math.ceil(Math.random() * 99);
    } else if (animalValueRandom == 0) {
      animalValueRandom = Math.ceil(Math.random() * 99);
    } else {
      drawnAnimals.push(animalValueRandom);
    }
  }

  if (drawnAnimals.includes(undefined) || drawnAnimals.length != 3) {
    const newDrawnAnimals = raffleAnimals();
    return newDrawnAnimals;
  }
  return drawnAnimals;
}

function selectAnimals() {
  const divOfSelect = document.getElementById("select");
  divOfSelect.innerText = "";
  const selectElement = document.createElement("select");
  selectElement.setAttribute("class", "form-select");
  const textSelectElement = document.createElement("h3");
  textSelectElement.innerText = "Escolha uma opção:";
  const animals = [
    "Avestruz",
    "Águia",
    "Burro",
    "Borboleta",
    "Cachorro",
    "Cabra",
    "Carneiro",
    "Camelo",
    "Cobra",
    "Coelho",
    "Cavalo",
    "Elefante",
    "Galo",
    "Gato",
    "Jacaré",
    "Leão",
    "Macaco",
    "Porco",
    "Pavão",
    "Peru",
    "Touro",
    "Tigre",
    "Urso",
    "Veado",
    "Vaca",
  ];

  for (let i = 0; i < animals.length; i++) {
    var option = document.createElement("option");
    if (i < 9) {
      option.value = i + 1;
      option.text = animals[i];
    } else {
      option.value = i + 1;
      option.text = animals[i];
    }
    selectElement.appendChild(option);
  }
  divOfSelect.appendChild(textSelectElement);
  divOfSelect.appendChild(selectElement);
}

function selectDozens() {
  const divOfSelect = document.getElementById("select");
  divOfSelect.innerText = "";
  const selectElement = document.createElement("select");
  selectElement.setAttribute("class", "form-select");
  const textSelectElement = document.createElement("h3");
  textSelectElement.innerText = "Escolha uma opção:";

  for (let i = 0; i < 100; i++) {
    let option = document.createElement("option");
    if (i < 10) {
      option.value = i;
      option.text = `0${i}`;
    } else {
      option.value = i;
      option.text = i;
    }

    selectElement.appendChild(option);
  }
  divOfSelect.appendChild(textSelectElement);
  divOfSelect.appendChild(selectElement);
}

function limpar() {
  location.reload();
}
