document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('postForm');
    const postList = document.getElementById('postList');

    // Fetch and display posts
    function fetchPosts() {
        fetch('/api/posts')
            .then(response => response.json())
            .then(posts => {
                postList.innerHTML = '';
                posts.forEach(post => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>${post.title}</strong>
                        <p>${post.content}</p>
                        <button onclick="deletePost('${post._id}')">Delete</button>
                        <button onclick="editPost('${post._id}', '${post.title}', '${post.content}')">Edit</button>
                    `;
                    postList.appendChild(li);
                });
            });
    }

    // Add a new post
    postForm.onsubmit = function (e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        })
        .then(() => {
            postForm.reset();
            fetchPosts();
        });
    };

    // Delete a post
    window.deletePost = function (id) {
        fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        })
        .then(() => fetchPosts());
    };

    // Edit a post
    window.editPost = function (id, title, content) {
        document.getElementById('title').value = title;
        document.getElementById('content').value = content;

        postForm.onsubmit = function (e) {
            e.preventDefault();

            fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: document.getElementById('title').value,
                    content: document.getElementById('content').value,
                }),
            })
            .then(() => {
                postForm.reset();
                fetchPosts();
            });
        };
    };

    // Initial fetch of posts
    fetchPosts();
});
