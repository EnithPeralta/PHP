<?php
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$productoDAO = new ProductosDAO();

switch ($method) {
  case 'GET':
    $productos = $productoDAO->traerProducto();
    print_r(json_encode($productos));
    break;
  case 'POST':
    $data = json_decode(file_get_contents('php://input'), true);
    $productos = $productoDAO->agregarProducto($data['id'], $data['nombre'], $data['descripcion']);
    echo(json_encode($productos));
    break;
  case 'PUT':
    $data = json_decode(file_get_contents('php://input'), true);
    $productos = $productoDAO->actualizarProducto($data['id'], $data['nombre'], $data['descripcion']);
   echo(json_encode($productos));
    break;
  case 'DELETE':
    $data = json_decode(file_get_contents('php://input'), true);
    $productos = $productoDAO->eliminarProducto($data['id']);
    echo(json_encode($productos));
    break;
  default:
    http_response_code(405);
    echo json_encode(array("mensage" => "Metodo No"));
    break;
}
?>
