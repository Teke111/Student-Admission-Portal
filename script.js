// Global variables
let currentStep = 1;
let completedSteps = [];
const totalSteps = 4;

// Form data object
let formData = {
  // Personal Details
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",

  // Academic History
  highSchoolName: "",
  graduationYear: "",
  gpa: "",
  satScore: "",
  actScore: "",
  previousCollege: "",
  intendedMajor: "",

  // Guardian Information
  guardianFirstName: "",
  guardianLastName: "",
  relationship: "",
  guardianPhone: "",
  guardianEmail: "",
  guardianAddress: "",
  emergencyContact: "",
  emergencyPhone: "",
};

// Step titles
const stepTitles = [
  "Personal Details",
  "Academic History",
  "Guardian Information",
  "Review & Submit",
];

// Initialize the form
document.addEventListener("DOMContentLoaded", function () {
  populateGraduationYears();
  loadSavedData();
  setupAutoSave();
  setupInputListeners();
  updateUI();
});

// Populate graduation years dropdown
function populateGraduationYears() {
  const select = document.getElementById("graduationYear");
  const currentYear = new Date().getFullYear();

  for (let i = -5; i < 5; i++) {
    const year = currentYear + i;
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    select.appendChild(option);
  }
}

// Load saved data from localStorage
function loadSavedData() {
  const savedData = localStorage.getItem("admissionFormData");
  const savedStep = localStorage.getItem("admissionCurrentStep");
  const savedCompletedSteps = localStorage.getItem("admissionCompletedSteps");

  if (savedData) {
    formData = { ...formData, ...JSON.parse(savedData) };
    populateFormFields();
  }

  if (savedStep) {
    currentStep = parseInt(savedStep);
  }

  if (savedCompletedSteps) {
    completedSteps = JSON.parse(savedCompletedSteps);
  }
}

// Populate form fields with saved data
function populateFormFields() {
  Object.keys(formData).forEach((key) => {
    const element = document.getElementById(key);
    if (element && formData[key]) {
      element.value = formData[key];
    }
  });
}

// Setup auto-save functionality
function setupAutoSave() {
  setInterval(() => {
    saveToLocalStorage();
  }, 30000); // Auto-save every 30 seconds
}

// Setup input event listeners
function setupInputListeners() {
  const inputs = document.querySelectorAll(".form-input, .form-select");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      formData[this.name] = this.value;
      clearError(this.name);
    });
  });
}

// Save data to localStorage
function saveToLocalStorage() {
  localStorage.setItem("admissionFormData", JSON.stringify(formData));
  localStorage.setItem("admissionCurrentStep", currentStep.toString());
  localStorage.setItem(
    "admissionCompletedSteps",
    JSON.stringify(completedSteps)
  );
}

// Manual save draft
function saveDraft() {
  saveToLocalStorage();
  alert("Draft saved successfully!");
}

// Validation functions
// function validateEmail(email) {
//   const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
//   return emailRegex.test(email);
// }

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

//   function validatePhone(phone) {
//     const phoneRegex = /^\\(?\\d{3}\\)?[-\.\\s]?\\d{3}[-\.\\s]?\\d{4}$/;
//     return phoneRegex.test(phone);
//   }

function validatePhone(phone) {
  const phoneRegex =
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{3,4}[-.\s]?\d{4}$/;
  return phoneRegex.test(phone);
}

// Clear error message
function clearError(fieldName) {
  const errorElement = document.getElementById(fieldName + "-error");
  const inputElement = document.getElementById(fieldName);

  if (errorElement) {
    errorElement.textContent = "";
  }

  if (inputElement) {
    inputElement.classList.remove("error");
  }
}

// Show error message
function showError(fieldName, message) {
  const errorElement = document.getElementById(fieldName + "-error");
  const inputElement = document.getElementById(fieldName);

  if (errorElement) {
    errorElement.textContent = message;
  }

  if (inputElement) {
    inputElement.classList.add("error");
  }
}

