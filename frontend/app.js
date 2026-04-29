// =====================
// CONFIG
// =====================
const API_BASE = 'http://localhost/comptes-rendus/backend';

// Demo credentials (used when backend is not available)
const DEMO_USER = { email: 'tuteur@test.com', password: '1234', nom: 'Dr. Tuteur' };

const DEMO_DATA = [
  { id: 1, nom: 'Ahmed Ben Ali', email: 'ahmed@etudiant.com', semaine: 'Semaine 1', fichier: 'rapport_s1_ahmed.pdf', date_depot: '2026-04-20', statut: 'Déposé' },
  { id: 2, nom: 'Sarra Trabelsi', email: 'sarra@etudiant.com', semaine: 'Semaine 1', fichier: 'rapport_s1_sarra.pdf', date_depot: '2026-04-21', statut: 'Déposé' },
  { id: 3, nom: 'Mohamed Chaabane', email: 'med@etudiant.com', semaine: 'Semaine 1', fichier: '', date_depot: '', statut: 'En attente' },
  { id: 4, nom: 'Yasmine Khelifi', email: 'yasmine@etudiant.com', semaine: 'Semaine 2', fichier: 'rapport_s2_yasmine.pdf', date_depot: '2026-04-25', statut: 'Déposé' },
  { id: 5, nom: 'Karim Mansouri', email: 'karim@etudiant.com', semaine: 'Semaine 2', fichier: '', date_depot: '', statut: 'En retard' },
  { id: 6, nom: 'Nour Belhaj', email: 'nour@etudiant.com', semaine: 'Semaine 2', fichier: '', date_depot: '', statut: 'En attente' },
  { id: 7, nom: 'Ines Hamdi', email: 'ines@etudiant.com', semaine: 'Semaine 3', fichier: 'rapport_s3_ines.pdf', date_depot: '2026-04-28', statut: 'Déposé' },
  { id: 8, nom: 'Fares Jouini', email: 'fares@etudiant.com', semaine: 'Semaine 3', fichier: '', date_depot: '', statut: 'En retard' },
];

let allReports = [];
let useDemoMode = false;

// =====================
// LOGIN
// =====================
async function login() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const errorDiv = document.getElementById('login-error');

  if (!email || !password) {
    errorDiv.textContent = 'Veuillez remplir tous les champs.';
    errorDiv.classList.remove('hidden');
    return;
  }

  // Try backend first
  try {
    const res = await fetch(`${API_BASE}/login.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (data.success) {
      document.getElementById('nav-user').textContent = `👤 ${data.nom}`;
      showDashboard();
      return;
    } else {
      errorDiv.textContent = 'Email ou mot de passe incorrect.';
      errorDiv.classList.remove('hidden');
      return;
    }
  } catch (e) {
    // Backend not available, use demo mode
    useDemoMode = true;
  }

  // Demo mode login
  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    document.getElementById('nav-user').textContent = `👤 ${DEMO_USER.nom}`;
    showDashboard();
  } else {
    errorDiv.textContent = 'Email ou mot de passe incorrect.';
    errorDiv.classList.remove('hidden');
  }
}

function logout() {
  document.getElementById('login-page').classList.add('active');
  document.getElementById('dashboard-page').classList.remove('active');
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
}

function showDashboard() {
  document.getElementById('login-page').classList.remove('active');
  document.getElementById('login-error').classList.add('hidden');
  document.getElementById('dashboard-page').classList.add('active');
  loadReports();
}

// =====================
// LOAD REPORTS
// =====================
async function loadReports() {
  if (useDemoMode) {
    allReports = DEMO_DATA;
    renderTable(allReports);
    updateStats(allReports);
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/get_reports.php`);
    const data = await res.json();
    allReports = data;
    renderTable(allReports);
    updateStats(allReports);
  } catch (e) {
    allReports = DEMO_DATA;
    renderTable(allReports);
    updateStats(allReports);
  }
}

// =====================
// RENDER TABLE
// =====================
function renderTable(data) {
  const tbody = document.getElementById('table-body');

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="loading">Aucun résultat trouvé.</td></tr>';
    return;
  }

  tbody.innerHTML = data.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><b>${r.nom}</b></td>
      <td>${r.email}</td>
      <td>${r.semaine}</td>
      <td>${r.fichier ? `📄 ${r.fichier}` : '—'}</td>
      <td>${r.date_depot || '—'}</td>
      <td>${badgeHTML(r.statut)}</td>
      <td><button class="btn-view" onclick="viewDetails(${r.id})">Voir</button></td>
    </tr>
  `).join('');
}

function badgeHTML(statut) {
  if (statut === 'Déposé') return `<span class="badge badge-green">✅ Déposé</span>`;
  if (statut === 'En retard') return `<span class="badge badge-red">⚠️ En retard</span>`;
  return `<span class="badge badge-orange">⏳ En attente</span>`;
}

// =====================
// STATS
// =====================
function updateStats(data) {
  document.getElementById('stat-total').textContent = data.length;
  document.getElementById('stat-depose').textContent = data.filter(r => r.statut === 'Déposé').length;
  document.getElementById('stat-attente').textContent = data.filter(r => r.statut === 'En attente').length;
  document.getElementById('stat-retard').textContent = data.filter(r => r.statut === 'En retard').length;
}

// =====================
// FILTERS
// =====================
function filterTable() {
  const search = document.getElementById('search-input').value.toLowerCase();
  const statut = document.getElementById('filter-statut').value;
  const semaine = document.getElementById('filter-semaine').value;

  const filtered = allReports.filter(r => {
    const matchSearch = r.nom.toLowerCase().includes(search) || r.email.toLowerCase().includes(search);
    const matchStatut = statut === '' || r.statut === statut;
    const matchSemaine = semaine === '' || r.semaine === semaine;
    return matchSearch && matchStatut && matchSemaine;
  });

  renderTable(filtered);
  updateStats(filtered);
}

// =====================
// MODAL
// =====================
function viewDetails(id) {
  const r = allReports.find(x => x.id === id);
  if (!r) return;

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-row"><span class="modal-label">Étudiant</span><span><b>${r.nom}</b></span></div>
    <div class="modal-row"><span class="modal-label">Email</span><span>${r.email}</span></div>
    <div class="modal-row"><span class="modal-label">Semaine</span><span>${r.semaine}</span></div>
    <div class="modal-row"><span class="modal-label">Fichier</span><span>${r.fichier || 'Non déposé'}</span></div>
    <div class="modal-row"><span class="modal-label">Date de dépôt</span><span>${r.date_depot || '—'}</span></div>
    <div class="modal-row"><span class="modal-label">Statut</span><span>${badgeHTML(r.statut)}</span></div>
  `;
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

// Close modal on outside click
document.getElementById('modal')?.addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Enter key on login
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.getElementById('login-page').classList.contains('active')) {
    login();
  }
});
