document.addEventListener('DOMContentLoaded', () => {
  const newPostForm = document.querySelector('#new-post-form');

  newPostForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const title = document.querySelector('#title').value.trim();
      const content = document.querySelector('#content').value.trim();
      const userId = document.querySelector('meta[name="user-id"]').getAttribute('content');

      if (title && content) {
          try {
              const response = await fetch('/api/posts', {
                  method: 'POST',
                  body: JSON.stringify({ title, content, user_id: userId }),
                  headers: { 'Content-Type': 'application/json' },
              });

              if (response.ok) {
                  document.location.replace('/dashboard');
              } else {
                  const errorText = await response.json();
                  console.error('Create post error:', errorText);
              }
          } catch (err) {
              console.error('Failed to create post:', err);
          }
      } else {
          console.error('Title and content are required');
      }
  });

  document.querySelectorAll('.delete-post').forEach(button => {
      button.addEventListener('click', async (event) => {
          const postId = event.target.getAttribute('data-id');

          try {
              const response = await fetch(`/api/posts/${postId}`, {
                  method: 'DELETE'
              });

              if (response.ok) {
                  document.location.replace('/dashboard');
              } else {
                  console.error('Failed to delete post');
              }
          } catch (err) {
              console.error('Failed to delete post:', err);
          }
      });
  });
});
