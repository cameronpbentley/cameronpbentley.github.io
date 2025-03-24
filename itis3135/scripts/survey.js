// wait for the page to fully load before doing anything
document.addEventListener('DOMContentLoaded', function() {
    // grab all the elements we'll need
    const form = document.getElementById('intro-form');
    const formContainer = document.getElementById('form-container');
    const resultContainer = document.getElementById('result-container');
    const coursesContainer = document.getElementById('course-inputs');
    const addCourseBtn = document.getElementById('add-course');
    const resetLink = document.getElementById('reset-link');
    
    // keep track of how many course fields we have
    let courseCount = 1;

    // this function creates the final intro page from the form data
    function displayResult(data, courses) {
        // swap the form for the results
        formContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        
        // build up the html for the results page
        let resultHTML = `
            <h2>${data.name} | ${data.mascot}</h2>
            <figure>
                ${data.image ? `<img src="${URL.createObjectURL(data.image)}" alt="${data.mascot}" width="200">` : ''}
                <figcaption>${data['image-caption']}</figcaption>
            </figure>
            
            <ul>
                <li><strong>personal background:</strong> ${data['personal-bg']}</li>
                <li><strong>professional background:</strong> ${data['professional-bg']}</li>
                <li><strong>academic background:</strong> ${data['academic-bg']}</li>
                <li><strong>background in web development:</strong> ${data['web-bg']}</li>
                <li><strong>primary computer platform:</strong> ${data.platform}</li>
                <li><strong>courses i'm taking:</strong>
                    <ul>
        `;
        
        // add each course to the list
        courses.forEach(function(course) {
            resultHTML += `<li><strong>${course}</strong></li>`;
        });
        
        // finish up the html structure
        resultHTML += `
                    </ul>
                </li>
        `;
        
        // add the optional fields if they exist
        if (data['funny-thing']) {
            resultHTML += `<li><strong>funny/interesting thing about me:</strong> ${data['funny-thing']}</li>`;
        }
        
        if (data['anything-else']) {
            resultHTML += `<li><strong>anything else?</strong> ${data['anything-else']}</li>`;
        }
        
        // add the reset link and close everything up
        resultHTML += `
            </ul>
            <a href="#" id="reset-link">reset form</a>
        `;
        
        // put our shiny new html on the page
        resultContainer.innerHTML = resultHTML;
        
        // make sure the reset link works
        document.getElementById('reset-link').addEventListener('click', function(e) {
            e.preventDefault();
            resultContainer.style.display = 'none';
            formContainer.style.display = 'block';
            form.reset();
        });
    }

    // let users add more course fields
    addCourseBtn.addEventListener('click', function() {
        courseCount++;
        const courseDiv = document.createElement('div');
        courseDiv.innerHTML = `
            <input type="text" class="course" name="course${courseCount}" required>
            <button type="button" class="delete-course">delete</button>
        `;
        coursesContainer.appendChild(courseDiv);
        
        // make sure the new delete button works
        courseDiv.querySelector('.delete-course').addEventListener('click', function() {
            coursesContainer.removeChild(courseDiv);
        });
    });

    // handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // make sure everything is filled out
        if (!form.checkValidity()) {
            alert('oops! please fill out all the required fields correctly.');
            return;
        }
        
        // collect all the form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        });
        
        // gather all the courses
        const courses = [];
        document.querySelectorAll('.course').forEach(function(course) {
            if (course.value.trim() !== '') {
                courses.push(course.value);
            }
        });
        
        // show the final result
        displayResult(data, courses);
    });

    // handle form reset
    form.addEventListener('reset', function() {
        // go back to just one course field
        coursesContainer.innerHTML = `
            <div>
                <input type="text" class="course" name="course1" required value="ITIS 3135 - Web App Design and Development">
                <button type="button" class="delete-course">delete</button>
            </div>
        `;
        courseCount = 1;
    });

    // make sure the reset link works
    if (resetLink) {
        resetLink.addEventListener('click', function(e) {
            e.preventDefault();
            resultContainer.style.display = 'none';
            formContainer.style.display = 'block';
            form.reset();
        });
    }

    // set up the first delete button
    const initialDeleteBtn = document.querySelector('.delete-course');
    if (initialDeleteBtn) {
        initialDeleteBtn.addEventListener('click', function() {
            if (document.querySelectorAll('.course').length > 1) {
                coursesContainer.removeChild(this.parentNode);
            }
        });
    }
});