<?php
    include('../models/ProductoDAO.php');
    $productoDAO = new ProductosDAO();
    $productos = $productoDAO->traerProducto();
    print_r(json_encode($productos));
?>