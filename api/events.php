<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $file = DATA_DIR . 'events.json';
    
    if (!file_exists($file)) {
        jsonResponse([]);
    }
    
    $json = file_get_contents($file);
    $events = json_decode($json, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        errorResponse('数据解析失败', 500);
    }
    
    // 如果提供了 id 参数，返回单个演出
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $event = array_filter($events, function($e) use ($id) {
            return $e['id'] === $id;
        });
        
        if (empty($event)) {
            errorResponse('演出不存在', 404);
        }
        
        jsonResponse(array_values($event)[0]);
    }
    
    jsonResponse($events);
}

errorResponse('不支持的请求方法', 405);
