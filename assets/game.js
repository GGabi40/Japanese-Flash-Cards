/* Add new words */
const form = document.querySelector('.form');
const divConfirmando = document.querySelector('.agregado');

let words = {
    verbo: [
        { word: "たべる", answer: "comer"},
        { word: "たべました", answer: "comí"},
        { word: "いく", answer: "ir"},
    ],
    adjetivo: [
        { word: "おいしい", answer: "rico"},
    ],
    sustantivo: [
        { word: "バス", answer: "colectivo"},
        { word: "くるま", answer: "auto"},
        { word: "タクシー", answer: "taxi"},
        { word: "でんしゃ", answer: "tren"},
        { word: "ひこうき", answer: "avión"},
        { word: "ふね", answer: "barco"},
    ],
    comida: [],
    cidades: [],
    kanji: [
        { word: "一", answer: "ichi"},
        { word: "二", answer: "ni"},
        { word: "三", answer: "san"},
        { word: "山", answer: "yama"},
        { word: "私", answer: "watashi"},
        { word: "名前", answer: "namae"},
    ],
    frases: [
        { word: "それは なんですか。", answer: "qué es eso"},
        
    ]
}

const getWordsFromLocalStorage = () => {
    const storedWords = localStorage.getItem('words');
    if (storedWords) {
        return JSON.parse(storedWords);
    } else {
        return {};
    }
}

const addNewWord = (e) => {
    e.preventDefault();

    let typeOfWord = document.querySelector('#typeOfWord').value;
    let newWord = document.querySelector('#newWord').value;
    let newAnswer = document.querySelector('#addAnswer').value;

    let clasify = words[typeOfWord];
    const wordAlreadyExists = clasify.some(wordInObject => wordInObject.word === newWord);

    showConfirmation(wordAlreadyExists);
    if(wordAlreadyExists) return;

    const newWordObject = { word: newWord, answer: newAnswer };

    if(words[typeOfWord]) {
        words[typeOfWord].push(newWordObject);
        console.log(words[typeOfWord]);
    } else {
        alert('error');
    }

    const jsonString = JSON.stringify(words);
    localStorage.setItem('words', jsonString);
}

let interval;
const showConfirmation = (wordAlreadyExists) => {
    if(!wordAlreadyExists) {
        divConfirmando.textContent = 'Todo Listo!';
        divConfirmando.classList.add('success');
        divConfirmando.style.display = "block";
    } else {
        divConfirmando.textContent = '¡Esta palabra ya existe!';
        divConfirmando.classList.add('failed');
        divConfirmando.style.display = "block";
    }
    
    if(!interval) {
        interval  = setInterval(hideConfirmation, 5000);
    }
}
const hideConfirmation = () => {
    divConfirmando.style.display = "none";
    clearInterval(interval);
    interval = null;
}

// Inicialize Game
const inicializarWords = () => {
    // Obtener las palabras desde el localStorage al inicio
    const storedWords = getWordsFromLocalStorage();
    if (Object.keys(storedWords).length > 0) {
        words = storedWords;
    } else {
        alert('Agregá nuevas palabras a tus CARDs en el signo "+"');
    }
};

// GAME
const answerInput = document.querySelector('.answer--input');
const sendButton = document.querySelector('#sendAnswer');

const tip = document.querySelector('.tip');
const attempts = document.querySelector('#attemptsNumber');
const wordForGame = document.querySelector('.word');

let answer;
let selectedWord;
let answerOfWord;

const selectWordsRandomly = () => {
    inicializarWords();

    let propertiesOfObject = Object.keys(words);
    const indexRandom = Math.floor(Math.random() * propertiesOfObject.length);

    const propertySelected = propertiesOfObject[indexRandom];
    const propertyRandom = Math.floor(Math.random() * words[propertySelected].length);

    selectedWord = words[propertySelected][propertyRandom].word;
    answerOfWord = words[propertySelected][propertyRandom].answer;

    if (!selectedWord) return;

    gameChargeWords(propertySelected, selectedWord);
}

/* Charge the words of the game */
const gameChargeWords = (propertySelected, selectedWord) => {
    tip.innerHTML = propertySelected;
    wordForGame.innerHTML = selectedWord;
}

/* Variables imp for the Game */
// let usedWords = 0;
let goodAnswer = 0;
let tries = 2;

// ▶️ TODO:
//      Calculate Total of Points
const calculateTotalOfPoints = (words) => {
    let acc = [];
    for (let prop in words) {
        acc.push(words[prop].length);
        let totalOfPoints = 0;

        acc.forEach(tt => {
            totalOfPoints += tt;
        });

        return totalOfPoints;
    }

    console.log(totalOfPoints);
}

/* Send Answer */
const sendAnswer = () => {
    const answer = answerInput.value;
    if(!answer) return;

    alert(answer);

    answerInput.value = '';
    
    // Do a function to watch de answer:
        // selectedWord -> necesito entrar a ".answer"
        // if answer ===  words[propertySelected][propertyRandom].answer {
        //    puntuación++;
        //    cambia palabra;
        // } else { disminui intentos. if intentos === 0 { cambia palabra }}
}


selectWordsRandomly();
console.log(selectedWord, answerOfWord);

form.addEventListener('submit', addNewWord);
sendButton.addEventListener('click', sendAnswer);
answerInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendAnswer();
        answerInput.value = '';
    } else {
        return;
    }
});
