// Get references to the form and display area
var Resume1 = document.getElementById('resume-form');
var resume2 = document.getElementById('resume-display');
var shareableLinkContainer3 = document.getElementById('shareable-link-container');
var shareableLinkElement4 = document.getElementById('shareable-link');
var downloadPdfButton5 = document.getElementById('download-pdf');
// Handle form submission
Resume1.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page reload
    // Collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('Name').value;
    var email = document.getElementById('Email').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    var phone = document.getElementById('Phone').value;
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally 
    // Generate the Resume Content Dynamically
    var resumeHTML = "\n    <h2><b>Editable Resume</b></h2>\n\n    <h3>Personal Information</h3>\n    <p><b>Name:</b><span contenteditable=\"true\">".concat(name, "</span></p>\n    <p><b>Email:</b><span contenteditable=\"true\">").concat(email, "</span></p>\n    <p><b>Phone:</b><span contenteditable=\"true\">").concat(phone, "</span></p>\n\n    <h3>Education</h3>\n    <p contenteditable=\"true\">").concat(education, "</p>\n\n    <h3>Experience</h3>\n    <p contenteditable=\"true\">").concat(experience, "</p>\n\n    <h3>Skills</h3>\n    <p contenteditable=\"true\">").concat(skills, "</p>\n  ");
    // Display the Generated Resume
    if (resume2) {
        resume2.innerHTML = resumeHTML;
    }
    else {
        console.error("The resume display element is missing.");
    }
    // Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // Display the shareable Link
    shareableLinkContainer3.style.display = 'block';
    shareableLinkElement4.href = shareableURL;
    shareableLinkElement4.textContent = shareableURL;
});
// Handle PDF Download
downloadPdfButton5.addEventListener('click', function () {
    window.print();
}); // This will open the print dialog and allow the user to save as PDF
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('Name').value = resumeData.name;
            document.getElementById('Email').value = resumeData.email;
            document.getElementById('Phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
