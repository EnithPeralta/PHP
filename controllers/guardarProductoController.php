<?php
    include("../models/ProductoDAO.php");
    $productoDAO = new ProductosDAO();
    if($_REQUEST['id']){
        $productoDAO->guardarProducto($_REQUEST['nombre'],$_REQUEST['descripcion']);
    }else{
        $productoDAO->actualizarProducto($_REQUEST['nombre'],$_REQUEST['descripcion']);
    }

?>