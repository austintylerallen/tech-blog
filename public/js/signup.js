document.addEventListener('DOMContentLoaded', () => {
  const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (email && password) {
      console.log('Signup data:', { email, password });
      const response = await fetch('/api/users/signup', { // Correct endpoint
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to dashboard on success
      } else {
        const errorText = await response.text();
        console.error('Failed to sign up:', errorText);
        alert('Failed to sign up. Please try again.');
      }
    } else {
      alert('Please enter both an email and password.');
    }
  };

  const signupForm = document.querySelector('.signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', signupFormHandler);
  }
});
