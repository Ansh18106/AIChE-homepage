// const sec = `input[name=question${json.title}]:checked`;
// console.log (sec);
pageSelector = document.getElementById('pageSelector');
surveyPrev = document.getElementById('surveyPrev');
surveyNext = document.getElementById('surveyNext');
surveyProgress = document.getElementById('surveyProgress');
surveyPageNo = document.getElementById('surveyPageNo');
pageSelector = document.getElementById('pageSelector');
surveyComplete= document.getElementById('surveyComplete');
endQuiz= document.getElementById('endQuiz');
timer= document.getElementById('timer');

Survey
.StylesManager
.applyTheme("modern");

function doOnCurrentPageChanged(survey) {
    pageSelector.value = survey.currentPageNo;
    surveyPrev.style.display = !survey.isFirstPage? "inline": "none";
    surveyNext.style.display = !survey.isLastPage? "inline": "none";
    surveyComplete.style.display = survey.isLastPage ? "inline" : "none";
    surveyProgress.innerText = "Page " + (survey.currentPageNo + 1) + " of " + survey.visiblePageCount + ".";
    if (surveyPageNo) surveyPageNo.value = survey.currentPageNo;    
}

function setupPageSelector(survey) {
var selector =pageSelector;
for (var i = 0; i < survey.visiblePages.length; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = "Page " + (
    i + 1);
    selector.add(option);
}
}

var json = {
title: "Software developer survey.",
pages: [
    {
        title: "Format - YYYY",
        questions: [
            {
                type: "text",
                name: "0",
                title: "Please enter the current year"
            }
        ]
    },
    {
        title: "NOTE - Full Name",
        questions: [
            {
                type: "text",
                name: "1",
                title:  "Please enter the name of the club"
            }
        ]
    },
    {
        title: "Only one is correct",
        questions: [
            {
                type:"checkbox",
                name: "2",
                title: "What does HTML stand for?",
                // hasOther: true,
                colCount: 2 ,
                isRequired: true,
                choices: [" Hyper Text Markup Language", " Hyperlinks and Text Markup Language", " Home Tool Markup Language"]
            }
        ]
        
    }, {
        title: "NOTE : More than one may be correct",
        questions: [
            {
                type: "checkbox",
                name: "3",
                title:  "Who is/are Leading NITR AIChE ?",
                colCount: 2 ,
                isRequired: true,
                choices: ["Shivam Chaurasia"," Mr Bijan Kumar Behera"," Mr Karan Saxena"," The World Wide Web Consortium"]
            }
        ]
    }
]
};
var count = 0;


window.survey = new Survey.Model(json);
survey
.onComplete
.add(function (result) {
    var answers = [[2020], ["American Institute of Chemical Engineers"],[" Hyper Text Markup Language"] , ["Shivam Chaurasia"," Mr Bijan Kumar Behera"," Mr Karan Saxena"]];
    
        
    for (var i = 0; i < survey.visiblePages.length; i++) {
        if (answers[i].length ==1){
            console.log(i.toString());
            if (answers[i][0] == result.data[i.toString()]){
                
                count +=4;
                console.log(count);
            }
            else{
                count -= 1;
                console.log(count);
            }

        }
        else {
            var x = 0;
            for (var j=0; j<answers[i].length ; j++){
                if (answers[i].length===result.data[i.toString()].length){
                    if (result.data[i.toString()].includes(answers[i][j]) ){
                        x += 1;

                    }
                    else {
                        count -= 1;
                        break;
                    }
                }
                else{
                    count -= 1;
                    break;
                }
            }
            if (x===answers[i].length ){
                count += 4;
            }
        }
        
    }
    document
        .querySelector('#surveyResult')
        .textContent = "your score is"+ count;
    
    
});

survey.showTitle = false;

$("#surveyElement").Survey({model: survey, onCurrentPageChanged: doOnCurrentPageChanged});

setupPageSelector(survey);
doOnCurrentPageChanged(survey);
survey.showTitle = false;



// _______________________timer_________________________

var DO =1 ;
function startingTime(){
    var countDownDate = new Date().getTime() +3600001 ;
    
    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Output the result in an element with id="demo"
      if (DO ==1){
  timer.innerHTML =  hours + "h "
  + minutes + "m " + seconds + "s ";
}},1000);
}

function EndQuiz(){
    DO = 0;
    console.log (DO);
    timer.innerHTML = "quiz ended";
}

window.addEventListener('load',startingTime,false);
endQuiz.addEventListener('click',EndQuiz,false);
surveyComplete.addEventListener('click',EndQuiz,false);