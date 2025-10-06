<?php
require_once 'config.php';
header("Content-type: application/json;charset:utf-8");

$listaUsuarios[] = $_POST;

echo json_encode($_POST);
