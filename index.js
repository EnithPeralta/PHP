function cargarDatos(){
    fetch('traerProductoController.php')
    .then(response =>response.json())
    .then(data =>{
        const tablaDatos = document.getElementById('tablaDatos');
        tablaDatos.innerHTML = '';
        data.forEach(row =>{
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.nombre}</td>
            <td>${row.descripcion}</td>
            <td>
            <ion-icon name="create-outline"></ion-icon>
            <ion-icon name="trash-outline"></ion-icon>
            </td>
            `;
            tablaDatos.appendChild(tr);
        });
    });
}
cargarDatos();
