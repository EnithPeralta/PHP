function cargarDatos() {
  fetch("./controllers/traerProductoController.php")
    .then((response) => response.json())
    .then((data) => {
      const tablaDatos = document.getElementById("tablaDatos");
      tablaDatos.innerHTML = "";
      data.forEach((row) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.nombre}</td>
            <td>${row.descripcion}</td>
            <td>
                <button class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" onClick="traerDatos(${row.id},${row.nombre},${row.descripcion})")">
                    <ion-icon name="create-outline"></ion-icon>
                </button>
                <button class="btn btn-outline-danger" onClick="eliminarProducto(${row.id})">
                <ion-icon name="trash-outline"></ion-icon>
                </button>
            </td>
            `;
        tablaDatos.appendChild(tr);
      });
    });
}

function eliminarProducto(id) {
  fetch("./controllers/eliminarProductoController.php?id=" + id);
  Swal.fire({
    title: "Esta usted seguro de desea eliminar el producto",
    showDenyButton: true,
    confirmButtonText: "Si",
    denyButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

function agregarProducto() {
  fetch(
    "./controllers/agregarProductoController.php?id=${id}&nombre=${nombre}&descripcion=${descripcion}"
  )
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      document.getElementById("id").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("descripcion").value = "";
    });
}
function limpiarFormulario() {
  var inputId = document.getElementById("id");
  var input = document.getElementById("nombre");
  var inputDescripcion = document.getElementById("descripcion");
  inputId.value = "";
  input.value = "";
  inputDescripcion.value = "";
}

function traerDatos(id) {
  fetch("./controllers/traerDatosController.php?id=" + id)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var inputId = document.getElementById("id");
      var input = document.getElementById("nombre");
      var inputDescripcion = document.getElementById("descripcion");
      inputId.value = data.id;
      input.value = data.nombre;
      inputDescripcion.value = data.descripcion;
    });
  const submitBtn = document.getElementById("submit-btn");
  submitBtn.onclick = function () {
    var inputId = document.getElementById("id");
    var input = document.getElementById("nombre");
    var inputDescripcion = document.getElementById("descripcion");
    var valId = inputId.value;
    var valNombre = input.value;
    var valDescripcion = inputDescripcion.value;
    guardarProducto(valId, valNombre, valDescripcion);
  };
}
function guardarProdcuto(id, nombre, descripcion) {
  fetch(
    "./controllers/guardarProductoController.php?id=" +
      id +
      "$nombre" +
      nombre +
      "$descripcion" +
      descripcion
  )
    .then((response) => response.text())
    .then((data) => {
      limpiarFormulario();
      cargarDatos();
    });
}
cargarDatos();

/*
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("hola mundos");
});
*/
/*
function handleSubmit(e) {
  e.preventDefault();
  console.log("sajjajaja");
}
*/
