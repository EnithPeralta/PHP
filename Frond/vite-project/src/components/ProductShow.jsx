import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductShow = () => {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [operacion, setOperacion] = useState(1);
  const [title, setTitle] = useState('');

  const url = 'http://localhost/php/api/index.php';

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const openModal = (op, id = '', nombre = '', descripcion = '') => {
    setId(id);
    setNombre(nombre);
    setDescripcion(descripcion);
    setOperacion(op);
    setTitle(op === 1 ? 'Registrar Producto' : 'Editar Producto');
    setTimeout(() => {
      document.getElementById('nombre').focus();
    }, 500);
  };

  const validar = () => {
    let parametros;
    let metodo;
    if (nombre.trim() === '') {
      show_alert('Escribe el nombre del producto', 'warning');
    } else if (descripcion.trim() === '') {
      show_alert('Escribe la descripcion del producto', 'warning');
    } else {
      if (operacion === 1) {
        parametros = { nombre: nombre.trim(), descripcion: descripcion.trim() };
        metodo = 'POST';
      } else {
        parametros = { id, nombre: nombre.trim(), descripcion: descripcion.trim() };
        metodo = 'PUT';
      }
      enviarSolicitud(metodo, parametros);
    }
  };

  const enviarSolicitud = async (metodo, parametros) => {
    try {
      const response = await axios({
        method: metodo,
        url: url,
        data: parametros
      });
      const [tipo, msj] = response.data;
      show_alert(msj, tipo);
      if (tipo === 'success') {
        document.getElementById('cerrar').click();
        getProducts();
      }
    } catch (error) {
      show_alert('Error en la solicitud', 'error');
      console.error('Error in request:', error);
    }
  };

  const deleteProduct = (id, nombre) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Seguro que desea eliminar el producto ${nombre}?`,
      icon: 'question',
      text: 'No se podrá dar marcha atrás',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        enviarSolicitud('DELETE', { id });
      } else {
        show_alert('El producto no fue eliminado', 'info');
      }
    });
  };
  return (
    <div>
      <div className='App'>
        <div className='container-fluid'>
          <div className='row mt-3'>
            <div className='col-md-4 offset-4'>
              <div className='d-grip mx-auto'>
                <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                  <i className='fa solid fa-circle-plus'></i>
                  Agregar
                </button>
              </div>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-12 col-lg-8 offset-0 offset-lg-12'>
              <div className='table'>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Descripcion</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className='table-group-divider'>
                    {products.map((product, i) => (
                      <tr key={product.id}>
                        <td>{i + 1}</td>
                        <td>{product.nombre}</td>
                        <td>{product.descripcion}</td>
                        <td>
                          <button
                            onClick={() => openModal(2, product.id, product.nombre, product.descripcion)}
                            className='btn btn-outline-warning'
                            data-bs-toggle='modal'
                            data-bs-target='#modalProducts'
                          >
                            <i className='fa-solid fa-edit'></i>
                          </button>
                          &nbsp;
                          <button onClick={() => deleteProduct(product.id, product.nombre)} className='btn btn-outline-danger'>
                            <i className='fa-solid fa-trash'></i>
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
      <div id='modalProducts' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className="h5">{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <input type="hidden" id='id' />
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-gift'></i>
                </span>
                <input
                  type="text"
                  id='nombre'
                  className='form-control'
                  placeholder='Nombre'
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-comment'></i>
                </span>
                <input
                  type="text"
                  id='descripcion'
                  className='form-control'
                  placeholder='Descripcion'
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div className='d-grip col-6 mx-auto'>
                <button onClick={validar} className='btn btn-outline-info'>
                  <i className='fa-solid fa-floppy-disk'></i>
                  Guardar
                </button>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' id='cerrar' className='btn btn-outline-danger' data-bs-dismiss='modal'>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductShow;
