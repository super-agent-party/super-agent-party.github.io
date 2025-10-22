// GitHub stars functionality for Super Agent Party website

/**
 * Fetches the number of stars for a GitHub repository
 * @param {string} owner - The repository owner
 * @param {string} repo - The repository name
 * @returns {Promise<number>} - Promise resolving to the star count
 */
async function fetchGitHubStars(owner, repo) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const data = await response.json();
    return data.stargazers_count;
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return null;
  }
}

/**
 * Updates GitHub star count elements on the page
 */
async function updateStarCount() {
  const owner = 'heshengtao';
  const repo = 'super-agent-party';
  
  const starCount = await fetchGitHubStars(owner, repo);
  
  // If we couldn't fetch the star count, don't update the UI
  if (starCount === null) return;
  
  // Find all GitHub star count elements and update them
  const starCountElements = document.querySelectorAll('.github-stars');
  starCountElements.forEach(element => {
    element.textContent = starCount;
  });
}

// Initialize star count when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  updateStarCount();
});
