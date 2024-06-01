document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout-button');

  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      try {
        const response = await fetch('/logout', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/');
        } else {
          console.error('Failed to log out');
        }
      } catch (err) {
        console.error('Failed to log out:', err);
      }
    });
  }
});
