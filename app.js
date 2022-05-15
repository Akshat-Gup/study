let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
totalms = 0;
let [maths,english,individuals,second,science] = [false,false,false,false,false];
let math_elem = document.querySelector("body > div.subjects > div:nth-child(1)");
let english_elem = document.querySelector("body > div.subjects > div:nth-child(2)");
let individuals_elem = document.querySelector("body > div.subjects > div:nth-child(3)");
let second_elem = document.querySelector("body > div.subjects > div:nth-child(4)");
let science_elem = document.querySelector("body > div.subjects > div:nth-child(5)");
math_elem.addEventListener("click", ()=> {
	maths=true;
})
english_elem.addEventListener("click", ()=> {
	english=true;
})
individuals_elem.addEventListener("click", ()=> {
	individuals=true;
})
second_elem.addEventListener("click", ()=> {
	second=true;
})
science_elem.addEventListener("click", ()=> {
	science=true;
})

let timerRef = document.querySelector('.timerDisplay');
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
    
    
	if (maths) {
		localStorage.setItem("maths", parseInt((localStorage.getItem('maths') || 0) + totalms));
	} else if (english) {
		console.log(milliseconds)
		localStorage.setItem("english", parseInt((localStorage.getItem('english') || 0) + totalms));
	} else if (individuals) {
		localStorage.setItem("individuals", parseInt((localStorage.getItem('individuals') || 0) + totalms));
	} else if (second) {
		localStorage.setItem("second", parseInt((localStorage.getItem('second') || 0) + totalms));
	} else if (science) {
		localStorage.setItem("science", parseInt((localStorage.getItem('science') || 0) + totalms));
	}
	maths=false;
	english=false;
	individuals=false;
	second=false;
	science=false;
	[milliseconds,seconds,minutes,hours] = [0,0,0,0];
	timerRef.innerHTML = '00 : 00 : 00';
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
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    timerRef.innerHTML = ` ${h} : ${m} : ${s}`;
}

// set the dimensions and margins of the graph
var width = 450
    height = 450
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

function showNotification() {
	const notification = new Notification("Am I studying?", {
		body: "Am I????????"
	});
}
alert("hello")