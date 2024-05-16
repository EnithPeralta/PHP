<?php
    include('../models/ProductoDAO.php');
    $productoDAO = new ProductosDAO();
    $productos = $productoDAO->traerDatos($_GET['id']);
    print_r(json_encode($productos));
?>