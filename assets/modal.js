const modal = document.querySelector(".modal");

const closeModal = () => {
  modal.close();
};

const openModal = () => {
  modal.showModal();
};

/* Footer */
const infoToHide = document.querySelector(".kanjiList--footer");
const btnToShow = document.querySelector("#showKanjiList");
const btnToHide = document.querySelector("#hideKanjiList");

btnToShow.style.display = "none";
btnToHide.style.display = "block";

const hideKanjiList = () => {
  infoToHide.style.display = "none";
  btnToHide.style.display = "none";
  btnToShow.style.display = "block";
};

const showKanjiList = () => {
  infoToHide.style.display = "block";
  btnToHide.style.display = "block";
  btnToShow.style.display = "none";
};