let txbxTask = document.getElementById("txbx-task");
let tblTasks = document.getElementById("tasklist");
let id = 0;

//let arrLocalStorage = [];
let allTasks = JSON.parse(localStorage.getItem("arrLocalStorage")) || [];
renderHTML();
function addTask() {
  let newTask = txbxTask.value;
  id++;
  let task = {
    taskName: newTask,
    taskId: id,
    taskStatus: false,
    taskDeleted: false,
  };
  allTasks.push(task);

  //console.log(allTasks);
  renderHTML();
}

function delTask(id) {
  allTasks = allTasks.filter((x) => x.taskId != id);
  renderHTML();
}

function renderHTML() {
  localStorage.setItem("arrLocalStorage", JSON.stringify(allTasks));
  console.log(localStorage.getItem("arrLocalStorage"));
  tblTasks.innerHTML = "";
  allTasks.forEach((x) => {
    let newTaskRow = `<tr>
              <td><i onclick='taskChecked(${x.taskId});' class=" ${
      x.taskStatus ? "fa fa-check-square-o" : "fa fa-square-o"
    }"></i></td>
                <td style="text-decoration: ${
                  x.taskStatus ? "line-through" : ""
                };">${x.taskName}</td>
                <td><button  class="btn btn-danger" onclick="delTask(${
                  x.taskId
                });">Del</button></td>
              </tr>`;

    tblTasks.innerHTML += newTaskRow;
  });

  txbxTask.value = "";
}

function taskChecked(taskPId) {
  let requireTask = allTasks.find((x) => x.taskId == taskPId);
  allTasks.find((x) => x.taskId == taskPId).taskStatus =
    !requireTask.taskStatus;
  renderHTML();
}

function clearLocalStorage() {
  localStorage.clear();
  allTasks = [];
  renderHTML();
}
