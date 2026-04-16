// Load projects from Firestore
async function loadProjects() {
  const container = document.getElementById('projects-container');
  
  try {
    const querySnapshot = await db.collection('projects').orderBy('createdAt', 'desc').get();
    
    if (querySnapshot.empty) {
      container.innerHTML = '<div class="no-projects">No projects yet. Check back soon!</div>';
      return;
    }

    container.innerHTML = '';
    querySnapshot.forEach(doc => {
      const project = doc.data();
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.innerHTML = `
        <div class="project-image" style="background-image: url('${project.image || 'https://via.placeholder.com/300x200'}')"></div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description || 'No description'}</p>
          <a href="${project.url}" target="_blank" class="project-link">Visit Project →</a>
        </div>
      `;
      container.appendChild(projectCard);
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    container.innerHTML = '<div class="error">Error loading projects</div>';
  }
}

// Load projects on page load
document.addEventListener('DOMContentLoaded', loadProjects);

// Real-time updates
db.collection('projects').onSnapshot(() => {
  loadProjects();
});
