import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { show_alert } from "../funtions";

const ProductShow = ({ eliminarProduct, products, setProducts }) => {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [operacion, setOperacion] = useState(1);
  const [title, setTitle] = useState("");
  
  const openModal = (op, id = "", nombre = "", descripcion = "") => {
    setId(id);
    setNombre(nombre);
    setDescripcion(descripcion);
    setOperacion(op);
    setTitle(op === 1 ? "Registrar Producto" : "Editar Producto");
    setTimeout(() => {
      document.getElementById("nombre").focus();
    }, 500);
  };

  const validar = async () => {
    if (operacion === 1) {
      const producto = { nombre, descripcion };
      try {
        const response = await fetch("http://localhost/php/api/index.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(producto),
        });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }
        const data = await response.json();
        setProducts((productos) => [...productos, data]);
        Swal.fire({
          text: "El producto ha sido agregado con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } catch (error) {
        console.error("Error al agregar el producto:", error);
        Swal.fire({
          text: "Hubo un error al agregar el producto. Por favor revisa la consola para más detalles.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } else {
      const producto = { id, nombre, descripcion };

      try {
        const response = await fetch(`http://localhost/php/api/index.php`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(producto),
        });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }
        const data = await response.json();
        setProducts((productos) => productos.map((prod) => (prod.id === id ? data : prod)));
        Swal.fire({
          text: "El producto ha sido editado con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } catch (error) {
        console.error("Error al editar el producto:", error);
        Swal.fire({
          text: "Hubo un error al editar el producto. Por favor revisa la consola para más detalles.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

const deleteProduct = (id) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esto",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0AC448",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminarlo",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarProduct(id);
      Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
    }
  });
};

return (
  <div>
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grip mx-auto">
              <button
              type="submit"
                onClick={() => openModal(1)}
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#modalProducts"
              >
                <i className="fa solid fa-circle-plus p-2"></i>
                Agregar
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-lg-2">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {products?.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.nombre}</td>
                      <td>{product.descripcion}</td>
                      <td>
                        <button
                          onClick={() =>
                            openModal(
                              2,
                              product.id,
                              product.nombre,
                              product.descripcion
                            )
                          }
                          className="btn btn-outline-warning d-grid gap-2  "
                          data-bs-toggle="modal"
                          data-bs-target="#modalProducts"
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        &nbsp;
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="btn btn-outline-danger d-grid gap-2"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="modalProducts" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <label className="h5">{title}</label>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input type="hidden" id="id" />
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-gift"></i>
              </span>
              <input
                type="text"
                id="nombre"
                className="form-control"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-comment"></i>
              </span>
              <input
                type="text"
                id="descripcion"
                className="form-control"
                placeholder="Descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <div className="d-grip col-6 mx-auto">
              <button onClick={validar} className="btn btn-outline-info">
                <i className="fa-solid fa-floppy-disk p-2"></i>
                Guardar
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              id="cerrar"
              className="btn btn-outline-danger"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
export default ProductShow
