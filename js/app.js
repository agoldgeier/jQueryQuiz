
var quiz = {}; // {"country" : {0: "capital 1", 1: "capital 1", ...},...}
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
		var questions = Object.keys(quiz);
		userAnswers[questions[curQuestion]] = $(this).text();
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

	$("#endQuiz").on("click", function() {
		// generate score
		curCorrect = 0;
		for (var country in userAnswers) {
			if (userAnswers[country] === answerKey[country]) {
				curCorrect++;
			}
		}
		// update score
		$("#score").text(curCorrect + "/" + Object.keys(userAnswers).length);
		$(".results-container").show();
		// remove full results
		$(".results-list").children().remove();
	});

	$("#tryAgain").on("click", function() {
		$(".results-container").hide();
		curCorrect = 0;
		curQuestion = 0;
		userAnswers = {};
		generateQuiz( answerKey );
		loadQuestion(0);
	});

	$("#viewAnswers").on("click", function() {
		viewFullAnswers();
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
	// store answer
	var questions = Object.keys(quiz);
	var curCountry = questions[curQuestion];
	// deselect answer button
	$(".selected").removeClass("selected");
	// load new question
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
	// disable/enable nav buttons
	if (curQuestion === 0)
		$("#prevButton").hide();
	else
		$("#prevButton").show();
	if (curQuestion === length-1)
		$("#nextButton").hide();
	else
		$("#nextButton").show();
};

var viewFullAnswers = function() {
	for (var country in userAnswers) {
		// create new submittedAnswer object
		var submittedAnswer = $("<li class='result'>");
		var q = $("<div class='result-question'>");
		q.text(country);

		var a = $("<div class='result-answer-container'>");
		var row1 = $("<div class='result-answer-row'>");
		var a1 = $("<div class='result-answer'>");
		var a2 = $("<div class='result-answer'>");
		var row2 = $("<div class='result-answer-row'>");
		var a3 = $("<div class='result-answer'>");
		var a4 = $("<div class='result-answer'>");
		a1.text(quiz[country][0]);
		a2.text(quiz[country][1]);
		a3.text(quiz[country][2]);
		a4.text(quiz[country][3]);

		var arr = [a1, a2, a3, a4];

		for (var i in arr) {
			var ans = arr[i];
			if (ans.text() === userAnswers[country]) {
				ans.addClass("incorrect");
			}
			if (ans.text() === answerKey[country]) {
				ans.removeClass("incorrect");
				ans.addClass("correct");
			}
		}

		row1.append(a1);
		row1.append(a2);
		row2.append(a3);
		row2.append(a4);

		a.append(row1);
		a.append(row2);

		submittedAnswer.append(q);
		submittedAnswer.append(a);

		//
		$(".results-list").append(submittedAnswer);

	}
	$(".results-list").show();
};

