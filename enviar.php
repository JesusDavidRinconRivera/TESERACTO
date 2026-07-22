<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Método no permitido.']);
    exit;
}

$nombre   = trim($_POST['nombre']   ?? '');
$empresa  = trim($_POST['empresa']  ?? '');
$telefono = trim($_POST['telefono'] ?? '');
$correo   = trim($_POST['correo']   ?? '');
$mensaje  = trim($_POST['mensaje']  ?? '');

if ($nombre === '' || $empresa === '' || $telefono === '' || $correo === '' || $mensaje === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Todos los campos son obligatorios.']);
    exit;
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'El correo no es válido.']);
    exit;
}

$to      = 'contacto@teseracto.tech';
$subject = "Nueva solicitud de cotización — $empresa";
$body    = "Nombre: $nombre\n"
         . "Empresa: $empresa\n"
         . "Teléfono: $telefono\n"
         . "Correo: $correo\n\n"
         . "Mensaje:\n$mensaje\n";
$headers = "From: noreply@teseracto.tech\r\n"
         . "Reply-To: $correo\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'No se pudo enviar el correo. Intenta de nuevo o llámanos.']);
}