// Validate current step
function validateStep(step) {
  let isValid = true;

  // Clear all previous errors
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((el) => (el.textContent = ""));

  const inputElements = document.querySelectorAll(".form-input, .form-select");
  inputElements.forEach((el) => el.classList.remove("error"));

  switch (step) {
    case 1: // Personal Details
      if (!formData.firstName.trim()) {
        showError("firstName", "First name is required");
        isValid = false;
      }
      if (!formData.lastName.trim()) {
        showError("lastName", "Last name is required");
        isValid = false;
      }
      if (!formData.email.trim()) {
        showError("email", "Email is required");
        isValid = false;
      } else if (!validateEmail(formData.email)) {
        showError("email", "Please enter a valid email address");
        isValid = false;
      }
      if (!formData.phone.trim()) {
        showError("phone", "Phone number is required");
        isValid = false;
      } else if (!validatePhone(formData.phone)) {
        showError("phone", "Please enter a valid phone number");
        isValid = false;
      }
      if (!formData.dateOfBirth) {
        showError("dateOfBirth", "Date of birth is required");
        isValid = false;
      }
      if (!formData.gender) {
        showError("gender", "Gender is required");
        isValid = false;
      }
      if (!formData.address.trim()) {
        showError("address", "Address is required");
        isValid = false;
      }
      if (!formData.city.trim()) {
        showError("city", "City is required");
        isValid = false;
      }
      if (!formData.state.trim()) {
        showError("state", "State is required");
        isValid = false;
      }
      if (!formData.zipCode.trim()) {
        showError("zipCode", "ZIP code is required");
        isValid = false;
      }
      break;

    case 2: // Academic History
      if (!formData.highSchoolName.trim()) {
        showError("highSchoolName", "High school name is required");
        isValid = false;
      }
      if (!formData.graduationYear) {
        showError("graduationYear", "Graduation year is required");
        isValid = false;
      }
      if (!formData.gpa) {
        showError("gpa", "GPA is required");
        isValid = false;
      } else if (isNaN(formData.gpa) || formData.gpa < 0 || formData.gpa > 4) {
        showError("gpa", "GPA must be between 0.0 and 4.0");
        isValid = false;
      }
      if (!formData.intendedMajor.trim()) {
        showError("intendedMajor", "Intended major is required");
        isValid = false;
      }
      break;

    case 3: // Guardian Information
      if (!formData.guardianFirstName.trim()) {
        showError("guardianFirstName", "Guardian first name is required");
        isValid = false;
      }
      if (!formData.guardianLastName.trim()) {
        showError("guardianLastName", "Guardian last name is required");
        isValid = false;
      }
      if (!formData.relationship.trim()) {
        showError("relationship", "Relationship is required");
        isValid = false;
      }
      if (!formData.guardianPhone.trim()) {
        showError("guardianPhone", "Guardian phone is required");
        isValid = false;
      } else if (!validatePhone(formData.guardianPhone)) {
        showError("guardianPhone", "Please enter a valid phone number");
        isValid = false;
      }
      if (!formData.guardianEmail.trim()) {
        showError("guardianEmail", "Guardian email is required");
        isValid = false;
      } else if (!validateEmail(formData.guardianEmail)) {
        showError("guardianEmail", "Please enter a valid email address");
        isValid = false;
      }
      if (!formData.emergencyContact.trim()) {
        showError("emergencyContact", "Emergency contact is required");
        isValid = false;
      }
      if (!formData.emergencyPhone.trim()) {
        showError("emergencyPhone", "Emergency phone is required");
        isValid = false;
      } else if (!validatePhone(formData.emergencyPhone)) {
        showError("emergencyPhone", "Please enter a valid phone number");
        isValid = false;
      }
      break;
  }

  return isValid;
}

// Update form data from inputs
function updateFormData() {
  const inputs = document.querySelectorAll(".form-input, .form-select");
  inputs.forEach((input) => {
    if (input.name && formData.hasOwnProperty(input.name)) {
      formData[input.name] = input.value;
    }
  });
}

// Go to specific step
function goToStep(step) {
  if (step >= 1 && step <= totalSteps) {
    currentStep = step;
    updateUI();
    saveToLocalStorage();
  }
}

// Next step
function nextStep() {
  updateFormData();

  if (validateStep(currentStep)) {
    if (!completedSteps.includes(currentStep)) {
      completedSteps.push(currentStep);
    }

    if (currentStep < totalSteps) {
      currentStep++;
      if (currentStep === 4) {
        populateReviewData();
      }
      updateUI();
      saveToLocalStorage();
    }
  }
}

// Previous step
function previousStep() {
  if (currentStep > 1) {
    currentStep--;
    updateUI();
    saveToLocalStorage();
  }
}

