document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('blog-posts');
  const fullPostSection = document.getElementById('full-post');

  fetch('blog.json')
    .then(res => res.json())
    .then(posts => {
      postsContainer.innerHTML = '';
      posts.forEach((post, idx) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'blog-preview';
        postDiv.innerHTML = `
          <h3><a href="#" data-idx="${idx}">${post.title}</a></h3>
          <p class="blog-meta">${post.date} | ${post.tags.join(', ')}</p>
          <p>${post.preview}</p>
        `;
        postsContainer.appendChild(postDiv);
      });
      postsContainer.querySelectorAll('a[data-idx]').forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          const idx = link.getAttribute('data-idx');
          showFullPost(posts[idx]);
        });
      });
    })
    .catch(() => {
      postsContainer.textContent = 'No blog posts found.';
    });

  function showFullPost(post) {
    fullPostSection.style.display = 'block';
    fullPostSection.innerHTML = `
      <button id="back-to-list">&larr; Back to list</button>
      <h2>${post.title}</h2>
      <p class="blog-meta">${post.date} | ${post.tags.join(', ')}</p>
      <div>${post.content}</div>
    `;
    document.getElementById('blog-posts').style.display = 'none';
    document.getElementById('back-to-list').onclick = () => {
      fullPostSection.style.display = 'none';
      document.getElementById('blog-posts').style.display = 'block';
    };
  }
}); 