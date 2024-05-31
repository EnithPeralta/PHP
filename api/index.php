<?php
include('../models/ProductoDAO.php');
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$method = $_SERVER['REQUEST_METHOD'];
$productoDAO = new ProductosDAO();

switch ($method) {
  case 'GET':
    $productos = $productoDAO->traerProducto();
    echo json_encode($productos);
    break;
  case 'POST':
    $data = json_decode(file_get_contents('php://input'), true);
    $productos = $productoDAO->agregarProducto($data->id, $data->nombre, $data->descripcion);
    echo json_encode($productos);
    break;
  case 'PUT':
    $data = json_decode(file_get_contents('php://input'), true);
    $productos = $productoDAO->actualizarProducto(data->id, $data->nombre, $data->descripcion);
   echo(json_encode($productos));
    break;
  case 'DELETE':
    $path = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO']: '/';
    $buscarId = explode('/',$path);
    $id = $buscarId != '/' ? end ($buscarId): null;
    $eliminarProducto = $productoDAO->eliminarProducto($id);
    echo $eliminarProducto;
    // $data = json_decode(file_get_contents('php://input'), true);
    // $productos = $productoDAO->eliminarProducto($data['id']);
    // echo json_encode($productos);
    break;
  case 'OPTIONS':
    header("HTTP/1.1 200 OK");
    break;
  default:
    http_response_code(405);
    echo json_encode(array("mensage" => "Metodo No"));
    break;
}
?>
