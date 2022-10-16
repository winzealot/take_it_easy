
//doc objects
let studySetInputID = document.getElementById("studySetInputID");
let loadSetButton = document.getElementById("loadSetButton");


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
});
