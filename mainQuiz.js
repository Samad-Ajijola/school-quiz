const schoolName = "Selected School Name"; 
const studentName = "Selected Student Name"; 
document.addEventListener("DOMContentLoaded", () => {
    const schoolName = localStorage.getItem("selectedSchool"); // Retrieve school name from localStorage
    const studentName = localStorage.getItem("selectedStudent"); // Retrieve student name from localStorage

    document.getElementById("school-name").innerText = schoolName || "No school selected"; // Display school name
    document.getElementById("student-name").innerText = studentName || "No student selected"; // Display student name

    // Check if the student has already taken the quiz
    const results = JSON.parse(localStorage.getItem("quizResults")) || [];
    const hasTakenQuiz = results.some(result => result.studentName === studentName && result.schoolName === schoolName);

    if (hasTakenQuiz) {
        // If the student has already taken the quiz, show a message and disable the quiz
        alert("You have already taken the quiz. You cannot take it again.");
        return; // Exit the script to prevent the quiz from starting
    }

    // Quiz questions and answers with options
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Mars"
        },
        {
            question: "Who wrote the play 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
            answer: "William Shakespeare"
        },
        {
            question: "What is the largest mammal in the world?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
            answer: "Blue Whale"
        },
        {
            question: "In which year did the Titanic sink?",
            options: ["1905", "1912", "1918", "1923"],
            answer: "1912"
        },
        {
            question: "What is the smallest country in the world?",
            options: ["Vatican City", "Monaco", "Nauru", "Malta"],
            answer: "Vatican City"
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            options: ["Oxygen", "Gold", "Osmium", "Oganesson"],
            answer: "Oxygen"
        },
        {
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Iron", "Diamond", "Quartz"],
            answer: "Diamond"
        },
        {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: "Pacific Ocean"
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
            answer: "Leonardo da Vinci"
        }
    ];

    shuffleArray(questions); // Shuffle the questions array

    let currentQuestionIndex = 0; // Track the current question index
    let score = 0; // Track the score
    let timeLeft = 120; // 2 minutes in seconds
    const timerElement = document.getElementById('timer'); // Get the timer element

    // Start the timer
    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer
            showResults(); // Show results when time is up
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.innerText = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Update timer display
        }
    }, 1000);

    // Get the quiz container
    const quizContainer = document.getElementById('quiz-container');

    // Function to display the current question
    function displayQuestion() {
        quizContainer.innerHTML = ''; // Clear previous question

        const q = questions[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.className = 'question';

        const questionText = document.createElement('p');
        questionText.innerText = `${currentQuestionIndex + 1}. ${q.question}`;
        questionElement.appendChild(questionText);

        q.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.innerHTML = `<input type="radio" name="question${currentQuestionIndex}" value="${option}" onclick="checkAnswer('${option}', '${q.answer}')"> ${option}`;
            questionElement.appendChild(optionElement);
        });

        quizContainer.appendChild(questionElement); // Append to the quiz-container
    }

    // Function to check the answer and move to the next question
    window.checkAnswer = function(selectedAnswer, correctAnswer) {
        if (selectedAnswer === correctAnswer) {
            score++; // Increment score if the answer is correct
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion(); // Display the next question
        } else {
            clearInterval(timerInterval); // Stop the timer
            showResults(); // Show results when the quiz is completed
        }
    };

    // Function to show the results in a modal
    function showResults() {
        const percentage = (score / questions.length) * 100; // Calculate percentage
        const resultText = document.getElementById('resultText');

        // Create result object
        const result = {
            studentName: localStorage.getItem("selectedStudent"),
            schoolName: localStorage.getItem("selectedSchool"),
            score: score,
            percentage: percentage.toFixed(2)
        };

        // Save updated results back to local storage
        let results = JSON.parse(localStorage.getItem("quizResults")) || [];
        results.push(result); // Add the new result to the array
        localStorage.setItem("quizResults", JSON.stringify(results));

        // Display result in modal
        resultText.innerText = `Results for ${result.studentName} from ${result.schoolName}:\nYou scored ${result.percentage}% (${score} out of ${questions.length}).`; // Display percentage and names
        document.getElementById('resultModal').style.display = "block"; // Show the modal

        // Reload the page after a delay (e.g., 3 seconds)
        setTimeout(() => {
            location.reload(); // Reload the page
        }, 3000); // 3000 milliseconds = 3 seconds
    }

    // Close the modal
    document.getElementById('closeModal').onclick = function() {
        document.getElementById('resultModal').style.display = "none"; // Hide the modal
    };

    // Initial call to display the first question
    displayQuestion();
});

// Function to start the quiz
function startQuiz() {
    const schoolName = document.getElementById("schoolDropdown").value; // Get selected school
    const studentName = document.getElementById("studentDropdown").value; // Get selected student

    localStorage.setItem("selectedSchool", schoolName); // Store selected school in localStorage
    localStorage.setItem("selectedStudent", studentName); // Store selected student in localStorage

    window.location.href = 'mainQuiz.html'; // Redirect to mainQuiz.html
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}