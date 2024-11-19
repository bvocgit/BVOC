const insertForm = document.getElementById('insert-form');
const showBtn = document.getElementById('show-btn');
const deleteBtn = document.getElementById('delete-btn');
const updateBtn = document.getElementById('update-btn');
const studentList = document.getElementById('student-list');


insertForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rollNo = document.getElementById('roll_no').value;
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;
    fetch('/insert', {
        method: 'GET',
        params: {
            roll_no: rollNo,
            name: name,
            course: course
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});

showBtn.addEventListener('click', () => {
    fetch('/show')
    .then(response => response.json())
    .then(data => {
        studentList.innerHTML = '';
        data.forEach(student => {
            const studentHTML = `
                <div class="student">
                    <h2>${student.name}</h2>
                    <p>Roll No: ${student.roll_no}</p>
                    <p>Course: ${student.course}</p>
                </div>
            `;
            studentList.innerHTML += studentHTML;
        });
    })
    .catch(error => console.error(error));
});

deleteBtn.addEventListener('click', () => {
    fetch('/delete')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});

updateBtn.addEventListener('click', () => {
    fetch('/update')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});