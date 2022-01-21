const submitNewPost = async (event) => {
    event.preventDefault();

    const postTitle = document.getElementById('post-title').value.trim();
    const postText = document.getElementById('post-text').value.trim();
    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ postTitle, postText }),
        headers: { 'Content-Type': 'application/json'},
    })
    if (response.ok) {
        document.location.replace('/')
    }
}

const newPostForm = document.getElementById('post-form');

newPostForm.addEventListener('submit', submitNewPost);