// Populate review data
function populateReviewData() {
  // Personal Details
  const personalReview = document.getElementById("personal-review");
  personalReview.innerHTML = `
                <div class="review-item"><span class="review-label">Name:</span> \${formData.firstName} \${formData.lastName}</div>
                <div class="review-item"><span class="review-label">Email:</span> \${formData.email}</div>
                <div class="review-item"><span class="review-label">Phone:</span> \${formData.phone}</div>
                <div class="review-item"><span class="review-label">DOB:</span> \${formData.dateOfBirth}</div>
                <div class="review-item"><span class="review-label">Gender:</span> \${formData.gender}</div>
                <div class="review-item"><span class="review-label">Address:</span> \${formData.address}, \${formData.city}, \${formData.state} \${formData.zipCode}</div>
            `;

  // Academic Details
  const academicReview = document.getElementById("academic-review");
  let academicHTML = `
                <div class="review-item"><span class="review-label">High School:</span> \${formData.highSchoolName}</div>
                <div class="review-item"><span class="review-label">Graduation Year:</span> \${formData.graduationYear}</div>
                <div class="review-item"><span class="review-label">GPA:</span> \${formData.gpa}</div>
                <div class="review-item"><span class="review-label">Intended Major:</span> \${formData.intendedMajor}</div>
            `;

  if (formData.satScore) {
    academicHTML += `<div class="review-item"><span class="review-label">SAT Score:</span> ${formData.satScore}</div>`;
  }
  if (formData.actScore) {
    academicHTML += `<div class="review-item"><span class="review-label">ACT Score:</span> ${formData.actScore}</div>`;
  }
  if (formData.previousCollege) {
    academicHTML += `<div class="review-item"><span class="review-label">Previous College:</span> ${formData.previousCollege}</div>`;
  }

  academicReview.innerHTML = academicHTML;

  //Guardian Details
  const guardianReview = document.getElementById("guardian-review");
  guardianReview.innerHTML = `
                <div class="review-item"><span class="review-label">Guardian:</span> ${formData.guardianFirstName} \${formData.guardianLastName}</div>
                <div class="review-item"><span class="review-label">Relationship:</span> ${formData.relationship}</div>
                <div class="review-item"><span class="review-label">Guardian Phone:</span> ${formData.guardianPhone}</div>
                <div class="review-item"><span class="review-label">Guardian Email:</span> ${formData.guardianEmail}</div>
                <div class="review-item"><span class="review-label">Emergency Contact:</span> ${formData.emergencyContact}</div>
                <div class="review-item"><span class="review-label">Emergency Phone:</span> ${formData.emergencyPhone}</div>
            `;
}

// Update UI based on current step
function updateUI() {
  // Hide all steps
  const steps = document.querySelectorAll(".form-step");
  steps.forEach((step) => step.classList.remove("active"));

  // Show current step
  document.getElementById(`step-${currentStep}`).classList.add("active");

  // Update progress circles and lines
  for (let i = 1; i <= totalSteps; i++) {
    const circle = document.getElementById(`step-circle-${i}`);
    const title = circle.nextElementSibling;
    const line = document.getElementById(`progress-line-${i}`);

    // Reset classes
    circle.classList.remove("active", "completed");
    title.classList.remove("active", "completed");

    if (completedSteps.includes(i)) {
      circle.classList.add("completed");
      circle.innerHTML =
        '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
      title.classList.add("completed");

      if (line) {
        line.classList.add("completed");
      }
    } else if (i === currentStep) {
      circle.classList.add("active");
      circle.textContent = i;
      title.classList.add("active");
    } else {
      circle.textContent = i;
    }
  }

  // Update mobile step title
  document.getElementById(
    "mobile-step-text"
  ).textContent = `Step ${currentStep}: ${stepTitles[currentStep - 1]}`;

  // Update navigation buttons
  const backBtn = document.getElementById("back-btn");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");

  backBtn.disabled = currentStep === 1;

  if (currentStep === totalSteps) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "flex";
  } else {
    nextBtn.style.display = "flex";
    submitBtn.style.display = "none";
  }
}

// Submit application
function submitApplication() {
  updateFormData();

  if (validateStep(currentStep)) {
    // Generate application reference
    const applicationRef = "APP" + Date.now().toString().slice(-8);

    // Save submission data
    const submissionData = {
      ...formData,
      applicationRef,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem("admissionSubmission", JSON.stringify(submissionData));

    // Clear form data
    localStorage.removeItem("admissionFormData");
    localStorage.removeItem("admissionCurrentStep");
    localStorage.removeItem("admissionCompletedSteps");

    // Show success message
    document.getElementById("reference-display").textContent = applicationRef;
    document.getElementById("step-success").classList.add("active");
    document.getElementById("step-4").classList.remove("active");
    document.getElementById("navigation").style.display = "none";
  }
}
