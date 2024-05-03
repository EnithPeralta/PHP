<?php
    include('ProductoDAO.php');
    $productoDAO = new ProductosDAO();
    $productos = $productoDAO->TraerProducto();
    print_r(json_encode($productos));
?>