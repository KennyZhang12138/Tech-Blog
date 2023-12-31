const postId = document.querySelector('input[name="post-id"]').value;

const editHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector('input[name="post-title"]').value;
  const postContent = document.querySelector('textarea[name="post-body"]').value;

  const response = await fetch(`/api/post/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      postTitle,
      postContent,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to update your post");
  }
  document.location.replace("/dashboard");
};

const deleteHandler = async () => {
  await fetch(`/api/post/${postId}`, {
    method: "DELETE",
  });

  document.location.replace("/dashboard");
};

document.querySelector('#edit-post-form').addEventListener('submit', editHandler);
document.querySelector('#delete-btn').addEventListener('click', deleteHandler);
