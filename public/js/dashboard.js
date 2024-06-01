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

  document.querySelectorAll('.edit-post').forEach(button => {
      button.addEventListener('click', (event) => {
          const postId = event.target.getAttribute('data-id');
          const postTitle = document.querySelector(`#post-title-${postId}`).innerText;
          const postContent = document.querySelector(`#post-content-${postId}`).innerText;

          document.querySelector('#edit-title').value = postTitle;
          document.querySelector('#edit-content').value = postContent;
          document.querySelector('#edit-post-id').value = postId;

          $('#editPostModal').modal('show');
      });
  });

  document.querySelector('#edit-post-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const postId = document.querySelector('#edit-post-id').value;
      const title = document.querySelector('#edit-title').value.trim();
      const content = document.querySelector('#edit-content').value.trim();

      if (title && content) {
          try {
              const response = await fetch(`/api/posts/${postId}`, {
                  method: 'PUT',
                  body: JSON.stringify({ title, content }),
                  headers: { 'Content-Type': 'application/json' },
              });

              if (response.ok) {
                  document.location.replace('/dashboard');
              } else {
                  console.error('Failed to update post');
              }
          } catch (err) {
              console.error('Failed to update post:', err);
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

  document.querySelectorAll('.comment-form').forEach(form => {
      form.addEventListener('submit', async (event) => {
          event.preventDefault();

          const postId = event.target.getAttribute('data-post-id');
          const commentText = form.querySelector('textarea[name="comment"]').value.trim();
          const userId = document.querySelector('meta[name="user-id"]').getAttribute('content');

          if (commentText) {
              try {
                  const response = await fetch(`/api/comments`, {
                      method: 'POST',
                      body: JSON.stringify({ comment_text: commentText, user_id: userId, post_id: postId }),
                      headers: { 'Content-Type': 'application/json' },
                  });

                  if (response.ok) {
                      document.location.replace('/dashboard');
                  } else {
                      const errorText = await response.json();
                      console.error('Failed to create comment:', errorText);
                  }
              } catch (err) {
                  console.error('Failed to create comment:', err);
              }
          } else {
              console.error('Comment text is required');
          }
      });
  });
});
