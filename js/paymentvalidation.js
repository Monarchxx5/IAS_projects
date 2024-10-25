document.getElementById("pop-up-yes").style.display = "none";
function showPopUpYes(){
    document.getElementById("pop-up-yes").style.display ="flex";
    setTimeout(closePopUpYes, 2000);
}
function closePopUpYes(){
    document.getElementById("pop-up-yes").style.display = "none";
}
document.addEventListener('DOMContentLoaded', function () {
    // Get the form and the pay button
    const form = document.querySelector('form');
    const payButton = document.querySelector('.btn-primary');

    // Card number and expiration date input elements
    const email = document.querySelector('input[type="email"]');
    const cardNumber = document.querySelector('input[placeholder="Please enter 16 digits"]');
    const expDate = document.querySelector('input[placeholder="MM/YY"]');
    const cvv = document.querySelector('input[placeholder="CVV"]');
    const cardholderName = document.querySelector('input[placeholder="Cardholder name"]');
    const zip = document.querySelector('input[placeholder="ZIP"]');
    const state = document.querySelector('input[placeholder="State"]');
    const country = document.querySelector('select');

    // Error message container
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('alert', 'alert-danger', 'd-none');
    form.insertBefore(errorDiv, form.firstChild);

    // Format card number: Add spaces after every 4 digits, and limit to 16 digits
    cardNumber.addEventListener('input', function () {
        let value = cardNumber.value.replace(/\D/g, ''); // Remove non-digit characters
        value = value.substring(0, 16); // Limit to 16 digits
        value = value.replace(/(.{4})/g, '$1 ').trim(); // Insert a space after every 4 digits
        cardNumber.value = value;
    });

    // Format expiration date: Add "/" after MM
    expDate.addEventListener('input', function () {
        let value = expDate.value.replace(/\D/g, ''); // Remove non-digit characters
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4); // Insert "/" after MM
        }
        expDate.value = value;
    });

    // Restrict CVV to numeric input only
    cvv.addEventListener('input', function () {
        cvv.value = cvv.value.replace(/\D/g, ''); // Remove any non-numeric characters
    });

    email.addEventListener('input', function () {
        email.value = email.value.replace(/\s/g, ''); // Remove spacing in email
    });

    cardholderName.addEventListener('input', function(){
        if(/^\s/.test(cardholderName.value)){ // Prevent first input to be space, newline and tabs
            cardholderName.value = '';
        }
    });
    
    // Restrict ZIP code to numeric input only and limit to 5 digits
    zip.addEventListener('input', function () {
        zip.value = zip.value.replace(/\D/g, ''); // Remove non-numeric characters
        zip.value = zip.value.substring(0, 5); // Limit to 5 digits
    });

    // Validate form on pay button click
    payButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form from submitting
        errorDiv.innerHTML = ''; // Clear previous errors
        errorDiv.classList.add('d-none'); // Hide error container initially

        let isValid = true;
        let errorMessages = [];

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            isValid = false;
            email.style.border = '2px solid red';
            errorMessages.push("Please enter a valid email address.");
        } else {
            email.style.border = '';
        }

        // Card number validation (must be 16 digits, ignoring spaces)
        const cardPattern = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
        if (!cardPattern.test(cardNumber.value)) {
            isValid = false;
            cardNumber.style.border = '2px solid red';
            errorMessages.push("Please enter a valid 16-digit card number (xxxx xxxx xxxx xxxx).");
        } else {
            cardNumber.style.border = '';
        }

        // Expiration date validation (format MM/YY)
        const expPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expPattern.test(expDate.value)) {
            isValid = false;
            expDate.style.border = '2px solid red';
            errorMessages.push("Please enter a valid expiration date in MM/YY format.");
        } else {
            expDate.style.border = '';
        }

        // CVV validation (must be 3 digits)
        const cvvPattern = /^\d{3}$/;
        if (!cvvPattern.test(cvv.value)) {
            isValid = false;
            cvv.style.border = '2px solid red';
            errorMessages.push("Please enter a valid 3-digit CVV.");
        } else {
            cvv.style.border = '';
        }

        // Cardholder name validation (not empty)
        if (cardholderName.value.trim() === '') {
            isValid = false;
            cardholderName.style.border = '2px solid red';
            errorMessages.push("Please enter the cardholder's name.");
        } else {
            cardholderName.style.border = '';
        }

        // ZIP code validation (must be exactly 5 digits)
        const zipPattern = /^\d{5}$/;
        if (!zipPattern.test(zip.value)) {
            isValid = false;
            zip.style.border = '2px solid red';
            errorMessages.push("Please enter a valid 5-digit ZIP code.");
        } else {
            zip.style.border = '';
        }

        // State validation (not empty)
        if (state.value.trim() === '') {
            isValid = false;
            state.style.border = '2px solid red';
            errorMessages.push("Please enter a state.");
        } else {
            state.style.border = '';
        }

        // Country validation (ensure selection is not the default)
        if (country.selectedIndex === 0) {
            isValid = false;
            country.style.border = '2px solid red';
            errorMessages.push("Please select a billing country.");
        } else {
            country.style.border = '';
        }

        // Show error messages in the error div if form is invalid
        if (!isValid) {
            errorDiv.innerHTML = errorMessages.join('<br>');
            errorDiv.classList.remove('d-none'); // Show error container
        } else {
            showPopUpYes();
            email.value = '';
            cardNumber.value = '';
            expDate.value = '';
            cvv.value = '';
            cardholderName.value = '';
            zip.value = '';
            state.value = '';
            country.selectedIndex = 0; 
        }
    });
});