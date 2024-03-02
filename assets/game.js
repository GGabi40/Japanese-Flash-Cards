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
        // { word: "バス", answer: "colectivo"},
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
const puntaje = document.querySelector('#puntaje');
const wordForGame = document.querySelector('.word');

let selectedWord;
let answerOfWord;
let usedWords = [];

// TODO:
//    . Que no se repitan palabras
// CRUD de palabras: Mostrar palabras agregadas, editar y deletar
const selectWordsRandomly = () => {
    inicializarWords();

    let allWords = [];
    for (let prop in words) {
        allWords = allWords.concat(words[prop].map(item => item.word));
    }

    const availableWords = allWords.filter(word => !usedWords.includes(word));

    if (availableWords.length === 0) {
        // Si no hay palabras disponibles, mostrar el mensaje de juego finalizado
        alert(`¡Juego finalizado! Total de palabras: ${puntajeTotal}`);
        return;
    }

    let propertiesOfObject = Object.keys(words);
    const indexRandom = Math.floor(Math.random() * propertiesOfObject.length);

    const propertySelected = propertiesOfObject[indexRandom];

    if (!words[propertySelected] || words[propertySelected].length === 0) {
        // Si la categoría está vacía, vuelve a intentar seleccionar una palabra
        selectWordsRandomly();
        return;
    }

    const propertyRandom = Math.floor(Math.random() * words[propertySelected].length);

    selectedWord = words[propertySelected][propertyRandom].word;
    answerOfWord = words[propertySelected][propertyRandom].answer;

    if (!selectedWord) return;

    tries = 2;
    gameChargeWords(propertySelected, selectedWord);
}

/* Charge the words of the game */
const gameChargeWords = (propertySelected, selectedWord) => {
    tip.innerHTML = propertySelected;
    wordForGame.innerHTML = selectedWord;
}

/* Variables imp for the Game */
let puntajeTotal = 0;
let tries = 2;

/* Send Answer */
const sendAnswer = () => {
    const answer = answerInput.value.trim();
    if(!answer) return;

    answerInput.value = '';

    if(answer === answerOfWord) {
        puntajeTotal++;
        selectWordsRandomly();
    } else {
        tries--;
        if(tries === 0) {
            selectWordsRandomly();
            tries = 2;
            puntajeTotal = 0; 
        }
    }

    attempts.textContent = tries;
    puntaje.textContent = puntajeTotal;

}

selectWordsRandomly();

form.addEventListener('submit', addNewWord);
sendButton.addEventListener('click', sendAnswer);
answerInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendAnswer();
        answerInput.value = '';
    }
});
