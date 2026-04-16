const loginPage = document.getElementById('login-page');
const adminPage = document.getElementById('admin-page');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logout-btn');
const projectModal = document.getElementById('projectModal');
const projectForm = document.getElementById('projectForm');
const addProjectBtn = document.getElementById('add-project-btn');
const projectsTbody = document.getElementById('projects-tbody');
const closeBtn = document.querySelector('.close');

let currentEditingId = null;

// Check auth state
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    loginPage.style.display = 'none';
    adminPage.style.display = 'block';
    loadProjects();
  } else {
    loginPage.style.display = 'flex';
    adminPage.style.display = 'none';
  }
});

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    document.getElementById('login-error').textContent = '';
  } catch (error) {
    document.getElementById('login-error').textContent = error.message;
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  firebase.auth().signOut();
});

// Load projects
async function loadProjects() {
  try {
    const querySnapshot = await db.collection('projects').orderBy('createdAt', 'desc').get();
    projectsTbody.innerHTML = '';

    if (querySnapshot.empty) {
      projectsTbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 2rem;">No projects yet</td></tr>';
      return;
    }

    querySnapshot.forEach(doc => {
      const project = doc.data();
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${project.title}</td>
        <td><a href="${project.url}" target="_blank">${project.url}</a></td>
        <td>${project.description || '-'}</td>
        <td>
          <button class="btn-small btn-edit" onclick="editProject('${doc.id}')">Edit</button>
          <button class="btn-small btn-delete" onclick="deleteProject('${doc.id}')">Delete</button>
        </td>
      `;
      projectsTbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

// Add project button
addProjectBtn.addEventListener('click', () => {
  currentEditingId = null;
  document.getElementById('modal-title').textContent = 'Add New Project';
  projectForm.reset();
  projectModal.style.display = 'block';
});

// Close modal
closeBtn.addEventListener('click', () => {
  projectModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === projectModal) {
    projectModal.style.display = 'none';
  }
});

// Save project
projectForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const projectData = {
    title: document.getElementById('title').value,
    url: document.getElementById('url').value,
    description: document.getElementById('description').value,
    image: document.getElementById('image').value,
    updatedAt: new Date()
  };

  try {
    if (currentEditingId) {
      await db.collection('projects').doc(currentEditingId).update(projectData);
    } else {
      projectData.createdAt = new Date();
      await db.collection('projects').add(projectData);
    }
    projectModal.style.display = 'none';
    loadProjects();
  } catch (error) {
    console.error('Error saving project:', error);
  }
});

// Edit project
async function editProject(id) {
  try {
    const doc = await db.collection('projects').doc(id).get();
    const project = doc.data();

    currentEditingId = id;
    document.getElementById('modal-title').textContent = 'Edit Project';
    document.getElementById('title').value = project.title;
    document.getElementById('url').value = project.url;
    document.getElementById('description').value = project.description || '';
    document.getElementById('image').value = project.image || '';

    projectModal.style.display = 'block';
  } catch (error) {
    console.error('Error loading project:', error);
  }
}

// Delete project
async function deleteProject(id) {
  if (confirm('Are you sure you want to delete this project?')) {
    try {
      await db.collection('projects').doc(id).delete();
      loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }
}
