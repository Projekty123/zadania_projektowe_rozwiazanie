window.app = window.app || {};

app.activeTaskId = null;

app.openDetailsModal = function (taskId) {
  app.activeTaskId = Number(taskId);
  const task = app.getTaskById(app.activeTaskId);
  if (!task) return;

  document.getElementById('detail-title').innerText = task.tytul;
  document.getElementById('detail-meta').innerText = `Osoba: ${task.osoba} | Termin: ${task.termin}`;
  document.getElementById('detail-desc').innerText = task.opis || 'Brak opisu.';

  app.resetNoteForm();
  app.renderNotes();
  
  document.getElementById('modal-details').showModal();
};

app.renderNotes = function () {
  const task = app.getTaskById(app.activeTaskId);
  const tbody = document.getElementById('notes-table-body');
  tbody.innerHTML = '';

  if (!task || !task.uwagi || task.uwagi.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-center text-gray-400">Brak uwag</td></tr>`;
    return;
  }

  task.uwagi.forEach(note => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="break-words">${note.tresc}</td>
      <td class="whitespace-nowrap text-xs text-gray-500">${note.dataUtworzenia}</td>
      <td class="text-right whitespace-nowrap">
        <button class="btn btn-ghost btn-xs text-info" onclick="app.editNote(${note.id})">✏️</button>
        <button class="btn btn-ghost btn-xs text-error" onclick="app.deleteNote(${note.id})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
};

app.resetNoteForm = function () {
  document.getElementById('form-note').reset();
  document.getElementById('note-id').value = '';
  document.getElementById('btn-save-note').innerText = 'Dodaj uwagę';
  document.getElementById('btn-cancel-note').classList.add('hidden');
};

document.getElementById('form-note').addEventListener('submit', function (e) {
  e.preventDefault();
  const task = app.getTaskById(app.activeTaskId);
  if (!task) return;

  const noteId = document.getElementById('note-id').value;
  const text = document.getElementById('note-text').value.trim();

  if (!text) return;

  if (noteId) {
    // Edycja uwagi
    const note = task.uwagi.find(n => n.id === Number(noteId));
    if (note) {
      note.tresc = text;
    }
  } else {
    // Nowa uwaga
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toTimeString().slice(0, 5)}`;
    
    const newNote = {
      id: Date.now(),
      tresc: text,
      dataUtworzenia: formattedDate
    };
    task.uwagi.push(newNote);
  }

  app.saveTasks();
  app.resetNoteForm();
  app.renderNotes();
  app.render(); // Aktualizacja liczby uwag 
});

app.editNote = function (noteId) {
  const task = app.getTaskById(app.activeTaskId);
  const note = task.uwagi.find(n => n.id === Number(noteId));
  if (!note) return;

  document.getElementById('note-id').value = note.id;
  document.getElementById('note-text').value = note.tresc;
  document.getElementById('btn-save-note').innerText = 'Zapisz';
  document.getElementById('btn-cancel-note').classList.remove('hidden');
};

document.getElementById('btn-cancel-note').addEventListener('click', app.resetNoteForm);

app.deleteNote = function (noteId) {
  const task = app.getTaskById(app.activeTaskId);
  if (!task) return;

  task.uwagi = task.uwagi.filter(n => n.id !== Number(noteId));
  app.saveTasks();
  app.renderNotes();
  app.render();
};