window.app = window.app || {};

// Ładowanie i zapisywanie stanu panelu filtrowania
function initFilterCollapse() {
  const toggle = document.getElementById('filter-toggle');
  const savedState = localStorage.getItem('filter_panel_open');

  if (savedState !== null) {
    toggle.checked = JSON.parse(savedState);
  }

  toggle.addEventListener('change', function () {
    localStorage.setItem('filter_panel_open', JSON.stringify(this.checked));
  });
}

// Mapowanie badgeow dla priorytetów i statusów
function getPriorityBadge(priority) {
  switch (priority) {
    case 'niski': return '<span class="badge badge-ghost">Niski</span>';
    case 'sredni': return '<span class="badge badge-warning">Średni</span>';
    case 'wysoki': return '<span class="badge badge-error text-white">Wysoki</span>';
    default: return priority;
  }
}

function getStatusBadge(status) {
  switch (status) {
    case 'do zrobienia': return '<span class="badge badge-neutral">Do zrobienia</span>';
    case 'w trakcie': return '<span class="badge badge-info text-white">W trakcie</span>';
    case 'zrobione': return '<span class="badge badge-success text-white">Zrobione</span>';
    default: return status;
  }
}

// Renderowanie podsumowania
function updateSummary(filteredTasks) {
  document.getElementById('stat-total').innerText = filteredTasks.length;
  document.getElementById('stat-todo').innerText = filteredTasks.filter(t => t.status === 'do zrobienia').length;
  document.getElementById('stat-in-progress').innerText = filteredTasks.filter(t => t.status === 'w trakcie').length;
  document.getElementById('stat-done').innerText = filteredTasks.filter(t => t.status === 'zrobione').length;
  document.getElementById('stat-overdue').innerText = filteredTasks.filter(t => app.isOverdue(t)).length;
}

// Filtrowanie i Sortowanie
function getFilteredAndSortedTasks() {
  const titleVal = document.getElementById('filter-title').value.toLowerCase();
  const personVal = document.getElementById('filter-person').value.toLowerCase();
  const statusVal = document.getElementById('filter-status').value;
  const priorityVal = document.getElementById('filter-priority').value;

  let result = app.tasks.filter(task => {
    const matchTitle = task.tytul.toLowerCase().includes(titleVal);
    const matchPerson = task.osoba.toLowerCase().includes(personVal);
    const matchStatus = statusVal ? task.status === statusVal : true;
    const matchPriority = priorityVal ? task.priorytet === priorityVal : true;

    return matchTitle && matchPerson && matchStatus && matchPriority;
  });

  // Sortowanie po terminie wykonania
  result.sort((a, b) => {
    if (app.currentSort === 'asc') {
      return new Date(a.termin) - new Date(b.termin);
    } else if (app.currentSort === 'desc') {
      return new Date(b.termin) - new Date(a.termin);
    } else if (app.currentSort === 'name') {
      return a.tytul.localeCompare(b.tytul);
    }
    return 0;
  });

  return result;
}

// Główna funkcja renderująca
app.render = function () {
  const tbody = document.getElementById('tasks-table-body');
  tbody.innerHTML = '';

  const tasksToDisplay = getFilteredAndSortedTasks();

  if (tasksToDisplay.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-6 text-gray-500">Brak zadań do wyświetlenia.</td></tr>`;
    updateSummary([]);
    return;
  }

  tasksToDisplay.forEach(task => {
    const overdue = app.isOverdue(task);
    const notesCount = task.uwagi ? task.uwagi.length : 0;
    
    const notesBadge = notesCount > 0 
      ? `<span class="badge badge-primary cursor-pointer" onclick="app.openDetailsModal(${task.id})">${notesCount}</span>`
      : `<span class="badge badge-ghost cursor-pointer" onclick="app.openDetailsModal(${task.id})">0</span>`;

    const tr = document.createElement('tr');
    if (overdue) tr.classList.add('bg-error/10'); // wyróżnienie zaległego wiersza

    tr.innerHTML = `
      <td class="font-semibold cursor-pointer text-primary hover:underline" onclick="app.openDetailsModal(${task.id})">${task.tytul}</td>
      <td>${task.osoba}</td>
      <td>${getPriorityBadge(task.priorytet)}</td>
      <td>${getStatusBadge(task.status)}</td>
      <td>${task.termin}</td>
      <td>${notesBadge}</td>
      <td>${overdue ? '<span class="badge badge-error text-white font-bold">Zaległe</span>' : '<span class="text-gray-400">-</span>'}</td>
      <td class="text-right space-x-1">
        <button class="btn btn-square btn-ghost btn-xs" onclick="app.openTaskModal(${task.id})">✏️</button>
        <button class="btn btn-square btn-ghost btn-xs text-error" onclick="app.deleteTask(${task.id})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  updateSummary(tasksToDisplay);
};

// Event Listenery
document.addEventListener('DOMContentLoaded', () => {
  app.loadTasks();
  initFilterCollapse();
  app.render();

  document.getElementById('btn-add-task').addEventListener('click', () => app.openTaskModal());
  document.getElementById('btn-clear-all').addEventListener('click', () => app.clearAllTasks());

  // filtry
  ['filter-title', 'filter-person', 'filter-status', 'filter-priority'].forEach(id => {
    document.getElementById(id).addEventListener('input', app.render);
    document.getElementById(id).addEventListener('change', app.render);
  });

  // Opcje sortowania
  document.getElementById('sort-desc').addEventListener('click', () => { app.currentSort = 'desc'; app.render(); });
  document.getElementById('sort-asc').addEventListener('click', () => { app.currentSort = 'asc'; app.render(); });
  document.getElementById('sort-name').addEventListener('click', () => { app.currentSort = 'name'; app.render(); });
});