
var intervalMins = 25
var intervalSecs = 0

var breakIntervalMins = 5
var breakIntervalSecs = 0

var isOn = true;

let isPaused = true

var temporaryinterval
const theTitle = document.getElementById("title").innerHTML

function starttimer() {
    var minsType;
    var secsType;

    if (isOn){
        minsType = "minsOn";
        secsType = "secsOn";
    }
    else{
        minsType = "minsOff";
        secsType = "secsOff";
    }

    document.getElementById(secsType).contentEditable = false;
    document.getElementById(minsType).contentEditable = false;
    var startTimeSecs;
    var startTimeMins;
    startTimeSecs = parseInt(document.getElementById(secsType).innerHTML);
    startTimeMins = parseInt(document.getElementById(minsType).innerHTML);

    console.log("timer started");
    temporaryinterval = setInterval(function (){
        document.getElementById("title").innerHTML = theTitle + (" " + document.getElementById(minsType).innerHTML + ":" + document.getElementById(minsType).innerHTML)
        if (!isPaused) {
            if (startTimeSecs === 0 && startTimeMins > 0) {
                startTimeMins -= 1
                startTimeSecs = 59
            } else if (startTimeMins === 0 && startTimeSecs < 1) {
                startTimeSecs = 0
            } else {
                startTimeSecs -= 1
            }

            if (startTimeSecs === 0) {
                tempSecs = "00"
            } else if (startTimeSecs < 10) {
                tempSecs = "0" + startTimeSecs
            } else {
                tempSecs = startTimeSecs
            }

            //console.log(typeof startTimeMins,startTimeMins, typeof startTimeSecs, startTimeSecs)
            document.getElementById(minsType).innerHTML = startTimeMins < 10 ? startTimeMins + "0" : startTimeMins
            document.getElementById(secsType).innerHTML = tempSecs


            if(startTimeSecs === 0 && startTimeMins === 0){
                document.getElementById(minsType).innerHTML = isOn ? intervalMins : breakIntervalMins;
                document.getElementById(secsType).innerHTML = isOn ? intervalSecs : breakIntervalSecs;
                console.log("timer finished!")
                pausetimer();
                isOn = !isOn;
                pausetimer();
            }
        }
        else{
            clearInterval(temporaryinterval)
        }
    }, 1000)

}

function pausetimer(){
    var minsType;
    var secsType;

    if (isOn){
        minsType = "minsOn";
        secsType = "secsOn";
    }
    else{
        minsType = "minsOff";
        secsType = "secsOff";
    }

    if (!isPaused) {
        isPaused = true
        document.getElementById(secsType).contentEditable = true
        document.getElementById(minsType).contentEditable = true
        clearInterval(temporaryinterval)
        document.getElementById("pauseTimer").innerHTML = "Resume"
        console.log("timer paused")
    }
    else{
        isPaused = false
        document.getElementById("pauseTimer").innerHTML = "Pause"
        console.log("timer resumed")
        starttimer()
    }
}

function endtimer(){
    var minsType;
    var secsType;

    if (isOn){
        minsType = "minsOn";
        secsType = "secsOn";
    }
    else{
        minsType = "minsOff";
        secsType = "secsOff";
    }
    isPaused = true
    console.log("timer ended")
    clearInterval(temporaryinterval)
    document.getElementById("pauseTimer").innerHTML = "Resume"

    if (isOn){
        document.getElementById(secsType).innerHTML = (intervalSecs === 0) ? "00" : intervalSecs
        document.getElementById(minsType).innerHTML = intervalMins
    }
    else {
        document.getElementById(secsType).innerHTML = (breakIntervalSecs === 0) ? "00" : breakIntervalSecs
        document.getElementById(minsType).innerHTML = breakIntervalMins
    }

    document.getElementById(secsType).contentEditable = true
    document.getElementById(minsType).contentEditable = true
}

var intButton = document.getElementById("setInt")

intButton.addEventListener("click", function () {
    var minsType;
    var secsType;

    if (isOn){
        minsType = "minsOn";
        secsType = "secsOn";
    }
    else{
        minsType = "minsOff";
        secsType = "secsOff";
    }

    document.getElementById("setInt").innerHTML = "\uD83D\uDDF8";

    if (parseInt(document.getElementById(minsType).innerHTML) >= 0 && isOn){
        intervalMins = document.getElementById(minsType).innerHTML;
    }
    else if (parseInt(document.getElementById(minsType).innerHTML) >= 0 && !isOn){
        breakIntervalMins = parseInt(document.getElementById(minsType).innerHTML);
    }
    else{
        intervalMins = 25;
        breakIntervalMins = 5;
    }
    if (parseInt(document.getElementById(secsType).innerHTML) >= 0 && isOn){
        intervalSecs = document.getElementById(secsType).innerHTML;
    }
    else if (parseInt(document.getElementById(secsType).innerHTML) >= 0 && !isOn){
        breakIntervalSecs = parseInt(document.getElementById(secsType).innerHTML);
    }
    else {
        intervalSecs = 0;
        breakIntervalSecs = 0;
    }


    if (isOn){
        document.getElementById(minsType).innerHTML = intervalMins;
        document.getElementById(secsType).innerHTML = intervalSecs;
        console.log(isOn, minsType, secsType, intervalMins, intervalSecs, breakIntervalMins, breakIntervalSecs);
    }
    else {
        document.getElementById(minsType).innerHTML = breakIntervalMins;
        document.getElementById(secsType).innerHTML = breakIntervalSecs;
        console.log(isOn, minsType, secsType, intervalMins, intervalSecs, breakIntervalMins, breakIntervalSecs);
    }
    var counter = 0
    var x = setInterval(function (){
        counter += 1;
        if (counter === 2){
            document.getElementById("setInt").innerHTML = "Set Interval"
            clearInterval(x);
        }
    }, 1000)

})

