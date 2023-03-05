var isHidden = true;

var spinner = document.getElementById('js-loading');
    const menu = document.querySelector('.menu');
    document.getElementById("js-schedule").style.backgroundColor = "white";
    var isClicked = false;
    const icon = document.querySelector('.fas, .fa-bars');
    var tvChannel = 'SVT 1';
    const run = setChannel(tvChannel);
    
function toggleMenu() {
    
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
    
    if(isHidden) {
       menu.style.left = '0px';
        isHidden = false;
    }else {
        menu.style.left = '-300px';
        isHidden = true;
    }
}

function show() {
    isClicked = true;
    const runAgain = setChannel(tvChannel);
}

function setChannel(channel) {

    tvChannel = channel;

    if(!isHidden) {

    
        const channelMenu = toggleMenu();
    }
    
    var d = new Date();
    var time = d.getHours()+":"+d.getMinutes();

    document.getElementById("js-title").innerHTML = null;

    document.getElementById("js-schedule").innerHTML = null;
    
        spinner.classList.remove('hidden');
    
fetch("data/"+channel+".json")
 .then(response => response.json())
 .then(data => renderData(data))
 .catch(error => console.log("Error: "+error));
 
 const previousProgram = ["Visa tidigare program"];

 function sortByStartTime(a, b) {
    if(a.start > b.start) {
        return 1;
    }
    if(a.start < b.start) {
        return -1;
    }
    return 0;
    }
 
    function renderData(data) {
    
        data.sort(sortByStartTime);

        let filter = data.filter(function(program) {
            if(program.start.substring(11, 16) > time) {
                return true;
            }
        })
    
        document.getElementById("js-title").innerHTML = channel;
       
          text = "<ul class='list-group list-group-flush'>";
          if(!isClicked) {
            previousProgram.forEach(previous);

          filter.forEach(program);
          }else {
            data.forEach(program);
            isClicked =false;
          }
          text += "</ul>";
          
        function previous(value) {
            text += "<li class='list-group-item show-previous' onclick = 'show()'>" +  value + "</li>";
        }

        function program(value) {
            text += "<li class='list-group-item'>" + "<strong>" + value.start.substring(11, 16) + "</strong>" + "<div>" + value.name + "</div>" + "</li>";

        }
      
        document.getElementById("js-schedule").innerHTML = text;

        spinner.classList.add('hidden');
    }  

    }
