document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.querySelector('#comment-form');

  if (commentForm) {
    commentForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const comment_text = document.querySelector('textarea[name="comment_text"]').value.trim();
      const post_id = document.querySelector('input[name="post_id"]').value;

      if (comment_text) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({ comment_text, post_id }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.reload();
        } else {
          alert('Failed to add comment.');
        }
      }
    });
  }
});
