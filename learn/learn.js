
//doc objects
let studySetInputID = document.getElementById("studySetInputID");
let loadSetButton = document.getElementById("loadSetButton");
let addSetButton = document.getElementById("addToSet");
let tList = document.getElementById("terms");
let dList = document.getElementById("definitions");

//variables



//functions
function openSetsForm(){
    document.getElementById("modalone").style.display = "block";
    document.getElementById("currSetID").innerHTML = setID;
}

function closeSetsForm(){
    document.getElementById("modalone").style.display = "none";
}

function openAddForm(){
    document.getElementById("modaltwo").style.display = "block";
}
function closeAddForm(){
    document.getElementById("modaltwo").style.display = "none";
}

function shuffleCards(){
    for(let i = 0; i < termsList.length; i++){
        let j = Math.floor(Math.random() * (i+1));
        //first swap the vals in termslist
        let temp = termsList[i];
        termsList[i] = termsList[j];
        termsList[j] = temp;
        //then swap the vals in definitionsList
        temp = definitionsList[i];
        definitionsList[i] = definitionsList[j];
        definitionsList[j] = temp;
    }
    refreshTermsAndDefs();
}

function tempsaveCards(){
    localStorage.setItem("termsList", JSON.stringify(termsList));
    localStorage.setItem("definitionsList", JSON.stringify(definitionsList));
}

function temploadCards(){
    termsList = JSON.parse(localStorage.getItem("termsList"));
    definitionsList = JSON.parse(localStorage.getItem("definitionsList"));
    refreshTermsAndDefs();
}

function refreshTermsAndDefs(){
    tList.innerHTML = "";
    dList.innerHTML = "";
    for(let i = 0; i < termsList.length; i++){
        tList.innerHTML += "<li class='tlist'>" + termsList[i] + "</li>";
        dList.innerHTML += "<li class='dlist'>" + definitionsList[i] + "</li>";
    }
    tempsaveCards();
}


//listeners
loadSetButton.addEventListener("click", function(){
    if(studySetInputID.value === ""){
        studySetInputID.placeholder = "you gotta fill this first";
    }
    else if(!checkStudySet(studySetInputID.value)){
        studySetInputID.value = "";
        studySetInputID.placeholder = "this is awkward. we couldn't find that.";
    }
    else{
        getStudySet(studySetInputID.value);
        studySetInputID.placeholder = "enter study set ID";
        studySetInputID.value = "";
        closeSetsForm();
    }
    refreshTermsAndDefs();
});

addSetButton.addEventListener("click", function(){
    let term = document.getElementById("termInput").value;
    let definition = document.getElementById("defInput").value;
    if(term === ""){
        document.getElementById("termInput").placeholder = "you gotta fill this, dude";
    }
    if(definition === "") {
        document.getElementById("defInput").placeholder = "cmon, you gotta fill this too";
    }
    if(term !== "" && definition !== ""){
        // alert("success!");
        termsList.push(term);
        definitionsList.push(definition);
        document.getElementById("termInput").value = "";
        document.getElementById("defInput").value = "";
        closeAddForm();
    }
    refreshTermsAndDefs();
});

window.onload = function(){
    if(localStorage.getItem("termsList") !== null){
        temploadCards();
    }
    for (let i = 0; i < 5; i++){
        appendNewCard();
    }
}
