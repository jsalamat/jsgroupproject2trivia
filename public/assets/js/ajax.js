var questions = [
	{
		question: "What's Robbie Chance's favorite vacation spot?",
		answers: ["Gettysburg", "Pittsburgh", "Rothensburgh", "his couch"],
		correctAnswer: 3
	},
	{
		question: "What sport did Richie Rich play when he grew up?",
		answers: ["football", "fencing", "ballet", "basketball"],
		correctAnswer: 3
	},
	{
		question: "What did Sheri Pie do before the bootcamp?",
		answers: ["teacher", "hunter", "gatherer", "graphic designer"],
		correctAnswer: 3
	}
]

var currentQuestionIndex = 0;
var currentQuestion;
var time = 7*1000;
var timer;
var score = 0;
var data = 0;
$('#time').text(time/1000);

function countDown(){
	timer = setInterval(function(){
		time -= 1000;
		$('#time').text(time/1000);

		if (time == 0){
			time = 7 * 1000;
			$('#time').text(time/1000);

			currentQuestionIndex++;

			if (currentQuestionIndex <= questions.length - 1){
				loadQuestion();
			}else{

				data = {
					total_score: score,
				}

				$.ajax({
					url: "/scores/create", 
					method: "POST",
					data: data, 
				}).done(function(response){
					window.location = "/scores"
				});

				clearInterval(timer);
				// alert('put a fork in it');
				$("#displaystatus").html("<p>winner winner winner!!</p>");
				$("#container").empty();
				$("#container").html("<p>Finito!</p>");
				$('#leaderboard').show();
				$('#scoreboard').show();
				$('.players').show();
			}
		}
	}, 1 * 1000);
}

$('#container').hide();

$('#startGame').on('click', function(){
	countDown();
	$('#startGame').hide();
	$('#container').show();
	$('#leaderboard').hide();
	$('#scoreboard').hide();
	$('.players').hide();

})




function loadQuestion(){

	currentQuestion = questions[currentQuestionIndex];

	$('#displayQuestion').html("");

	var question = $('<div>').text(currentQuestion.question);
	$('#displayQuestion').append(question);

	for (var i=0; i<currentQuestion.answers.length; i++){
		var answerButton = $("<button>").attr('class', 'answer').attr('data-key', i).text(currentQuestion.answers[i]);
		$('#displayQuestion').append(answerButton);
	}
}

loadQuestion();

$(document).on('click', '.answer', function(){
	if ($(this).data('key') == currentQuestion.correctAnswer){
		// alert('winner winner winner!!');
		$("#displaystatus").html("<p>winner winner winner!!</p>");
		score = score + 10;
	}else{
		// alert('you are a weiner weiner weiner');
		$("#displaystatus").html("<p>loser loser loser!!</p>");
		score = score - 5;
	}

	currentQuestionIndex++;

	$('#score').text(score);

	if (currentQuestionIndex <= questions.length - 1){
		loadQuestion();
		time = 1000 * 7;
		$('#time').text(time/1000);
	}else{

		data = {
			total_score: score,
		}

		$.ajax({
			url: "/scores/create", 
			method: "POST",
			data: data, 
		}).done(function(response){
			window.location = "/scores"
		});

		clearInterval(timer);
		$('#startGame').show();
		$("#container").empty();
		$("#container").html("<p>Finito!</p>");
		$('#leaderboard').show();
		$('#scoreboard').show();
		$('.players').show();
	}
})

