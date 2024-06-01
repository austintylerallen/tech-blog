// const newPostFormHandler = async (event) => {
//     event.preventDefault();
  
//     const title = document.querySelector('input[name="title"]').value.trim();
//     const content = document.querySelector('textarea[name="content"]').value.trim();
  
//     if (title && content) {
//       const response = await fetch('/api/posts', {
//         method: 'POST',
//         body: JSON.stringify({ title, content }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         document.location.replace('/dashboard');
//       } else {
//         alert('Failed to create post');
//       }
//     }
//   };
  
//   document.querySelector('#new-post-form').addEventListener('submit', newPostFormHandler);
  
document.addEventListener('DOMContentLoaded', () => {
  const newPostForm = document.querySelector('#new-post-form');

  if (newPostForm) {
    newPostForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const titleElement = document.querySelector('#post-title');
      const contentElement = document.querySelector('#post-content');

      if (titleElement && contentElement) {
        const title = titleElement.value.trim();
        const content = contentElement.value.trim();

        if (title && content) {
          const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to create post');
          }
        }
      }
    });
  }
});

