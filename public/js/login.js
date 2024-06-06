document.addEventListener('DOMContentLoaded', () => {
  const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
      console.log('Login data:', { email, password });
      const response = await fetch('/api/users/login', { // Correct endpoint
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to dashboard on success
      } else {
        const errorText = await response.text();
        console.error('Failed to log in:', errorText);
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
