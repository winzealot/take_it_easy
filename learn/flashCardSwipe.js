//Card class
class Card{
    constructor({onDismiss, onLoad, onRemove, term, definition}){
        this.onDismiss = onDismiss;
        this.onLoad = onLoad;
        this.onRemove = onRemove;
        this.term = term;
        this.definition = definition;
        this.#init();
    }

    //private properties
    #startPoint;
    #offsetY;
    #offsetX;

    //private methods
    #init = ()=>{
        const card = document.createElement('div');
        card.classList.add('card');

        const cardFront = document.createElement('div');
        cardFront.className = "cardFace";
        cardFront.classList.add('front');
        cardFront.innerHTML = this.term;

        const cardBack = document.createElement('div');
        cardBack.className = "cardFace";
        cardBack.classList.add('back')
        cardBack.innerHTML = this.definition;

        card.append(cardFront);
        card.append(cardBack);
        this.element = card;
        this.#listenToMouseEvents();
    }

    #listenToMouseEvents = () => {
        //mousedown
        this.element.addEventListener('mousedown', e => {
            const {clientX, clientY} = e;
            this.#startPoint = {x: clientX, y: clientY};
            document.addEventListener('mousemove', this.#handleMouseMove);
            //no transition while moving
            this.element.style.transition = '';
        })
        //mouseup
        this.element.addEventListener('mouseup', this.#handleMouseUp);
        //click
        this.element.addEventListener('click', this.#handleClick)
        //prevent drag
        this.element.addEventListener('dragstart', e =>{
            e.preventDefault();
        })
    }
    #handleMouseMove = (e) => {
        if (!this.#startPoint) return;
        const {clientX, clientY} = e;
        this.#offsetX = clientX - this.#startPoint.x;
        this.#offsetY = clientY - this.#startPoint.y;

        const rotate = this.#offsetX*0.05

        this.element.style.transform = `translate(${this.#offsetX}px, ${this.#offsetY}px) rotate(${rotate}deg)`;

        //dismiss card when moving too far away
        if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.5){
            const direction = this.#offsetX > 0 ? 1 : -1
            this.#dismiss(direction);
        }
    }
    #handleMouseUp = (e) => {
        this.#startPoint = null;
        document.removeEventListener('mousemove', this.#handleMouseMove);
        //transition when letting go
        this.element.style.transition = 'transform 0.5s';
        this.element.style.transform = '';
    }

    #handleClick = (e) => {
      this.element.classList.toggle('is-flipped');
      const frontback = this.element.childNodes;
      if(this.element.classList.contains('is-flipped')){
          frontback[0].style.visibility = 'hidden';
          frontback[1].style.transition = '0.5s';
          frontback[1].style.backfaceVisibility = 'visible';
          frontback[1].style.transition = '0s';
      }
      else{
          frontback[1].style.backfaceVisibility = 'hidden';
          frontback[0].style.transition = '0.5s';
          frontback[0].style.visibility = 'visible';
          frontback[0].style.transition = '0s';
      }
    }

    #dismiss = (direction) => {
        this.#startPoint = null;
        document.removeEventListener('mouseup', this.#handleMouseUp);
        document.removeEventListener('mousemove', this.#handleMouseMove);
        this.element.style.transition = 'transform 1s';
        this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px) rotate(${90 * direction}deg)`
        this.element.classList.add('dismissing');
        setTimeout(() => {
            this.element.remove();
        }, 500);
        if (typeof this.onDismiss === 'function'){
            this.onDismiss();
        }
        if (typeof this.onLoad === 'function' && direction === 1){
            this.onLoad();
        }
        if (typeof this.onRemove === 'function' && direction === -1){
            this.onRemove();
        }
    }
}

// DOM
const swiper = document.querySelector('#swiper');
const load = document.querySelector('#right');
const remove = document.querySelector('#wrong');


//variables
let cardCount = 0;
let setID = 0;

//functions
function appendNewCard(){
    const card = new Card(
        {
            onDismiss: appendNewCard,
            onLoad:()=>{
                load.style.animationPlayState = 'running';
                load.classList.toggle('trigger');
            },
            onRemove:()=> {
                remove.style.animationPlayState = 'running';
                remove.classList.toggle('trigger');
            },
            term: termsList.length > 0 ? termsList[cardCount] : 'click to see my definition',
            definition: definitionsList.length > 0 ? definitionsList[cardCount] : "try loading a set on the left, then get rid of me and a couple of my friends behind me",

        }
    );
    swiper.append(card.element)
    cardCount = cardCount >= termsList.length-1 ? 0 : cardCount + 1;

    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
        card.style.setProperty('--i', index);
        card.style.transition = 'transform 0.5s'
    })
}


let termsList = [];
let definitionsList = []; // they get initialized in getStudySet()



function loadLists(term, def){
    termsList.push(term);
    definitionsList.push(def);
}

function getStudySet(studySetID) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://127.0.0.1:8000/api/sets/${studySetID}/?format=json`, false);
    xhttp.send();
    if (xhttp.status !== 404) {
        let data = JSON.parse(xhttp.responseText);
        setID = data.id;
        termsList = []; //initialize the lists to equal nothing EVERY TIME its called, so func can be recalled with new set and refresh
        definitionsList = [];
        data.cards.forEach((term, definition) => loadLists(term.term, term.definition));
        return true;
    }
    return false;

}

function checkStudySet(studySetID) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://127.0.0.1:8000/api/sets/${studySetID}/?format=json`, false);
    xhttp.send();
    return xhttp.readyState === 4 && xhttp.status === 200;
}

//first five cards
for (let i = 0; i < 5; i++){
    appendNewCard();
}