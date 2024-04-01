function previewForm() {
    var form = document.forms['feedbackForm'];
    var preview = document.getElementById('previewContent');
    var html = '';

    // Iterate over form elements and prepare preview content
    for (var i = 0; i < form.length; i++) {
        var element = form.elements[i];
        if (element.type !== "button" || element.type !== "submit") {
            var value = element.type === 'radio' || element.type === 'checkbox'
                ? (element.checked ? element.value : '')
                : element.value;
            if (value) {
                html += `<strong>${element.name}</strong>: ${value}<br><br>`;
            }
        }
    }
    preview.innerHTML = html;
    document.getElementById('previewModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('previewModal').style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == document.getElementById('previewModal')) {
        closeModal();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById('feedbackForm');

    form.onsubmit = function (event) {
        // Validate each required field
        var isValidName = validateName();
        var isValidEmail = validateEmail();
        var isValidNavigationRadio = validateNavigationRadio();
        var isValidVisitRadio = validateAskVisitRadio();
        var isValidRecommendRadio = validateRecommendationRadio();

        // Check if all validations are true
        if (isValidName && isValidEmail && isValidNavigationRadio && isValidVisitRadio && isValidRecommendRadio) {
            alert('Thank you for your feedback!');
        } else {
            // Prevent form submission
            event.preventDefault();
            alert('Please fill in all required fields correctly.');
        }
    };

    function validateName() {
        var name = document.getElementById("name");
        var nameError = document.getElementById("name-error");
        if (name.value.trim() === '') {
            nameError.textContent = "Name is required!";
            nameError.style.color = "red";
            name.style.borderColor = "red";
            return false;
        } else {
            nameError.style.color= "#008060";
            nameError.innerHTML = "✔";
            name.style.borderColor = "green";
            return true;
        }
    }

    function validateEmail() {
        var email = document.getElementById("email");
        var emailError = document.getElementById("email-error");
        if (email.value.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            emailError.textContent = "Valid email is required!";
            emailError.style.color = "red";
            email.style.borderColor = "red";
            return false;
        } else {
            emailError.style.color = "#008060";
            emailError.innerHTML = "✔";
            email.style.borderColor = "green";
            return true;
        }
    }

    function validateNavigationRadio() {
        var navigationRadio = document.getElementsByName('Is it easy to navigate');
        var navigationRadioError = document.getElementById('navigationradio-error');
        if (!Array.from(navigationRadio).some(radio => radio.checked)) {
            navigationRadioError.textContent = 'Please select an option.';
            navigationRadioError.style.color = 'red';
            return false;
        } else {
            navigationRadioError.textContent = '';
            return true;
        }
    }

    function validateAskVisitRadio() {
        var visitRadio = document.getElementsByName('First Visit');
        var visitRadioError = document.getElementById('visitradio-error');
        if (!Array.from(visitRadio).some(radio => radio.checked)) {
            visitRadioError.textContent = 'Please select an option.';
            visitRadioError.style.color = 'red';
            return false;
        } else {
            visitRadioError.textContent = '';
            return true;
        }
    }

    function validateRecommendationRadio() {
        var recommendationRadio = document.getElementsByName('Recommendation');
        var recommendationRadioError = document.getElementById('recommendradio-error');
        if (!Array.from(recommendationRadio).some(radio => radio.checked)) {
            recommendationRadioError.textContent = 'Please select an option.';
            recommendationRadioError.style.color = 'red';
            return false;
        } else {
            recommendationRadioError.textContent = '';
            return true;
        }
    }

    // Attach input event listeners for real-time validation feedback
    document.getElementById("name").addEventListener("input", validateName);
    document.getElementById("email").addEventListener("input", validateEmail);
    // Add listeners for radio buttons if real-time validation feedback for them is desired
});
