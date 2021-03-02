let arrayProgress = [];
let arrayDeleted = [];
let arrayDone = [];
const btnSubmit = document.querySelector("#btnSubmit");
const deskProgress = document.querySelector("#deskProgress");
const deskDeleted = document.querySelector("#deskDeleted");
const deskDone = document.querySelector("#deskDone");
const editModal = document.querySelector("#editModal");
let taskToEdit;
let deskToEdit;

//=====================EVENTS===========================

editModal.addEventListener("click", (event) => {
  if (event.target.closest("#btnClose")) {
    editModal.style.display = "none";
  } else if (event.target.closest("#btnConfirm")) {
    const nameToEdit = taskToEdit.querySelector(".nameValue").textContent;
    const descriptionToEdit = taskToEdit.querySelector(".descriptionValue")
      .textContent;
    const nameEdit = editModal.querySelector("#nameEdit").value;
    const descriptionEdit = editModal.querySelector("#descriptionEdit").value;
    changeTask(nameToEdit, descriptionToEdit, nameEdit, descriptionEdit);
  }
});

btnSubmit.addEventListener("click", (event) => {
  addTask(event, arrayProgress);
  event.preventDefault();
  drawTaskProgress();
  form = event.target.closest("#toDoForm");
  form.reset();
});

deskProgress.addEventListener("click", (event) => {
  findEventProgress(event);
});

deskDeleted.addEventListener("click", (event) => {
  findEventDeleted(event);
});

deskDone.addEventListener("click", (event) => {
  findEventDone(event);
});

//=====================FUNCTIONS==========================

function addTask(event, array) {
  const inputName = document.querySelector("#inputName").value;
  const inputDescription = document.querySelector("#inputDescription").value;

  array.push({
    name: inputName,
    description: inputDescription,
  });
}

function drawTaskProgress() {
  const deskProgress__tasks = document.querySelector("#deskProgress__tasks");
  deskProgress__tasks.innerHTML = "";
  arrayProgress.forEach((item) => {
    deskProgress__tasks.innerHTML += `
    <div class = "task task_margin">
      <h3 class = "nameValue nameValue_margin">${item.name}</h3>
      <small class = "descriptionValue descriptionValue_margin">${item.description}</small>
      <div class="task_btns task_btns_margin">
        <button class="btnDelete"></button>
        <button class="btnEdit"></button>
        <button class="btnDone"></button>
      </div>
    </div>`;
  });
}

function drawTaskDone() {
  const deskDone__tasks = document.querySelector("#deskDone__tasks");
  deskDone__tasks.innerHTML = "";
  arrayDone.forEach((item) => {
    deskDone__tasks.innerHTML += `
    <div class = "task task_margin">
      <h3 class = "nameValue nameValue_margin">${item.name}</h3>
      <small class = "descriptionValue descriptionValue_margin">${item.description}</small>
      <div class="task_btns task_btns_margin">
        <button class="btnDelete"></button>
        <button class="btnEdit"></button>
        <button class="btnDone"></button>
      </div>
    </div>`;
  });
}

function drawTaskDeleted() {
  const deskDeleted__tasks = document.querySelector("#deskDeleted__tasks");
  deskDeleted__tasks.innerHTML = "";
  arrayDeleted.forEach((item) => {
    deskDeleted__tasks.innerHTML += `
    <div class = "task task_margin">
      <h3 class = "nameValue nameValue_margin">${item.name}</h3>
      <small class = "descriptionValue descriptionValue_margin">${item.description}</small>
      <div class="task_btns task_btns_margin">
        <button class="btnDelete"></button>
        <button class="btnEdit"></button>
        <button class="btnDone"></button>
      </div>
    </div>`;
  });
}

