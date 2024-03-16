let loggedInTeacher = null;
let teachers = [
    { username: "teacher1", password: "pass1", availability: [] },
    { username: "teacher2", password: "pass2", availability: [] },
    { username: "teacher3", password: "pass3", availability: [] },
    { username: "teacher4", password: "pass4", availability: [] },
    { username: "teacher5", password: "pass5", availability: [] },
    { username: "teacher6", password: "pass6", availability: [] },
    { username: "First year coordinator", password: "pass7", availability: [] },
    { username: "srinivas nekkar", password: "pass8", availability: [] },
    { username: "sonia lobo", password: "pass9", availability: [] },
    { username: "sudeeksha s pai", password: "pass10", availability: [] },
    { username: "sunil kumar aithal", password: "pass11", availability: [] },
    { username: "srikanth bhat", password: "pass12", availability: [] },
    { username: "krishnaprasad rao", password: "pass13", availability: [] },
    { username: "santhosh s", password: "pass14", availability: [] },
    { username: "rajashree", password: "pass15", availability: [] },
    { username: "anitha d bayar", password: "pass16", availability: [] },
    { username: "smitha g", password: "pass17", availability: [] },
    { username: "sharmila", password: "pass18", availability: [] },
    { username: "anjana pai", password: "pass19", availability: [] },
    { username: "ramakrishna bhat", password: "pass20", availability: [] }
]

function showLogin(userType) {
    document.getElementById('teacherLogin').style.display = (userType === 'teacher') ? 'block' : 'none';
    document.getElementById('studentSearch').style.display = (userType === 'student') ? 'block' : 'none';
}

function login(userType) {
    const username = document.getElementById(`${userType}Username`).value;
    const password = document.getElementById(`${userType}Password`).value;

    if (userType === 'teacher') {
        const teacher = teachers.find(t => t.username === username && t.password === password);
        if (teacher) {
            loggedInTeacher = teacher;
            document.getElementById('availabilityForm').style.display = 'block';
            document.getElementById('teacherAvailability').style.display = 'block';
            displayAvailability();
        } else {
            alert('Invalid credentials. Please try again.');
        }
    } else {
        alert('Student login logic goes here.'); // Add student login logic if needed
    }

    return false; // Prevent form submission
}

function displayAvailability() {
    const availabilityList = document.getElementById('availabilityList');
    availabilityList.innerHTML = '';

    if (loggedInTeacher) {
        loggedInTeacher.availability.forEach((time, index) => {
            const li = document.createElement('li');
            li.textContent = `${time} `;

            if (loggedInTeacher) {
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.onclick = () => removeAvailability(index);

                li.appendChild(removeButton);
            }

            availabilityList.appendChild(li);
        });
    }
}

function searchTeacher() {
    const searchInput = document.getElementById('searchTeacher').value.toLowerCase();
    const filteredTeachers = teachers.filter(teacher => teacher.username.toLowerCase().includes(searchInput));

    displayAvailableTeachers(filteredTeachers);
}

function displayAvailableTeachers(filteredTeachers) {
    const teacherList = document.getElementById('teacherList');
    teacherList.innerHTML = '';

    filteredTeachers.forEach(teacher => {
        teacherList.innerHTML += `<div>${teacher.username}: ${teacher.availability.join(', ')}</div>`;
    });
}

function removeAvailability(index) {
    if (!loggedInTeacher) {
        alert('Please log in as a teacher first.');
        return;
    }

    if (confirm('Are you sure you want to remove this availability?')) {
        loggedInTeacher.availability.splice(index, 1);
        displayAvailability();
    }
}

function removeHistory() {
    if (!loggedInTeacher) {
        alert('Please log in as a teacher first.');
        return;
    }

    if (confirm('Are you sure you want to remove your entire availability history?')) {
        loggedInTeacher.availability = [];
        displayAvailability();
    }
}

function logout() {
    loggedInTeacher = null;
    document.getElementById('availabilityForm').style.display = 'none';
    document.getElementById('teacherAvailability').style.display = 'none';
    document.getElementById('availabilityList').innerHTML = '';
}

function addAvailability() {
    const availabilityInput = document.getElementById('availability');
    const availability = availabilityInput.value.trim();

    if (loggedInTeacher) {
        if (availability) {
            loggedInTeacher.availability.push(availability);
            displayAvailability();
            availabilityInput.value = '';
        } else {
            alert('Please enter availability.');
        }
    } else {
        alert('Please log in as a teacher first.');
    }
}
// Function to save teacher availability to Local Storage
function saveAvailabilityToLocalStorage() {
    localStorage.setItem('teacherAvailability', JSON.stringify(teachers));
}

// Function to load teacher availability from Local Storage
function loadAvailabilityFromLocalStorage() {
    const availabilityData = localStorage.getItem('teacherAvailability');
    if (availabilityData) {
        teachers = JSON.parse(availabilityData);
    }
}

// Call this function to load availability when the page loads
loadAvailabilityFromLocalStorage();

// Call this function to save availability whenever changes are made
function addAvailability() {
    // Your existing code to add availability to the teacher object
    
    // Save to Local Storage
    saveAvailabilityToLocalStorage();
}



