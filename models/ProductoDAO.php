<?php
    require('../conexiones/conexion.php');
    class ProductosDAO{
       public $id;
       public $nombre;
       public $descripcion;

       function __construct($id=null,$nombre=null,$descripcion=null){
        $this->id=$id;
        $this->nombre=$nombre;
        $this->descripcion=$descripcion;
       } 
       function traerProducto(){
        $conn = new Conexion('localhost', 'mariaperalta', '8kyW-NqhU)429CW0', 'mariaperalta');
        try {
            $conexion = $conn->Conectar();
            $stmt=$conexion->query('SELECT * from productos');
            $rows=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return $rows; 
        } catch (PDOException $e) {
            echo "Error al conectarse ====>" . $e;
        }
       }
       function eliminarProducto($id){
        $conn = new Conexion('localhost', 'mariaperalta', '8kyW-NqhU)429CW0', 'mariaperalta');
        try {
            $conexion = $conn->Conectar();
            $stmt = $conexion->prepare("DELETE FROM productos WHERE id = $id");
            $stmt->execute();
            return "Exito";  
        } catch (PDOException $e) {
            echo "Error al conectarse ====>" . $e;
        }
       }
       function agregarProducto()
       {
           $conn = new Conexion('localhost','mariaperalta', '8kyW-NqhU)429CW0', 'mariaperalta');
           try {
               $conexion = $conn->Conectar();
               $id = null;
               $nombre = $_POST['name'];
               $descripcion = $_POST['descripcion'];
               $insertar = "INSERT INTO productos (id, nombre, descripcion) VALUES ('?','?','?')";
               $stmt = $conexion->prepare($insertar);
               $stmt->execute([$id, $nombre, $descripcion, ]);
               echo "Producto agregado correctamente.";
           } catch (PDOException $e) {
               echo "Error al conectarse ====>" . $e;
           }
       }
       function traerDatos($id){
        $conn = new Conexion('localhost', 'mariaperalta', '8kyW-NqhU)429CW0', 'mariaperalta');
        try {
            $conexion = $conn->Conectar();
            $stmt=$conexion->query("SELECT * from productos WHERE id = {$id}");
            $rows=$stmt->fetch(PDO::FETCH_ASSOC);
            return $rows; 
        } catch (PDOException $e) {
            echo "Error al conectarse ====>" . $e;
        }
       }
       function guardarProducto($id,$nombre,$descripcion){
        $conn = new Conexion('localhost', 'mariaperalta', '8kyW-NqhU)429CW0', 'mariaperalta');
        try {
            $conexion = $conn->Conectar();
            $stmt = $conexion->prepare("INSERT INTO productos VALUE ($id,'{$nombre}','{$descripcion}')");
            $stmt->execute();
            return "Exito";  
        } catch (PDOException $e) {
            echo "Error al conectarse ====>" . $e;
        }
       }
       function actualizarProducto($id,$nombre,$descripcion){
        $conn = new Conexion('localhost', 'mariaperalta', '8kyW-NqhU)429CW0', 'mariaperalta');
        try {
            $conexion = $conn->Conectar();
            $stmt = $conexion->prepare ("UPDATE productos SET nombre = '{$nombre}', descripcion = '{$descripcion}' WHERE id = {$id}");
            $stmt->execute();
            return "Exito";  
        } catch (PDOException $e) {
            echo "Error al conectarse ====>" . $e;
        }
       }
    }
?>