<?php
    include("../models/ProductoDAO.php");
    $productoDAO = new ProductosDAO();
    $mensage = $productoDAO->eliminarProducto($_GET['id']);
?>