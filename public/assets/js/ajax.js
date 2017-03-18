var questions = [
	{
		question: "What is the button sequence of the infamous Contra Code?",
		answers: ["Up, Up, Down, Down, Left, Right, Left, Right, B, A, Select, Start", "Up, Up, Down, Down", "A, B, B, A, A", "Left, Right, Left, Right, Up, Up, Down, Down, B, A, Start"],
		correctAnswer: 0
	},
	{
		question: "Who is Sonic the Hedgehog's Sidekick in the second game?",
		answers: ["Shadow", "Amy", "Tails", "Knuckles"],
		correctAnswer: 2
	},
	{
		question: "Who is Megaman\'s main enemy?",
		answers: ["Dr. Cossack", "Dr. Wily", "Dr. Robotnik", "Dr. Phil"],
		correctAnswer: 1
	},
	{
		question: "Who did Ryu train with in Street Fighter?",
		answers: ["Ken", "Sagat", "Sakura", "Hibiki Dan"],
		correctAnswer: 0
	},
	{
		question: "What are the names of the brothers in Double Dragon?",
		answers: ["Billy and Chuck", "Mario and Luigi", "Billy and Jimmy", "Cheech and Chong"],
		correctAnswer: 2
	},
	{
		question: "How do you beat Psycho Mantis from Metal Gear Solid?",
		answers: ["Use the Second Controller", "Study his Patterns", "Use the Game Manual", "Wait for Meryl to Fight Back"],
		correctAnswer: 0
	},
	{
		question: "What is the other name of the \'Golden Power\' in the Legend of Zelda?",
		answers: ["Crown Jewels", "Master Sword", "Faberge Eggs", "Triforce"],
		correctAnswer: 3
	},
	{
		question: "What is Mike Haggar\'s day job in Final Fight?",
		answers: ["Construction Worker", "WWE wrestler", "Dentist", "Mayor"],
		correctAnswer: 3
	},
	{
		question: "Who is the tragic heroine of Final Fantasy 7?",
		answers: ["Aeris", "Rinoa", "Tifa", "Celes"],
		correctAnswer: 0
	},
	{
		question: "Which of these pokemon are not an option during the beginning of Pokemon Red/Blue?",
		answers: ["Squirtle", "Pikachu", "Bulbasaur", "Charmander"],
		correctAnswer: 1
	},
	{
		question: "Which occupation did Mario not perform in a videogame?",
		answers: ["Doctor", "Plumber", "Painter", "Kart Driver"],
		correctAnswer: 1
	},
	{
		question: "Who is the opponent for the dream match in Punchout?",
		answers: ["Evander Holyfield", "George Foreman", "Mike Tyson", "Muhammad Ali"],
		correctAnswer: 2
	},
	{
		question: "What are the names of Pac-man enemies?",
		answers: ["Leo, Mike, Raph, and Donatello", "Moe, Larry, and Curly", "Alvin, Simon, and Theodore", "Blinky, Pinky, Inky, and Clyde"],
		correctAnswer: 3
	},
		{
		question: "What game caused a stir to add parental rating for video game?",
		answers: ["Mortal Kombat", "Doom", "Grand Theft Auto", "Killer Instinct"],
		correctAnswer: 0
	},

]

var currentQuestionIndex = 0;
var currentQuestion;
var time = 15*1000;
var timer;
var score = 0;
var data = 0;
$('#time').text(time/1000);

function countDown(){
	timer = setInterval(function(){
		time -= 1000;
		$('#time').text(time/1000);

		if (time == 0){
			time = 15 * 1000;
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
				// $("#displaystatus").html("<p>winner winner winner!!</p>");
				$("#container").empty();
				$("#container").html("<p>Finito!</p>");
				$('#leaderboard').show();
				$('#scoreboard').show();
				$('.players').show();
				$('#subwrapper2').show();
			}
		}
	}, 1 * 1000);
}

$('#container').hide();
$('#subwrapper2').hide();

$('#startGame').on('click', function(){
	countDown();
	$('#startGame').hide();
	$('#container').show();
	$('#leaderboard').hide();
	$('#scoreboard').hide();
	$('.players').hide();
	$('#subwrapper').hide();
	$('#subwrapper2').hide();

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
		// $("#displaystatus").html("<p>winner winner winner!!</p>");
		score = score + 10;
	}else{
		// alert('you are a weiner weiner weiner');
		// $("#displaystatus").html("<p>loser loser loser!!</p>");
		score = score - 5;
	}

	currentQuestionIndex++;

	$('#score').text(score);

	if (currentQuestionIndex <= questions.length - 1){
		loadQuestion();
		time = 1000 * 15;
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
		$('#subwrapper2').show();
		$('#startGame').show();
		$("#container").empty();
		$("#container").html("<p>Finito!</p>");
		$('#leaderboard').show();
		$('#scoreboard').show();
		$('.players').show();
	}
})

