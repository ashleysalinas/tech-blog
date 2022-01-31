

const modal = document.querySelector('.edit-modal')
const openModal = async(event) => {
    if (event.target.hasAttribute("button-id")) {
        modal.style.display= "block";
        const id = event.target.getAttribute('button-id')
        document.getElementById('postID').setAttribute("value", id)
        
    }
}
document.querySelector('.post-list').addEventListener('click', openModal)
var span = document.getElementById('comment-close')

span.onclick = function() {
    modal.style.display = "none";
  }

const editForm = document.getElementById('editForm');

const submitEdit = async(event) => {
    event.preventDefault();
    const id = document.getElementById('postID').value;
    const editTitle = document.getElementById('editTitle').value.trim();
    const editText = document.getElementById('editText').value.trim();
    const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ id, editTitle, editText}),
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        document.location.reload()
    } else {
        console.log('not good')
    }
}

editForm.addEventListener('submit', submitEdit)

const deleteButton = async (event) => {
    if (event.target.hasAttribute("delete-id")) {
        const id = event.target.value;
        
        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: {'Content-Type': 'application/json'}
        })

        if (response.ok) {
            document.location.reload();
        } else {
            console.log('nope')
        }
    }
}
document.querySelector('.post-list').addEventListener('click', deleteButton)