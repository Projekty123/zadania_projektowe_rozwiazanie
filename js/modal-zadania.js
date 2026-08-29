window.app = window.app || {};

app.openTaskModal = function (taskId = null) {
  const modal = document.getElementById('modal-task');
  const form = document.getElementById('form-task');
  const modalTitle = document.getElementById('modal-task-title');

  form.reset();
  document.getElementById('task-id').value = '';

  if (taskId) {
    const task = app.getTaskById(taskId);
    if (!task) return;

    modalTitle.innerText = 'Edytuj zadanie';
    document.getElementById('task-id').value = task.id;
    document.getElementById('task-title').value = task.tytul;
    document.getElementById('task-desc').value = task.opis || '';
    document.getElementById('task-priority').value = task.priorytet;
    document.getElementById('task-status').value = task.status;
    document.getElementById('task-due-date').value = task.termin;
    document.getElementById('task-person').value = task.osoba;
  } else {
    modalTitle.innerText = 'Dodaj nowe zadanie';
  }

  modal.showModal();
};

document.getElementById('form-task').addEventListener('submit', function (e) {
  e.preventDefault();

  const taskData = {
    id: document.getElementById('task-id').value,
    tytul: document.getElementById('task-title').value.trim(),
    opis: document.getElementById('task-desc').value.trim(),
    priorytet: document.getElementById('task-priority').value,
    status: document.getElementById('task-status').value,
    termin: document.getElementById('task-due-date').value,
    osoba: document.getElementById('task-person').value.trim()
  };

  // Walidacja
  if (!taskData.tytul || !taskData.priorytet || !taskData.status || !taskData.termin || !taskData.osoba) {
    alert('Uzupełnij wszystkie wymagane pola!');
    return;
  }

  app.saveTaskData(taskData);
  document.getElementById('modal-task').close();
  app.render();
});