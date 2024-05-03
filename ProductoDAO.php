<?php
    require('./conexion.php');
    class ProductosDAO{
       public $id;
       public $nombre;
       public $descripcion;

       function __construct($id=null,$nombre=null,$descripcion=null){
        $this->id=$id;
        $this->nombre=$nombre;
        $this->descripcion=$descripcion;
       } 
       function TraerProducto(){
        $conn = new Conexion('localhost', 'mariaperalta', '8kyW-NqhU)429CW0', 'mariaperalta');
        try {
            $conexion = $conn->Conectar();
            $stmt=$conexion->query('SELECT * from productos');
            $rows=$stmt->fetchAll(PDO::FETCH_ASSOC);
            return $rows;
                // foreach ($conexion->query('SELECT * from productos') as $fila) {
                //     print_r(json_encode($fila));
                // }  
        } catch (PDOException $e) {
            echo "Error al conectarse ====>" . $e;
        }
       }
    }
?>