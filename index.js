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
                <td><button onclick='traerDatos(${row.id})' type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" >Editar</button></td>
                <td><button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#confirmModal-${row.id}">Eliminar</button>
                <div class="modal fade" id="confirmModal-${row.id}" tabindex="-1" role="dialog" aria-labelledby="confirmModalLabel-${row.id}" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="confirmModalLabel">Deseas eliminar este registro</h5>
                    </div>
                    <div class="modal-body">
                       ¿Estás seguro de que deseas continuar?
                    </div>
                    <div class="modal-footer">
                          <button type="button" class="btn btn-outline-info" data-dismiss="modal">Cancelar</button>
                          <button class="btn btn-outline-danger" data-dismiss="modal" onClick='eliminarProducto(${row.id})'>Eliminar</button>
                    </div>
                  </div>
                </div>
                </div>
        </td>
            `;
        tablaDatos.appendChild(tr);
      });
    });
}

function limpiarFormulario() {
  var inputId = document.getElementById("id");
  var inputNombre = document.getElementById("nombre");
  var inputDescripcion = document.getElementById("descripcion");
  inputId.value = "";
  inputNombre.value = "";
  inputDescripcion.value = "";
}
function guardarProducto(id, nombre, descripcion) {
  fetch(
    `./controllers/guardarProductoController.php?id=${id}&nombre=${nombre}&descripcion=${descripcion}`
  )
    .then((response) => response.text())
    .then((data) => {
      limpiarFormulario();
      cargarDatos();
    });
}

const modal = document.getElementById("exampleModal");
console.log(modal);

function eliminarProducto(id) {
  fetch("./controllers/eliminarProductoController.php?id=" + id)
    .then((response) => response.text())
    .then((data) => {
      cargarDatos();
      mostrarAlerta("Se Elimino Con Exito");
    });
}

function agregarProducto() {
  const id = document.getElementById("id").value;
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;

  fetch(
    `./controllers/agregarProductoController.php?id=${id}&nombre=${nombre}&descripcion=${descripcion}`
  )
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      cargarDatos();
      mostrarAlerta("Se Agregado Con Exito");
      console.log(data);
      document.getElementById("id").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("descripcion").value = "";
    });
}

function traerDatos(id) {
  fetch(`./controllers/traerDatosController.php?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      var inputCodigo = document.getElementById("id");
      var inputNombre = document.getElementById("nombre");
      var inputDescripcion = document.getElementById("descripcion");
      inputCodigo.value = data["id"];
      inputNombre.value = data["nombre"];
      inputDescripcion.value = data["descripcion"];
    });

  var boton = document.getElementById("submit-btn");
  boton.onclick = function () {
    var inputCodigo = document.getElementById("id");
    var inputNombre = document.getElementById("nombre");
    var inputDescripcion = document.getElementById("descripcion");
    var valId = inputCodigo.value;
    var valNombre = inputNombre.value;
    var valDescripcion = inputDescripcion.value;
    limpiarFormulario();
    guardarProducto(valId, valNombre, valDescripcion);
    mostrarAlerta("Se Actualizo Con Exito");
  };
}
function mostrarAlerta(mensage) {
  var alerta = document.getElementById("alerMessange");
  alerta.innerHTML = mensage;
  alerta.hidden = false;
}
cargarDatos();
