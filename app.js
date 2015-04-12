
alert("sup");

$(document).ready( function () {
	alert("ey");

	var quiz = generateQuiz();
	var numQuestions = quiz.length;

	$(.answer).mouseenter( function() {
		alert("yo");
		$(this).addClass("highlighted");
	});

	$(.answer).on("mouseleave", function() {
		$(this).removeClass("highlighted");
	});

};

var generateQuiz = function( answers ) {
	// answers is a JSON object with questions in the keys and answers 
	// in the values. This function returns an array of questions,
	// where each question is an object with a question as the key, and
	// and an array of the correct answer and three incorrect answers 
	// as the value.
};

window.onload = function() {
	alert("yo");
};

