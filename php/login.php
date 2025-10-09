<?php
require_once 'config.php';
header("Content-type: application/json;charset:utf-8");

foreach ($listaUsuarios as $usuario) {
    if ($usuario['email'] === $_POST['email'] && $usuario['senha'] === $_POST['senha']) {
        echo json_encode($usuario);
    }
}
echo json_encode(["erro" => "email ou senha incorretos"]);