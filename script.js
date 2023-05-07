const cardsContainer = document.querySelector('.card-container');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const currentEl = document.querySelector('.card-num');
const showBtn = document.querySelector('.add-new-card-btn');
const hideBtn = document.querySelector('.adding-card .close');
const questionEl = document.querySelector('.txt-q');
const answerEl = document.querySelector('.txt-ans');
const addCardBtn = document.querySelector('.add-btn');
const clearBtn = document.querySelector('.clr-btn');
const addContainer = document.querySelector('.adding-card');

let activeCard = 0;
let cardsEl = [];
let cardsData = getCardsData(); //[
//   {
//     question: 'What is the owner of this game?',
//     answer: 'saad',
//   },
//   {
//     question: 'how old is he?',
//     answer: '22',
//   },
//   {
//     question: 'is he married',
//     answer: 'nooo',
//   },
//];
function getCardsData() {
  const _cards = JSON.parse(localStorage.getItem('cards'));
  return _cards === null ? [] : _cards;
}
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
  }
  
//create card
function createSingleCard(data, indx) {
  console.log(data);
  console.log(indx);
  const card = document.createElement('div');
  card.classList.add('card');
  if (indx === 0) {
    card.classList.add('active');
  }
  card.innerHTML = ` 
    <div class="inner-card">

    <div class="q">${data.question}</div>
    <div class="ans ">${data.answer}</div>
    </div>`;
  card.addEventListener('click', () => {
    // card.querySelector('.q').classList.toggle('hide');
    // card.querySelector('.ans').classList.toggle('show');
    card.classList.toggle('show-answer');
  });
    cardsEl.push(card);
    // setCardsData(card)

  cardsContainer.appendChild(card);
}
//create all card
function createCards() {
  cardsData.forEach((data, indx) => createSingleCard(data, indx));
}
// Show number of cards
function updateCurrentText() {
  if (cardsEl.length === 0) activeCard = -1; //if its empty print 0/0
  currentEl.innerText = `${activeCard + 1}/${cardsEl.length}`;
  if (cardsEl.length === 0) activeCard = 0; //if its empty return activeCard to 0
}

function addNewCard() {
  if (questionEl.value.trim() && answerEl.value.trim()) {
    let d = {
      question: questionEl.value,
      answer: answerEl.value,
    };
    createSingleCard(d, cardsEl.length);
    cardsData.push(d);
    setCardsData(cardsData)

  }
  updateCurrentText();
    addContainer.classList.remove('show');
    console.log(cardsData);
    
    questionEl.value = '';
    answerEl.value = '';
}

showBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
});
hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
  questionEl.value = '';
  answerEl.value = '';
});

nextBtn.addEventListener('click', () => {
  //   console.log(cardsEl[activeCard]);
  cardsEl[activeCard].className = 'card right';
  if (activeCard !== cardsEl.length - 1) ++activeCard;
  cardsEl[activeCard].className = 'card active';
  updateCurrentText();
});

prevBtn.addEventListener('click', () => {
  cardsEl[activeCard].className = 'card left';
  if (activeCard !== 0) --activeCard;
  cardsEl[activeCard].className = 'card active';
  updateCurrentText();
});
addCardBtn.addEventListener('click', addNewCard);

clearBtn.addEventListener('click', () => {
  cardsEl = [];
  cardsData = [];
  activeCard = 0;
    updateCurrentText();
    localStorage.clear();
  // createCards();
//   window.location.reload();
  cardsContainer.innerHTML = ``;
});
createCards();
updateCurrentText();
