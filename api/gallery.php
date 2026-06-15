<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $file = DATA_DIR . 'gallery.json';
    
    if (!file_exists($file)) {
        jsonResponse([]);
    }
    
    $json = file_get_contents($file);
    $images = json_decode($json, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        errorResponse('数据解析失败', 500);
    }
    
    jsonResponse($images);
}

errorResponse('不支持的请求方法', 405);
