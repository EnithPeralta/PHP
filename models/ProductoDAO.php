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
        $conn = new Conexion('localhost', 'maria', '123456789', 'tienda');
        try {
            $conexion = $conn->Conectar();
            $stmt=$conexion->query('SELECT * from productos');
            $rows=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return $rows; 
            $conn->Desconectar();
        } catch (PDOException $e) {
            echo "Error al conectarse ====>" . $e;
        }
       }
       function eliminarProducto($id){
        $conn = new Conexion('localhost', 'maria', '123456789', 'tienda');
        try {
            $conexion = $conn->Conectar();
            $stmt = $conexion->prepare("DELETE FROM productos WHERE id = $id");
            $stmt->execute();
            return "Exito";  
        } catch (PDOException $e) {
            echo "Error al conectarse ====>" . $e;
        }
       }
       function agregarProducto($id,$nombre, $descripcion){
           $conn = new Conexion('localhost','maria', '123456789', 'tienda');
           try {
               $conexion = $conn->Conectar();
               $insertar = $conexion->prepare("INSERT INTO productos (`id`, `nombre`, `descripcion`) VALUES (?,?,?)");
               $insertar->bindParam(1, $id);
               $insertar->bindParam(2, $nombre);
               $insertar->bindParam(3, $descripcion);
               $insertar->execute();
               return "Agregado Exitosamente";
           } catch(PDOException $e) {
               return "Error al conectar a la base de datos: " . $e->getMessage();
           }
       }
       function traerDatos($id){
        $conn = new Conexion('localhost', 'maria', '123456789', 'tienda');
        try {
            $conexion = $conn->Conectar();
            $stmt=$conexion->query("SELECT * from productos WHERE id = {$id}");
            $rows=$stmt->fetch(PDO::FETCH_ASSOC);
            return $rows;
            $conn->Desconectar();
        } catch (PDOException $e) {
            echo "Error al conectarse ====>" . $e;
        }
       }
       /*function guardarProducto($id,$nombre,$descripcion){
        $conn = new Conexion('localhost', 'maria', '123456789', 'tienda');
        try {
            $conexion = $conn->Conectar();
            $stmt = $conexion->prepare("INSERT INTO productos VALUE ($id,'{$nombre}','{$descripcion}')");
            $stmt->execute();
            return "Exito";  
        } catch (PDOException $e) {
            echo "Error al conectarse ====>" . $e;
        }
       }*/
       function actualizarProducto($id,$nombre,$descripcion){
        $conn = new Conexion('localhost', 'maria', '123456789', 'tienda');
        try {
            $conexion = $conn->Conectar();
            $agregar = $conexion->prepare("UPDATE productos SET nombre='$nombre', descripcion='$descripcion' WHERE id =$id");
            $agregar->execute();
            return "Actualizado Exitosamente";
        } catch (PDOException $e) {
            echo "Error al conectarse ====>" . $e;
        }
       }
    }
?>