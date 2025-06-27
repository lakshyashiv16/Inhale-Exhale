document.addEventListener('DOMContentLoaded', () => {
  const BLOG_API_URL = 'https://script.google.com/macros/s/AKfycbznqXdhiFmukfQM4n0ftVbEXMBpxWyYWxK8byoHA8s-cH8dK2sd_CCM_RtZL4HswRzK/exec';
  const postsContainer = document.getElementById('blog-posts');
  const fullPostSection = document.getElementById('full-post');
  const tagButtons = document.querySelectorAll('.tag-btn');
  let allPosts = [];

  fetch(BLOG_API_URL)
    .then(res => res.json())
    .then(posts => {
      // Ensure Category is always an array
      allPosts = posts.map(post => {
        if (typeof post.Category === 'string') {
          post.Category = post.Category.split(',').map(cat => cat.trim());
        }
        return post;
      });
      renderPosts(allPosts);
    })
    .catch(() => {
      postsContainer.textContent = 'No blog posts found.';
    });

  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date)) return dateString; // fallback
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function renderPosts(posts) {
    // Sort posts by date descending (most recent first)
    posts = posts.slice().sort((a, b) => new Date(b.Date) - new Date(a.Date));
    postsContainer.innerHTML = '';
    posts.forEach((post, idx) => {
      const postDiv = document.createElement('div');
      postDiv.className = 'blog-preview';
      postDiv.innerHTML = `
        <h3 class="blog-title"><a href="#" data-idx="${idx}">${post.Title}</a></h3>
        <div class="blog-meta">
          <span>${formatDate(post.Date)}</span>
          ${Array.isArray(post.Category) ? ' | ' + post.Category.join(', ') : ''}
        </div>
        <div class="blog-author"><strong>By:</strong> ${post['Author (Full Name)'] || post.Author || ''}</div>
        <div class="blog-preview-content">${post.Content.substring(0, 180).replace(/(?:\r\n|\r|\n)/g, ' ') + (post.Content.length > 180 ? '...' : '')}</div>
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
        renderPosts(allPosts.filter(post => Array.isArray(post.Category) && post.Category.includes(tag)));
      }
      fullPostSection.style.display = 'none';
      postsContainer.style.display = 'grid';
    });
  });

  function showFullPost(post) {
    fullPostSection.style.display = 'block';
    fullPostSection.innerHTML = `
      <button id="back-to-list">&larr; Back to list</button>
      <h2>${post.Title}</h2>
      <p class="blog-meta">${formatDate(post.Date)}${Array.isArray(post.Category) ? ' | ' + post.Category.join(', ') : ''}</p>
      <p class="blog-author"><strong>By:</strong> ${post['Author (Full Name)'] || post.Author || ''}</p>
      <div class="blog-content">${post.Content.replace(/(?:\r\n|\r|\n)/g, '<br>')}</div>
    `;
    postsContainer.style.display = 'none';
    document.getElementById('back-to-list').onclick = () => {
      fullPostSection.style.display = 'none';
      postsContainer.style.display = 'grid';
    };
  }
}); 