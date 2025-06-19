document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('blog-posts');
  const fullPostSection = document.getElementById('full-post');
  const tagButtons = document.querySelectorAll('.tag-btn');
  let allPosts = [];

  fetch('blog.json')
    .then(res => res.json())
    .then(posts => {
      allPosts = posts;
      renderPosts(posts);
    })
    .catch(() => {
      postsContainer.textContent = 'No blog posts found.';
    });

  function renderPosts(posts) {
    postsContainer.innerHTML = '';
    posts.forEach((post, idx) => {
      const postDiv = document.createElement('div');
      postDiv.className = 'blog-preview';
      let imgHtml = post.image ? `<img src="${post.image}" alt="${post.title} image">` : '';
      postDiv.innerHTML = `
        ${imgHtml}
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
  }

  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tagButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.getAttribute('data-tag');
      if (tag === 'all') {
        renderPosts(allPosts);
      } else {
        renderPosts(allPosts.filter(post => post.tags.includes(tag)));
      }
      fullPostSection.style.display = 'none';
      postsContainer.style.display = 'grid';
    });
  });

  function showFullPost(post) {
    fullPostSection.style.display = 'block';
    let imgHtml = post.image ? `<img src="${post.image}" alt="${post.title} image" style="width:100%;max-height:220px;object-fit:cover;border-radius:0.7rem;margin-bottom:1rem;background:#F5F5F5;">` : '';
    fullPostSection.innerHTML = `
      <button id="back-to-list">&larr; Back to list</button>
      ${imgHtml}
      <h2>${post.title}</h2>
      <p class="blog-meta">${post.date} | ${post.tags.join(', ')}</p>
      <div>${post.content}</div>
    `;
    postsContainer.style.display = 'none';
    document.getElementById('back-to-list').onclick = () => {
      fullPostSection.style.display = 'none';
      postsContainer.style.display = 'grid';
    };
  }
}); 