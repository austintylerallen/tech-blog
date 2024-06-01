// const editPostFormHandler = async (event) => {
//     event.preventDefault();
  
//     const id = document.querySelector('#edit-post-form').getAttribute('data-id');
//     const title = document.querySelector('input[name="title"]').value.trim();
//     const content = document.querySelector('textarea[name="content"]').value.trim();
  
//     if (title && content) {
//       const response = await fetch(`/api/posts/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify({ title, content }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         document.location.replace('/dashboard');
//       } else {
//         alert('Failed to update post');
//       }
//     }
//   };
  
//   const editPostForm = document.querySelector('#edit-post-form');
  
//   if (editPostForm) {
//     editPostForm.addEventListener('submit', editPostFormHandler);
//   }
  

document.addEventListener('DOMContentLoaded', () => {
  const editPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const post_id = document.querySelector('#post-id').value;

    if (title && content) {
      const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post.');
      }
    }
  };

  const editPostForm = document.querySelector('#edit-post-form');
  if (editPostForm) {
    editPostForm.addEventListener('submit', editPostFormHandler);
  }
});
