//Card class
class Card{
    constructor({soundName, imageUrl, soundCode, onDismiss, onLoad, onRemove}) {
        this.soundName = soundName;
        this.imageUrl = imageUrl;
        this.onDismiss = onDismiss;
        this.onLoad = onLoad;
        this.onRemove = onRemove;
        this.soundCode = soundCode;
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
        const soundLabel = document.createElement('h1');
        soundLabel.innerHTML = this.soundName;
        soundLabel.className = 'soundTitle';
        const img = document.createElement('img');
        img.src = this.imageUrl;
        card.append(img);
        card.append(soundLabel)
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
    #dismiss = (direction) => {
        this.#startPoint = null;
        document.removeEventListener('mouseup', this.#handleMouseUp);
        document.removeEventListener('mousemove', this.#handleMouseMove);
        this.element.style.transition = 'transform 1s';
        this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px) rotate(${90 * direction}deg)`
        this.element.classList.add('dismissing');
        setTimeout(() => {
            this.element.remove();
        }, 1000);
        if (typeof this.onDismiss === 'function'){
            this.onDismiss();
        }
        if (typeof this.onLoad === 'function' && direction === 1){
            this.onLoad();
            console.log("loading", this.soundName)
            currSoundCode = this.soundCode;
            var temp = codes.indexOf(this.soundCode);
            theAudioSource.setAttribute("src", "sounds/"+sounds[temp])
        }
        if (typeof this.onRemove === 'function' && direction === -1){
            this.onRemove();
            console.log("removing", this.soundName)
        }
    }
}

// DOM
const swiper = document.querySelector('#swiper');
const load = document.querySelector('#loadSound');
const remove = document.querySelector('#removeSound');
const theAudioSource = document.querySelector('#audio')

//constants

const urls = [
    "https://source.unsplash.com/random/1000x1000?rain",
    "https://source.unsplash.com/random/1000x1000?white",
    "https://source.unsplash.com/random/1000x1000?brown",
    "https://source.unsplash.com/random/1000x1000?waterfall",
    "https://source.unsplash.com/random/1000x1000?lightning",
    "https://source.unsplash.com/random/1000x1000?forest",
    "https://source.unsplash.com/random/1000x1000?underwater",
    "https://source.unsplash.com/random/1000x1000?starry,night",
    "https://source.unsplash.com/random/1000x1000?airplane"
];

const titles = [
    "light rain",
    "white noise",
    "brown noise",
    "waterfall",
    "heavy storm",
    "nature",
    "underwater ambience",
    "night time",
    "airplane ambience"
]

const codes = [
    "lr1",
    "wn1",
    "bn1",
    "wf1",
    "ts1",
    "nr1",
    "ua1",
    "nt1",
    "aa1"
]
const sounds = [
    "rain-peaceful.wav",
    "white-noise-10-min.mp3",
    "brown-noise.wav",
    "big-waterfall-loop.mp3",
    "heavy-storm.mp3",
    "jungle-natural-ambience.wav",
    "underwater-ambience.mp3",
    "night-sounds.wav",
    "airplane-ambience.mp3"
]



//variables
let cardCount = 0;
let soundCount = titles.length;
let lastNum;

//functions
function appendNewCard(){
    var randomCardSelector = Math.floor(Math.random() * soundCount);
    while(lastNum === randomCardSelector){
        randomCardSelector = Math.floor(Math.random() * soundCount);
    }
    lastNum = randomCardSelector;
    const card = new Card(
        {
            soundName: titles[randomCardSelector],
            imageUrl: urls[randomCardSelector],
            soundCode: codes[randomCardSelector],
            onDismiss: appendNewCard,
            onLoad:()=>{
                load.style.animationPlayState = 'running';
                load.classList.toggle('trigger');
            },
            onRemove:()=>{
                remove.style.animationPlayState = 'running';
                remove.classList.toggle('trigger');
            }
        }
    );
    swiper.append(card.element)
    cardCount++;

    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
        card.style.setProperty('--i', index);
        card.style.transition = 'transform 0.5s'
    })
}
//first five cards
for (let i = 0; i < 5; i++){
    appendNewCard();
}