const pauseTimerButton = document.getElementById("pauseTimer")
pauseTimerButton.addEventListener("click", pausetimer)

const endTimerButton = document.getElementById("endTimer")
endTimerButton.addEventListener("click", endtimer)


function newLilListElement(ID) {
    //console.log(ID)
    bigID = (ID === undefined) ? "parentBig" : ID
    var taskHead = document.getElementById("taskList")
    var bigTaskAbove = document.getElementById(bigID)
    //console.log(bigTaskAbove)
    var li = document.createElement("li");
    var label = document.createElement("p");
    var span = document.createElement("span");
    var estIntervals = document.createElement("p")
    span.className = "checkclose";
    span.onclick = function() {
        if (this.parentElement.children[1].className !== "checked"){
            var listitem = this.parentElement.children;
            listitem[1].className = "checked";
            listitem[2].className = "checked";
            var theP = document.getElementsByClassName("checked")
            for (var i = 0; i < theP.length; i++){
                theP[i].contentEditable = false;
            }
            this.innerHTML = "\u00D7"
            this.className = "exed"
            this.parentElement.className += " xxxx"
        }
        else {
            this.parentElement.style.display = "none"
        }
    };
    var txt = document.createTextNode("\uD83D\uDDF8");
    span.appendChild(txt);
    li.className = "lilTask " + bigID;
    label.innerHTML = "insert item here";
    label.contentEditable = "true";
    estIntervals.className = "estimatedIntervals " + bigID
    estIntervals.contentEditable = "true"
    estIntervals.innerHTML = "0"

    estIntervals.addEventListener("input", function (){
        bigID = (this.className.substring(this.className.length - 9, this.className.length) === "parentBig") ? "parentBig" : this.className.substring(this.className.length - 5, this.className.length)
        var full = document.querySelectorAll("[class=\"" + this.className +"\"]");
        var etaDiv = document.querySelector(".estimatedtime." + bigID);
        //console.log(bigID);
        if (full.length > 0){
            var sum = 0;
            for (var i = 0; i < full.length; i++){
                if (parseInt(full[i].innerHTML) > 0 && full[i].parentElement.className.indexOf("xxxx") === -1){
                    sum += parseInt(full[i].innerHTML);
                }
            }
            var totalSecs = sum * intervalSecs;
            var totalMins = sum * intervalMins;

            if (totalSecs >= 60){
                var overflowMins = Math.trunc(totalSecs/60);
                totalMins += overflowMins;
                etaDiv.children[0].innerHTML = totalMins;
                etaDiv.children[2].innerHTML = (totalSecs % 60 < 10) ? "0" + (totalSecs%60) : totalSecs%60;
            }
            else {
                etaDiv.children[0].innerHTML = totalMins;
                etaDiv.children[2].innerHTML = (totalSecs % 60 < 10) ? "0" + (totalSecs%60) : totalSecs%60;
            }
        }
    })

    li.appendChild(span);
    li.appendChild(estIntervals)
    li.appendChild(label);
    taskHead.insertBefore(li, bigTaskAbove.nextSibling)
}


function newBigg(){
    var taskHead = document.getElementById("taskList");
    var li = document.createElement("li");
    var p = document.createElement("p");
    var spanLil = document.createElement("span");
    var spanBig = document.createElement("span");

    var divForTime = document.createElement("div");
    var hoursLeft = document.createElement("p");
    var minutesLeft = document.createElement("p");
    const colon = document.createElement("p");


    let thisItemsID = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5);
    li.id = thisItemsID;

    hoursLeft.className = "minutesLeft " + thisItemsID;
    minutesLeft.className = "secondsLeft " + thisItemsID;
    hoursLeft.innerHTML = "00";
    minutesLeft.innerHTML = "00";
    colon.innerHTML = ":";
    divForTime.className = "estimatedtime " + thisItemsID;

    divForTime.appendChild(hoursLeft);
    divForTime.appendChild(colon)
    divForTime.appendChild(minutesLeft);

    p.contentEditable = true;
    p.innerHTML = "insert a topic here";
    li.className = "bigTask";
    spanLil.className = "addBtn";
    spanLil.onclick = function () {
        newLilListElement(ID = thisItemsID)
    }
    spanLil.innerHTML = "+";
    spanBig.className = "biggBtn"
    spanBig.onclick = function (){
        this.parentElement.style.display = "none";
        var full = document.querySelectorAll("[class*=\"" + thisItemsID +"\"]");
        if (full.length > 0){
            for (var i = 0; i < full.length; i++){
                full[i].style.display = "none"
            }
        }

    };
    spanBig.innerHTML = "\u00D7"

    li.appendChild(spanBig)
    li.appendChild(p);
    li.appendChild(spanLil);
    li.appendChild(divForTime);

    //console.log(bigTaskIDs)
    taskHead.appendChild(li);
}


