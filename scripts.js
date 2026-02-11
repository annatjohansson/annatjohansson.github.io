// Global variable for publications
let allPublications = [];

// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
  loadPublications();
});

// Load publications from JSON
function loadPublications() {
  fetch('publications.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Publications loaded successfully:", data);
      allPublications = data.publications;
      renderPublications(); // Show all publications immediately
    })
    .catch(error => {
      console.error('Error loading publications:', error);
      const container = document.getElementById('publications-container');
      container.innerHTML = 'Error loading publications.';
    });
}

// Render all publications
function renderPublications() {
  const container = document.getElementById('publications-container');
  container.innerHTML = ''; // Clear container

  allPublications.forEach(pub => {
    const pubElement = createPublicationElement(pub);
    container.appendChild(pubElement);
  });
}

// Create a publication HTML element
function createPublicationElement(pub) {
  const item = document.createElement('div');
  item.className = 'publication-item';

  const content = document.createElement('div');
  content.className = 'pub-content';

  // Title
  const title = document.createElement('div');
  title.className = 'pub-title';
  title.textContent = pub.title;
  content.appendChild(title);

  // Authors
  const authors = document.createElement('div');
  authors.className = 'pub-authors';
  authors.textContent = pub.authors.join(', ');
  content.appendChild(authors);

  // Venue
  const venue = document.createElement('div');
  venue.className = 'pub-venue';
  venue.textContent = pub.venue;
  content.appendChild(venue);

  // Links (PDF)
  if (pub.links && pub.links.pdf) {
    const link = document.createElement('a');
    link.href = pub.links.pdf;
    link.textContent = '[PDF]';
    link.style.marginRight = '10px';
    content.appendChild(link);
  }

  item.appendChild(content);
  return item;
}
