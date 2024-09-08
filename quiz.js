function populateSchools() {
    const schoolDropdown = document.getElementById('schoolDropdown');
    const selectedSchoolId = localStorage.getItem('selectedSchoolId'); // Retrieve the selected school ID from local storage
    const selectedStudentId = localStorage.getItem('selectedStudentId'); // Retrieve the selected student ID from local storage
    const schools = JSON.parse(localStorage.getItem('schools')) || []; // Retrieve schools from local storage

    // Clear existing options in the school dropdown
    schoolDropdown.innerHTML = '<option value="">--Select School--</option>';

    if (schools.length === 0) {
        console.log('No schools found in local storage.');
        return;
    }

    schools.forEach(school => {
        const option = document.createElement('option');
        option.value = school.name; // Use school name for value
        option.textContent = school.name; // Display school name
        schoolDropdown.appendChild(option); // Append option to the school dropdown

        // If the school matches the selected school, preselect it
        if (school.name === selectedSchoolId) {
            option.selected = true;
            populateStudents(school.name); // Populate students for the selected school
        }
    });

    // Listen for school change and populate students
    schoolDropdown.addEventListener('change', function () {
        const selectedSchool = schoolDropdown.value;
        localStorage.setItem('selectedSchoolId', selectedSchool); // Save the selected school ID
        populateStudents(selectedSchool); // Populate students for the newly selected school
    });
}

function populateStudents(schoolName) {
    const studentDropdown = document.getElementById('studentDropdown');
    const selectedStudentId = localStorage.getItem('selectedStudentId'); // Retrieve the selected student ID from local storage
    const students = JSON.parse(localStorage.getItem('students')) || []; // Retrieve students from local storage

    // Clear existing options in the student dropdown
    studentDropdown.innerHTML = '<option value="">--Select Student--</option>';

    // Filter students by the selected school
    const filteredStudents = students.filter(student => student.school === schoolName);

    if (filteredStudents.length === 0) {
        console.log(`No students found for school: ${schoolName}`);
    }

    filteredStudents.forEach(student => {
        const option = document.createElement('option');
        option.value = student.name; // Use student name for value
        option.textContent = student.name; // Display student name
        studentDropdown.appendChild(option); // Append option to the student dropdown

        // Preselect the student if it matches the saved ID
        if (student.name === selectedStudentId) {
            option.selected = true;
        }
    });

    // Listen for student change and store the selected student in local storage
    studentDropdown.addEventListener('change', function () {
        const selectedStudent = studentDropdown.value;
        localStorage.setItem('selectedStudentId', selectedStudent); // Save the selected student ID
    });
}

// Call the function to populate schools on page load
window.onload = populateSchools;

function startQuiz() {
    const schoolName = document.getElementById("schoolDropdown").value; // Get selected school
    const studentName = document.getElementById("studentDropdown").value; // Get selected student

    localStorage.setItem("selectedSchool", schoolName); // Store selected school in localStorage
    localStorage.setItem("selectedStudent", studentName); // Store selected student in localStorage

    window.location.href = 'mainQuiz.html'; // Redirect to mainQuiz.html
}