var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.parent.tagName === 'LI') {
        ev.target.parent.toggle('checked');
    }
}, false);


var currTime = document.querySelector("#currTime");
var timeLeft = document.querySelector("#timeRemaining");
var counter = 0;
setInterval(function () {
    var allTheMins = document.querySelectorAll("[class~=" + "minutesLeft]");
    var allTheSecs = document.querySelectorAll("[class~=" + "secondsLeft]");
    var mins = 0;
    var secs = 0;
    for (var e = 0; e < allTheMins.length; e++){
        mins += parseInt(allTheMins[e].innerHTML);
        secs += parseInt(allTheSecs[e].innerHTML);
    }

    var theDate = new Date();

    var totalMins = (parseInt(mins + secs/60) + theDate.getMinutes());

    //console.log(mins)
    if (theDate.getHours() >= 12){
        currTime.innerHTML = ((theDate.getHours() + 1) % 13) + ":" + ((theDate.getMinutes() < 10) ? "0" + theDate.getMinutes() : theDate.getMinutes()) + " PM";
    }
    else {
        currTime.innerHTML = theDate.getHours() + ":" + ((theDate.getMinutes() < 10) ? "0" + theDate.getMinutes() : theDate.getMinutes()) + " AM";
    }
    if ((theDate.getHours() + (totalMins / 60)) % 24 >= 12){
        //console.log((theDate.getHours() + (totalMins / 60)) % 24, (theDate.getHours() + (totalMins / 60)) % 24 >= 12)
        if ((totalMins % 60) < 10){
            timeLeft.innerHTML = (((theDate.getHours() + parseInt(totalMins / 60)) % 12) + 1) + ":0" + (totalMins % 60) + " PM";
        }
        else{
            timeLeft.innerHTML = (((theDate.getHours() + parseInt(totalMins / 60)) % 12) + 1) + ":" + (totalMins % 60) + " PM";
        }
    }
    else {
        //console.log((theDate.getHours() + (totalMins / 60)) % 24, (theDate.getHours() + (totalMins / 60)) % 24 >= 12)
        if ((totalMins % 60) < 10){
            timeLeft.innerHTML = (parseInt(theDate.getHours() + (totalMins / 60)) % 24) + ":0" + (totalMins % 60) + " AM";
        }
        else{
            timeLeft.innerHTML = (parseInt(theDate.getHours() + (totalMins / 60)) % 24) + ":" + (totalMins % 60) + " AM";
        }
    }


    var allTheIntervals = document.querySelectorAll("[class~=" + "estimatedIntervals]");
    for (var i = 0; i < allTheIntervals.length; i++){
        if (allTheIntervals[i].innerHTML === "" && counter >= 5){
            //console.log(allTheIntervals[i]);
            allTheIntervals[i].setAttribute("placeholder", "0")
            counter = 0;
        }
    }
    counter++
    updateAllEtas();
}, 1000)

function updateAllEtas(){
    let allEtas = document.querySelectorAll(".estimatedtime");
    for (let i = 0; i < allEtas.length; i++){
        let code = allEtas[i].classList[1];
        let temp = document.querySelectorAll(".estimatedIntervals." + code);
        let tempIntervalSum = 0;
        for (let k = 0; k < temp.length; k++){
            if (!("xxxx" in temp[k]) && !isNaN(parseInt(temp[k].innerHTML))){
                tempIntervalSum += parseInt(temp[k].innerHTML)
            }
        }
        let overflowSecs = (intervalSecs * tempIntervalSum) % 60;
        let overflowMins = Math.floor((intervalSecs * tempIntervalSum) / 60);

        allEtas[i].children[0].innerHTML = parseInt(intervalMins) * tempIntervalSum + parseInt(overflowMins) < 10 ? (parseInt(intervalMins) * tempIntervalSum + parseInt(overflowMins)) + "0" : parseInt(intervalMins) * tempIntervalSum + parseInt(overflowMins);
        allEtas[i].children[2].innerHTML = overflowSecs < 10 ? overflowSecs + "0" : overflowSecs;

    }
}

