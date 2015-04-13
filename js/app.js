
var quiz = {};
var curQuestion = 0;
var curCorrect = 0;
var length = 0;
var userAnswers = {};

$(document).ready( function () {

	generateQuiz( answerKey );
	var numQuestions = quiz.length;

	console.log(quiz);

	loadQuestion(0);

	$(".button").on("mouseenter", function() {
		if (!$(this).hasClass("selected")) {
			$(this).addClass("highlighted");
		}
	});

	$(".button").on("mouseleave", function() {
		$(this).removeClass("highlighted");
	});

	$(".answers").on("click", ".button", function() {
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
	});

	$("#prevButton").on("click", function() {
		if (curQuestion != 0) {
			loadQuestion(-1);
		}
	});

	$("#nextButton").on("click", function() {
		if (curQuestion != length-1) {
			loadQuestion(1);
		}
	});

});



var generateQuiz = function( answers ) {
	// answers is a JSON object with questions in the keys and answers 
	// in the values. This function returns an array of questions,
	// where each question is an object with a question as the key, and
	// and an array of the correct answer and three incorrect answers 
	// as the value.

	var countries = Object.keys( answers );
	length = countries.length;

	console.log(answers);

	for (var country in answers) {
		var capital = answers[country];
		var correct = Math.floor(Math.random()*4);
		var answerSet = {};
		for (i = 0; i < 4; i++) {
			var ans = "";
			if (i === correct) {
				ans = capital;
			} else {
				ans = answers[countries[Math.floor(Math.random()*length)]];
				while (ans === capital) {
					ans = answers[countries[Math.floor(Math.random()*length)]];
				}
			}
			answerSet[i] = ans;
		}
		quiz[country] = answerSet;
	}
};

var loadQuestion = function( questionDelta ) {
	// check corner cases (disable buttons accordingly)

	// store answer
	var questions = Object.keys(quiz);
	var curCountry = questions[curQuestion];
	userAnswers[curCountry] = $(".selected").text();
	// deselect answer button
	$(".selected").removeClass("selected");
	// set new question text
	curQuestion = curQuestion + questionDelta;
	curCountry = questions[curQuestion];
	$(".question").text("What is the capital of " + questions[curQuestion]);
	// set new answer text
	$("#answer1").text(quiz[curCountry][0]);
	$("#answer2").text(quiz[curCountry][1]);
	$("#answer3").text(quiz[curCountry][2]);
	$("#answer4").text(quiz[curCountry][3]);
	// if question has been answered, reload that answer
	if (quiz[curCountry][0] === userAnswers[curCountry])
		$("#answer1").addClass("selected");
	if (quiz[curCountry][1] === userAnswers[curCountry]) 
		$("#answer2").addClass("selected");
	if (quiz[curCountry][2] === userAnswers[curCountry]) 
		$("#answer3").addClass("selected");
	if (quiz[curCountry][3] === userAnswers[curCountry]) 
		$("#answer4").addClass("selected");
};

