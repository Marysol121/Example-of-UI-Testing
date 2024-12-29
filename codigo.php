<?php
header('Content-Type: text/plain');

$server = 'localhost';
$user = 'root';
$pass = '';
$bd = 'registro';

$conexion = new mysqli($server, $user, $pass, $bd);

if ($conexion->connect_error) {
    echo "Error de conexión: " . $conexion->connect_error;
    exit();
}

// Validar si los campos están completos
if (empty($_POST['cedula']) || empty($_POST['nombre']) || empty($_POST['direccion']) || empty($_POST['correo'])) {
    echo "Hubo un problema al procesar el formulario: todos los campos son obligatorios.";
    exit();
}

// Preparar la consulta para insertar los datos
$stmt = $conexion->prepare("INSERT INTO clientes (cedula, nombre, direccion, email) VALUES (?, ?, ?, ?)");

if (!$stmt) {
    echo "Error al preparar la consulta: " . $conexion->error;
    exit();
}

$stmt->bind_param("ssss", $_POST['cedula'], $_POST['nombre'], $_POST['direccion'], $_POST['correo']);

try {
    $stmt->execute();
    echo "Registro exitoso";
} catch (mysqli_sql_exception $e) {
    // Verificar si el error es por entrada duplicada (código de error 1062)
    if ($e->getCode() === 1062) {
        echo "Registro existente";
    } else {
        echo "Error al guardar el registro: " . $e->getMessage();
    }
}

$stmt->close();
$conexion->close();
?>
