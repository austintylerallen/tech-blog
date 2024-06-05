document.addEventListener('DOMContentLoaded', () => {
  const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (email && password) {
      try {
        const response = await fetch('/signup', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          const errorText = await response.text(); // Get the response text for debugging
          console.error('Signup error:', errorText);
          alert('Failed to sign up. Please try again.');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to sign up due to a network error. Please try again.');
      }
    } else {
      alert('Please fill out all fields.');
    }
  };

  const signupForm = document.querySelector('.signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', signupFormHandler);
  }
});
