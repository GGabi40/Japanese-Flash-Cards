/* Add new words */
const form = document.querySelector('.form');
const divConfirmando = document.querySelector('.agregado');

let words = {
    verbo: [
        { word: "たべる", answer: "comer", img: "", alt: "", },
        { word: "たべました", answer: "comí", img: "", alt: "", },
        { word: "いく", answer: "ir", img: "", alt: "", },
    ],
    adjetivo: [
        { word: "おいしい", answer: "rico", img: "", alt: "" },
    ],
    sustantivo: [
        { word: "バス", answer: "colectivo", img: "./assets/css/imgs/substantivo/colectivo.jpg", alt: "Picture of a bus.", },
        { word: "くるま", answer: "auto", img: "./assets/css/imgs/substantivo/auto.jpg", alt: "Picture of a car.", },
        { word: "タクシー", answer: "taxi", img: "./assets/css/imgs/substantivo/taxi.jpg", alt: "Picture of a taxi.", },
        { word: "でんしゃ", answer: "tren", img: "./assets/css/imgs/substantivo/tren.jpg", alt: "Picture of a train.", },
        { word: "ひこうき", answer: "avión", img: "./assets/css/imgs/substantivo/avion.jpg", alt: "Picture of an airplane.", },
        { word: "ふね", answer: "barco", img: "./assets/css/imgs/substantivo/barco.jpg", alt: "Picture of a boat.", },
    ],
    comida: [],
    cidades: [],
    kanji: [
        { word: "一", answer: "ichi", img: "./assets/css/imgs/kanji/one.png", alt: "Picture of a number One.", },
        { word: "二", answer: "ni", img: "./assets/css/imgs/kanji/twp.png", alt: "Picture of a number Two.", },
        { word: "三", answer: "san", img: "./assets/css/imgs/kanji/three.png", alt: "Picture of a number Three.", },
        { word: "山", answer: "yama", img: "./assets/css/imgs/kanji/mountain.png", alt: "Picture of a montain.", },
        { word: "私", answer: "watashi", img: "./assets/css/imgs/kanji/yo.png", alt: "Picture of a man pointing at himself.", },
        { word: "名前", answer: "namae", img: "./assets/css/imgs/kanji/name.png", alt: "Picture of a card asking for your name.", },
    ],
    frases: [
        { word: "それは なんですか。", answer: "qué es eso", img: "", alt: "", },
        
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

const selectWordsRandomly = () => {
    inicializarWords();

    let propertiesOfObject = Object.keys(words);
    const indexRandom = Math.floor(Math.random() * propertiesOfObject.length);

    const propertySelected = propertiesOfObject[indexRandom];
    const propertyRandom = Math.floor(Math.random() * words[propertySelected].length);

    const selectedWord = words[propertySelected][propertyRandom].word;

    if (!words[propertySelected][propertyRandom].word) return;

    gameChargeWords(propertySelected, selectedWord);


    /* Do game HERE */
    answer = selectedWord;
    console.log(answer);
    // Do a function to watch de answer:
        // selectedWord -> necesito entrar a ".answer"
        // if answer ===  words[propertySelected][propertyRandom].answer {
        //    puntuación++;
        //    cambia palabra;
        // } else { disminui intentos. if intentos === 0 { cambia palabra }}
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
}


selectWordsRandomly();

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
