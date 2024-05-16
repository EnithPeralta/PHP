<?php
    include("../models/ProductoDAO.php");
    $productoDAO = new ProductosDAO();
    if($_REQUEST['id']==''){
        $productoDAO->agregarProducto($_GET['id'], $_GET['nombre'], $_GET['descripcion']);
    }else{
        $productoDAO->actualizarProducto($_REQUEST['id'],$_REQUEST['nombre'],$_REQUEST['descripcion']);
    }

?>