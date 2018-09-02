
$(document).ready(function() {
    // Create a function that creates the start button and initial screen
    
    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Start</a></p>";
        $("#mainArea").append(openScreen);
    }
    
    openingPage();
    
    //on-click event to start the game 
    
    $("#mainArea").on("click", ".start-button", function(event){
        event.preventDefault(); 
     
        $('.jumbotron').hide();
            
        generateQuestions();
    
        timerWrapper();
    
    }); // Closing start-button click
    
    $("body").on("click", ".answer", function(event){
        
        selectedAnswer = $(this).text();
       
        selectedAnswer === correctAnswers[questionCounter] ? ( 
            clearInterval(theClock),
            generateWin()) :
            (
            clearInterval(theClock),
            generateLoss()
        )
    }); 
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closing reset-button click
    
    });  //  Closing jQuery wrapper
    
    function timeoutLoss() {
        unansweredTally++;
        
        gameHTML = "<p class='text-center'>You ran out of time! Correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong1.gif'>";
        $("#mainArea").html(gameHTML);

        setTimeout(finalScreen, 2000);  
      
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 2000);  
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML =  "<p class='text-center'>Wrong! Correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong1.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 2000); 
    }
    

    function generateQuestions() {
        gameHTML =  "</span></p>" + "<p class='text-center timer-p'>Time Left: <span class='timer'></span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $("#mainArea").html(gameHTML);
    }; 
    
    function wait() {
       
    questionCounter < 8 ? 
        (questionCounter++,
        generateQuestions(),
        timerWrapper() ):
        
       (finalScreen())
    }; //end function
    
    function timerWrapper() {
        theClock = setInterval(fiftySeconds, 1000);
        function fiftySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center'> Great Job! Here's the results:" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p class='summary-correct'>Wrong Answers: " + incorrectTally + "</p>" + "<p class='summary-correct'>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Game!</a></p>";
        $("#mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 50;
        generateQuestions();
        timerWrapper();
    }
    
    var openScreen;
    var gameHTML;
    var counter = 50;
    var questionArray = 
    [ "How many valence electrons does an oxygen atom have?", 
    "How many actors played Harry Potter in the Harry Potter movies", 
    "How many miligrams are in 0.2 decigrams?", 
    "Which of the following is the correct name for NaHCO3", 
    "Which of the following gases would be most soluble in water?",
    "Which of the following elements has the greatest electronegativity?", 
    "Which of the following compounds should have the highest boiling point?",
    "Which of the following characters are rabbits?", 
    "What kind of animals is the longest in the world?"];

    var answerArray = [
        ['2', '6', '8', '16'], 
        ['1','5', '8','2'], 
        ['20 miligrams', '2000 miligrams', '0.002 miligram', '0.00002 miligram'], 
        ['sodium hydrogen carbonate', 'sodium acetate', 'nitrogen hydrogen carbonate', 'sodium hydrogen carbon trioxide'], 
        ['N2', 'NH3', 'CH4', 'CO2'], 
        ['Si', 'P', 'N', 'O'], 
        ['NH3', 'CH4', 'H2O', 'HF'], 
        ['Bugs Bunny', 'Easter Bunny', 'Brer Rabbit', 'None, they are all hares'],
        ['A jellyfish', 'A whale', 'A snake', 'A worm']];

    var imageArray = new Array(); 
    imageArray[0] = "<img class='center-block' src='assets/images/electrons.png'>";
    imageArray[1] = "<img class='center-block' src='assets/images/potter.gif'>"; 
    imageArray[2] = "<img class='center-block' src='assets/images/convert.jpeg'>"; 
    imageArray[3] = "<img class='center-block' src='assets/images/teste.gif'>"; 
    imageArray[4] = "<img class='center-block' src='assets/images/bonds.png'>"; 
    imageArray[5] = "<img class='center-block' src='assets/images/boil.jpg'>"; 
    imageArray[6] = "<img class='center-block' src='assets/images/rest.gif'>"; 
    imageArray[7] = "<img class='center-block' src='assets/images/origin.gif'>"; 
    imageArray[8] = "<img class='center-block' src='assets/images/blue.png'>"; 

    var correctAnswers = 
    [
        "B. 6", 
        "B. 5", 
        "A. 20 miligrams", 
        "A. sodium hydrogen carbonate", 
        "B. NH3", 
        "D. O", 
        "C. H2O",
        "D. None, they are all hares",
        "D. A worm"];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("assets/images/PhillWickham.mp3");