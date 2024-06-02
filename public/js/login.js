// public/js/login.js
document.addEventListener('DOMContentLoaded', () => {
  const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
      console.log('Login data:', { email, password }); // Debugging log
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in. Incorrect email or password.');
      }
    } else {
      alert('Please enter both an email and password.');
    }
  };

  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', loginFormHandler);
  }
});
