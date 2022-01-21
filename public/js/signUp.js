const signUpHandler = async (event) => {
    event.preventDefault();

    const name = document.getElementById('signupname').value.trim();
    const email = document.getElementById('signupemail').value.trim();
    const password = document.getElementById('signuppw').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password}),
            headers: { 'Content-Type': 'application/json'},
        })

        if (response.ok) {
            document.location.replace('/')
        }
    }
}

const signUpForm = document.getElementById('signupform');

signUpForm.addEventListener('submit', signUpHandler);