function changeTask(nameToEdit, descriptionToEdit, nameEdit, descriptionEdit) {
  if (deskToEdit === deskProgress) {
    arrayProgress.forEach((item, index) => {
      if (nameToEdit === item.name && descriptionToEdit === item.description) {
        arrayProgress.splice(index, 1, {
          name: nameEdit,
          description: descriptionEdit,
        });
      }
    });
    closeModal();
    drawTaskProgress();
  } else if (deskToEdit === deskDeleted) {
    arrayDeleted.forEach((item, index) => {
      if (nameToEdit === item.name && descriptionToEdit === item.description) {
        arrayDeleted.splice(index, 1, {
          name: nameEdit,
          description: descriptionEdit,
        });
      }
    });
    closeModal();
    drawTaskDeleted();
  } else if (deskToEdit === deskDone) {
    arrayDone.forEach((item, index) => {
      if (nameToEdit === item.name && descriptionToEdit === item.description) {
        arrayDone.splice(index, 1, {
          name: nameEdit,
          description: descriptionEdit,
        });
      }
    });
    closeModal();
    drawTaskDone();
  }
}

// progress

function findEventProgress(event) {
  const task = event.target.closest(".task");
  const deskProgress = document.querySelector("#deskProgress");
  const btnDelete = task.querySelector(".btnDelete");
  const btnDone = task.querySelector(".btnDone");
  const btnEdit = task.querySelector(".btnEdit");
  if (event.target === btnDelete) {
    arrayProgress = moveToDeleted(event, arrayProgress, task);
    drawTaskProgress();
    drawTaskDeleted();
  } else if (event.target === btnDone) {
    arrayProgress = moveToDone(event, arrayProgress, task);
    drawTaskProgress();
    drawTaskDone();
  } else if (event.target === btnEdit) {
    openModal();
    taskToEdit = event.target.closest(".task");
    deskToEdit = deskProgress;
  }
}

function moveToDeleted(event, array, task) {
  const name = task.querySelector(".nameValue").textContent;
  const description = task.querySelector(".descriptionValue").textContent;
  arrayDeleted.push({
    name: name,
    description: description,
  });
  const result = array.filter(function del(item) {
    if (item.name != name && item.description != description) return item;
  });
  array = result;
  return array;
}

function moveToDone(event, array, task) {
  const name = task.querySelector(".nameValue").textContent;
  const description = task.querySelector(".descriptionValue").textContent;
  arrayDone.push({
    name: name,
    description: description,
  });
  const result = array.filter(function del(item) {
    if (item.name != name && item.description != description) return item;
  });
  array = result;
  return array;
}

function openModal() {
  const editModal = document.querySelector("#editModal");
  editModal.style.display = "block";
}

function closeModal() {
  const editModal = document.querySelector("#editModal");
  editModal.style.display = "none";
}

function editTask() {
  const editModal = document.querySelector("#editModal");
  name = editModal.querySelector("#nameEdit").value;
  description = editModal.querySelector("#descriptionEdit").value;
}

function getEditData(modal) {
  const name = modal.querySelector("nameEdit");
  const description = modal.querySelector("descriptionEdit");
}

// deleted

function findEventDeleted(event) {
  const task = event.target.closest(".task");
  const btnDelete = task.querySelector(".btnDelete");
  const btnEdit = task.querySelector(".btnEdit");
  const btnDone = task.querySelector(".btnDone");
  if (event.target === btnDelete) {
    arrayDeleted = deleteTask(task, arrayDeleted);
    drawTaskDeleted();
  } else if (event.target === btnDone) {
    arrayDeleted = moveToDone(event, arrayDeleted, task);
    drawTaskDeleted();
    drawTaskDone();
  } else if (event.target === btnEdit) {
    openModal();
    taskToEdit = event.target.closest(".task");
    deskToEdit = deskDeleted;
  }
}

function deleteTask(task, array) {
  const name = task.querySelector(".nameValue").textContent;
  const description = task.querySelector(".descriptionValue").textContent;
  const result = array.filter(function del(item) {
    if (item.name != name && item.description != description) return item;
  });
  array = result;
  return array;
}

// done

function findEventDone(event) {
  const task = event.target.closest(".task");
  const btnEdit = task.querySelector(".btnEdit");
  const btnDelete = task.querySelector(".btnDelete");
  if (event.target === btnDelete) {
    arrayDone = moveToDeleted(event, arrayDone, task);
    drawTaskDone();
    drawTaskDeleted();
  } else if (event.target === btnEdit) {
    openModal();
    taskToEdit = event.target.closest(".task");
    deskToEdit = deskDone;
  }
}
