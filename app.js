let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let totalms = 0;

//Subjects
let [maths,english,individuals,second,science] = [false,false,false,false,false];
let math_elem = document.querySelector("body > div.main-section > div.main-page > div > div > div.subjects > div:nth-child(1)");
let english_elem = document.querySelector("body > div.main-section > div.main-page > div > div > div.subjects > div:nth-child(2)");
let individuals_elem = document.querySelector("body > div.main-section > div.main-page > div > div > div.subjects > div:nth-child(3)");
let second_elem = document.querySelector("body > div.main-section > div.main-page > div > div > div.subjects > div:nth-child(4)");
let science_elem = document.querySelector("body > div.main-section > div.main-page > div > div > div.subjects > div:nth-child(5)");


let alarm_minutes = 1;

math_elem.addEventListener("click", ()=> {
	maths= (!maths);
	if (math_elem.style.backgroundColor == "rgb(79, 106, 170)") {
		math_elem.style.backgroundColor = "#1f1f1f";
	} else {
		math_elem.style.backgroundColor = "rgb(79, 106, 170)";
	}
})
english_elem.addEventListener("click", ()=> {
	english=(!english);
	if (english_elem.style.backgroundColor == "rgb(174, 102, 102)") {
		english_elem.style.backgroundColor = "#1f1f1f";
	} else {
		english_elem.style.backgroundColor = "rgb(174, 102, 102)";
	}
})
individuals_elem.addEventListener("click", ()=> {
	individuals=(!individuals);
	if (individuals_elem.style.backgroundColor == "rgb(215, 199, 117)") {
		individuals_elem.style.backgroundColor = "#1f1f1f";
	} else {
		individuals_elem.style.backgroundColor = "rgb(215, 199, 117)";
	}
})
second_elem.addEventListener("click", ()=> {
	second=(!second);
	if (second_elem.style.backgroundColor == "rgb(117, 215, 122)") {
		second_elem.style.backgroundColor = "#1f1f1f";
	} else {
		second_elem.style.backgroundColor = "rgb(117, 215, 122)";
	}
})
science_elem.addEventListener("click", ()=> {
	science=(!science);
	if (science_elem.style.backgroundColor == "rgb(191, 122, 173)") {
		science_elem.style.backgroundColor = "#1f1f1f";
	} else {
		science_elem.style.backgroundColor = "#bf7aad";
	}
})

//Switching screens
let mainSection = document.querySelector("body > div.main-section");
let linkToTimer = document.querySelector("body > div.main-section > div.main-page > div > div > a");
let pageTitle = document.querySelector("body > h2")
let timerContainer = document.querySelector("body > div.container");
linkToTimer.addEventListener("click", ()=> {
	mainSection.style.display = "none";
	timerContainer.style.display = "block"
	pageTitle.style.display = "none";
})

//Timer
let timerRef = document.querySelector('body > div.container > div.timerDisplay');
let int = null;

document.getElementById('startTimer').addEventListener('click', ()=>{
    if(int!==null){
        clearInterval(int);
    }

    int = setInterval(displayTimer,10);
});

document.getElementById('pauseTimer').addEventListener('click', ()=>{
    clearInterval(int);
});

document.getElementById('resetTimer').addEventListener('click', ()=>{
    clearInterval(int);
    
    console.log(totalms);
	console.log(parseInt((localStorage.getItem('maths') || 0)));
	console.log(parseInt(totalms/1000));
	console.log((parseInt((localStorage.getItem('maths') || 0)) + parseInt(totalms/1000)).toString());
	if (maths) {
		localStorage.setItem("maths", (parseInt((localStorage.getItem('maths') || 0)) + parseInt(totalms/1000)).toString());
	}
	if (english) {
		localStorage.setItem("english", (parseInt((localStorage.getItem('english') || 0)) + parseInt(totalms/1000)).toString());
	}
	if (individuals) {
		localStorage.setItem("individuals", (parseInt((localStorage.getItem('individuals') || 0)) + parseInt(totalms/1000)).toString());
	}
	if (second) {
		localStorage.setItem("second", (parseInt((localStorage.getItem('second') || 0)) + parseInt(totalms/1000)).toString());
	}
	if (science) {
		localStorage.setItem("science", (parseInt((localStorage.getItem('science') || 0)) + parseInt(totalms/1000)).toString());
	}
	maths=false;
	english=false;
	individuals=false;
	second=false;
	science=false;
	[milliseconds,seconds,minutes,hours] = [0,0,0,0];
	timerRef.innerHTML = '00 : 00 : 00';
	mainSection.style.display = "block";
	timerContainer.style.display = "none";
	location.reload();
});

function displayTimer(){
    milliseconds+=10;
	totalms += 10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    timerRef.innerHTML = ` ${h} : ${m} : ${s}`;
}

// set the dimensions and margins of the graph
var width = (window.innerWidth)/3.5
    height = width
    margin = 10

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data = {a: parseInt((localStorage.getItem('maths'))), b: parseInt((localStorage.getItem('english'))), c:parseInt((localStorage.getItem('individuals'))), d:parseInt((localStorage.getItem('second'))), e:parseInt((localStorage.getItem('science')))}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(["#4f6aaa", "#ae6666", "#d7c775", "#75d77a", "#bf7aad"])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('whatever')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

let content = document.querySelector("body > div.main-section > div.right-half > div.content");
content.innerHTML = `Time Spent per Subject:
<br> Maths: ${Math.floor(localStorage.getItem('maths')/3600) || 0}h${Math.floor(localStorage.getItem('maths')/60) || 0}m
<br> English:  ${Math.floor(localStorage.getItem('english')/3600 || 0)}h${Math.floor(localStorage.getItem('english')/60) || 0}m
<br> Individuals & Societies:  ${Math.floor(localStorage.getItem('individuals')/3600) || 0}h${Math.floor(localStorage.getItem('individuals')/60) || 0}m
<br> Second/Foreign Language:  ${Math.floor(localStorage.getItem('second')/3600) || 0}h${Math.floor(localStorage.getItem('second')/60 || 0)}m
<br> Maths:  ${Math.floor(localStorage.getItem('science')/3600) || 0}h${Math.floor(localStorage.getItem('science')/60 || 0)}m`;