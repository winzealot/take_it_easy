//DOM
const thePlayButton = document.getElementById("playButton");
const soundTit = document.getElementById("soundLabel");
const soundCode = document.getElementById("soundCode");
const theSoundPlaying = document.getElementById("audio");

const searchInput = document.getElementById("searchForm");
const spotifyPlayer = document.querySelector("#spotifyIntegration iframe");


//constants


//variables
var isPlaying = false;
var currSoundCode;

//functions
setInterval(() => {
    if (currSoundCode != null){
        var temp = codes.indexOf(currSoundCode)
        soundTit.innerHTML = titles[temp];
        soundCode.innerHTML = codes[temp];
    }
}, 10)

function playAudio(){
    if (!isPlaying){
        thePlayButton.className = "fa-solid fa-pause";
        theSoundPlaying.play();
        isPlaying = true;
        console.log("now playing")
    }
    else {
        thePlayButton.className = "fa-solid fa-play";
        theSoundPlaying.pause();
        isPlaying = false;
        console.log("now paused")
    }
}

function searchSoundCode(query) {
    for (let i = 0; i < codes.length; i++){
        if (codes[i] === query){
            return codes.indexOf(query);
        }
    }

    return -1;
}

function findSpotifyCode(query) {
    let plCode;
    if (query.indexOf('?utm_source') !== -1){
        plCode = query.substring(34, query.indexOf('?'))
        console.log(plCode);
        let newSrc = "https://open.spotify.com/embed/playlist/"+ plCode +"?utm_source=generator&theme=0";
        console.log(newSrc);
        spotifyPlayer.setAttribute("src", newSrc);
        return 0;
    }
    else{
        return -1;
    }


}

function loadCode(){
    let query = searchInput.value;
    searchInput.value = "";
    if ((searchSoundCode(query) === -1) && (findSpotifyCode(query) === -1)){
        searchInput.placeholder = "code not found...";
        setTimeout(function () {
            searchInput.placeholder = "enter sound code or spotify link...";
        }, 2000)
    }
    else if (searchSoundCode(query) !== -1){
        let index = searchSoundCode(query);
        currSoundCode = codes[index];
        console.log("loading", titles[index])
        theAudioSource.setAttribute("src", "sounds/"+sounds[index])
    }
    else if(findSpotifyCode(query) !== -1){
        findSpotifyCode(query);
    }



}


//listeners and handlers





