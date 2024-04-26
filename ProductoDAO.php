<?php
    require('./conexion.php');
    class ProductosDAO{
       public $id;
       public $nombre;
       public $descripcion;

       function __construct($id,$nombre,$descripcion){
        $this->id=$id;
        $this->nombre=$nombre;
        $this->descripcion=$descripcion;
       } 
       
    }
    $conn = new Conexion('localhost', 'mariaperalta', '8kyW-NqhU)429CW0', 'mariaperalta');
try {
    $conexion = $conn->Conectar();
    $query=$conexion->prepare('SELECT * from productos');
    $query->execute();
    $productos=$query->fetchAll();
    print_r(json_encode($productos));

        // foreach ($conexion->query('SELECT * from productos') as $fila) {
        //     print_r(json_encode($fila));
        // }  
} catch (PDOException $e) {
    echo "Error al conectarse ====>" . $e;
}
$conn->Desconectar();
?>