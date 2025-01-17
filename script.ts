// Get references to the form and display area
const Resume1 = document.getElementById('resume-form') as HTMLFormElement;
const resume2 = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer3 = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement4 = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton5 = document.getElementById('download-pdf') as HTMLButtonElement;

// Handle form submission
Resume1.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // prevent page reload

  // Collect input values
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const name = (document.getElementById('Name') as HTMLInputElement).value;
  const email = (document.getElementById('Email') as HTMLInputElement).value;
  const education = (document.getElementById('education') as HTMLTextAreaElement).value;
  const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
  const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
  const phone = (document.getElementById('Phone') as HTMLInputElement).value;

  // Save form data in localStorage with the username as the key
  const resumeData = {
    name,
    email,
    phone,
    education,
    experience,
    skills,
  };
  localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally 

  // Generate the Resume Content Dynamically
  const resumeHTML = `
    <h2><b>Editable Resume</b></h2>

    <h3>Personal Information</h3>
    <p><b>Name:</b><span contenteditable="true">${name}</span></p>
    <p><b>Email:</b><span contenteditable="true">${email}</span></p>
    <p><b>Phone:</b><span contenteditable="true">${phone}</span></p>

    <h3>Education</h3>
    <p contenteditable="true">${education}</p>

    <h3>Experience</h3>
    <p contenteditable="true">${experience}</p>

    <h3>Skills</h3>
    <p contenteditable="true">${skills}</p>
  `;

  // Display the Generated Resume
  if (resume2) {
    resume2.innerHTML = resumeHTML;
  } else {
    console.error("The resume display element is missing.");
  }

  // Generate a shareable URL with the username only
  const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
  // Display the shareable Link
  shareableLinkContainer3.style.display = 'block';
  shareableLinkElement4.href = shareableURL;
  shareableLinkElement4.textContent = shareableURL;
});

// Handle PDF Download
downloadPdfButton5.addEventListener('click', () => {
  window.print();
}); // This will open the print dialog and allow the user to save as PDF

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  if (username) {
    // Autofill form if data is found in localStorage
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);
      (document.getElementById('username') as HTMLInputElement).value = username;
      (document.getElementById('Name') as HTMLInputElement).value = resumeData.name;
      (document.getElementById('Email') as HTMLInputElement).value = resumeData.email;
      (document.getElementById('Phone') as HTMLInputElement).value = resumeData.phone;
      (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
      (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
      (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
    }
  }
});
