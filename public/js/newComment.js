const commentModal = document.getElementById('comment-modal');
const addButton = document.getElementById('comment-button');

addButton.addEventListener("click", openModal)

function openModal() {
    commentModal.style.display = "block";
}

 const newComment = async (event) => {
    event.preventDefault();
    const postId = document.getElementById('postID').value;
    const commentText = document.getElementById('commentText').value.trim();
    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({commentText, postId}),
        headers: { 'Content-Type': 'application/json'},
    })

    if (response.ok) {
        document.location.reload();
    }

}
const commentForm = document.getElementById('newCommentForm')
commentForm.addEventListener('submit', newComment);