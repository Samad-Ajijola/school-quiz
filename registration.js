const registrationDeadline = new Date('2024-09-28 T00:00:00');

function registerSchool() {
    const schoolName = document.getElementById('schoolName').value.trim(); // Trim whitespace
    const now = new Date();

    if (now > registrationDeadline) {
        document.getElementById('registrationMessage').innerText = "Registration closed. Fine of N5,000 applies.";
        return;
    }

    // Retrieve existing schools from local storage
    let schools = JSON.parse(localStorage.getItem('schools')) || [];

    // Check if the school is already registered
    if (schools.some(s => s.name === schoolName)) { // Update to check for object property
        document.getElementById('registrationMessage').innerText = "This school is already registered.";
        return;
    }

    // Add the new school as an object to the array
    schools.push({ name: schoolName }); // Store as an object
    localStorage.setItem('schools', JSON.stringify(schools)); // Store updated array in local storage

    document.getElementById('registrationMessage').innerText = `${schoolName} registered successfully!`;
    document.getElementById('studentRegistration').style.display = 'block';

    // Update the display of registered schools immediately
    displayRegisteredSchools(); // Update the display in the modal
    closeModal('registerSchoolModal'); // Close the modal after registration
}

function registerStudent() {
    const studentName = document.getElementById('studentName').value.trim();
    const schoolDropdown = document.getElementById('schoolDropdown');
    const selectedSchool = schoolDropdown.value.trim(); // Get the selected school from the dropdown

    if (!selectedSchool) {
        document.getElementById('studentRegistrationMessage').innerText = "Please select a registered school.";
        return;
    }

    if (!studentName) {
        document.getElementById('studentRegistrationMessage').innerText = "Please enter a student name.";
        return;
    }

    // Retrieve students from local storage or initialize an empty array
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Check if the student is already registered under the same school
    const isStudentRegistered = students.some(student => student.name === studentName && student.school === selectedSchool);

    if (isStudentRegistered) {
        document.getElementById('studentRegistrationMessage').innerText = `${studentName} is already registered in ${selectedSchool}.`;
        return;
    }

    // Register the student with the selected school
    students.push({ name: studentName, school: selectedSchool });
    localStorage.setItem('students', JSON.stringify(students)); // Save updated students to local storage

    document.getElementById('studentRegistrationMessage').innerText = `${studentName} registered successfully to ${selectedSchool}!`;
}


function displayRegisteredSchools() {
    const schools = JSON.parse(localStorage.getItem('schools')) || [];
    const registeredSchoolDisplay = document.getElementById('registeredSchoolDisplay');
    const schoolDropdown = document.getElementById('schoolDropdown');

    registeredSchoolDisplay.innerHTML = ''; // Clear previous display
    schoolDropdown.innerHTML = '<option value="">Select Registered School</option>'; // Reset dropdown

    // Retrieve students from local storage
    const students = JSON.parse(localStorage.getItem('students')) || [];

    schools.forEach(school => {
        // Count the number of students associated with the current school
        const studentCount = students.filter(student => student.school === school.name).length; // Access object property

        // Display in the registered schools list
        const schoolItem = document.createElement('div');
        schoolItem.className = 'bg-gray-100 border border-gray-300 rounded p-2 shadow-sm';
        schoolItem.innerText = `${school.name} (${studentCount} students)`; // Access object property
        registeredSchoolDisplay.appendChild(schoolItem);

        // Populate dropdown
        const option = document.createElement('option');
        option.value = school.name; // Access object property
        option.innerText = school.name; // Access object property
        schoolDropdown.appendChild(option);
    });
}

// Call the function when the page loads
window.onload = displayRegisteredSchools;


 // Function to open modal
 function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    displayRegisteredSchools(); // Populate dropdown for other modals
}

// Function to close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Function to toggle visibility of registered schools
function toggleRegisteredSchools() {
    const container = document.getElementById('registeredSchoolContainer');
    const button = document.getElementById('toggleSchoolsButton');
    if (container.classList.contains('hidden')) {
        container.classList.remove('hidden');
        button.innerText = 'Hide Registered Schools';
    } else {
        container.classList.add('hidden');
        button.innerText = 'Show Registered Schools';
    }
}

// Function to view results from local storage
function viewResults() {
    const results = JSON.parse(localStorage.getItem("quizResults")) || [];
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsList.innerHTML = '<p>No results found.</p>';
    } else {
        results.forEach((result, index) => {
            const resultItem = document.createElement('p');
            resultItem.innerText = `Attempt ${index + 1}: ${result.studentName} from ${result.schoolName} scored ${result.percentage}% (${result.score} out of 10).`;
            resultsList.appendChild(resultItem);
        });
    }

    openModal('resultsModal'); // Show the results modal
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none";
        }
    }
}

// Store past winners in local storage on page load
window.onload = function() {
    const pastWinners = [
        { year: 2023, school: "Greenwood High", winner: "John Doe" },
        { year: 2022, school: "Riverside School", winner: "Emily Johnson" },
        { year: 2021, school: "Maple Leaf School", winner: "Sarah Davis" },
        { year: 2020, school: "Pine Valley School", winner: "Jessica Taylor" }
    ];
    localStorage.setItem('pastWinners', JSON.stringify(pastWinners));
};

// Function to retrieve and display past winners in a table
function retrieveWinners() {
    const winners = JSON.parse(localStorage.getItem('pastWinners')) || [];
    const pWinners = document.getElementById('pWinners');
    pWinners.innerHTML = ''; // Clear previous results

    if (winners.length === 0) {
        pWinners.innerHTML = '<tr><td colspan="3" class="border border-gray-300 p-2 text-center">No past winners found.</td></tr>';
    } else {
        winners.forEach(winner => {
            const winnerRow = document.createElement('tr');
            winnerRow.innerHTML = `
                <td class="border border-gray-300 p-2">${winner.year}</td>
                <td class="border border-gray-300 p-2">${winner.school}</td>
                <td class="border border-gray-300 p-2">${winner.winner}</td>
            `;
            pWinners.appendChild(winnerRow);
        });
    }
    openModal('pastWinnersModal'); // Open the modal to display results
}