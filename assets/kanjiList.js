/* Hide or Show Fonetic */
const btnHideFonetic = document.querySelector('#hideFonetic');
const spanTextFonetic = document.querySelector('#textFonetic');

let isFonetHidden = false;

btnHideFonetic.addEventListener('click', () => {
    const fonetics = document.querySelectorAll('#fonetic');
    fonetics.forEach(word => word.classList.toggle('showOrHide'));
    
    isFonetHidden = !isFonetHidden;

    if(isFonetHidden) {
        spanTextFonetic.textContent = 'Mostrar';
    } else {
        spanTextFonetic.textContent = 'Ocultar';
    }
    
});

/* Hide or Show Hiragana */
const btnHideHiragana = document.querySelector('#hideHiragana');
const spanTextHiragana = document.querySelector('#textHiragana');

let isHiragHidden = false;

btnHideHiragana.addEventListener('click', () => {
    const allHiragana = document.querySelectorAll('#hiragana');
    allHiragana.forEach(hiragana => hiragana.classList.toggle('showOrHide'));
    
    isHiragHidden = !isHiragHidden;
    
    if(isHiragHidden) {
        spanTextHiragana.textContent = 'Mostrar';
    } else {
        spanTextHiragana.textContent = 'Ocultar';
    }
    
});
