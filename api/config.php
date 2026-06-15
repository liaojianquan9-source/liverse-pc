<?php
// CORS 配置
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 路径配置
define('DATA_DIR', dirname(__DIR__) . '/data/');
define('UPLOAD_DIR', dirname(__DIR__) . '/uploads/');

// 确保目录存在
if (!is_dir(DATA_DIR)) mkdir(DATA_DIR, 0755, true);
if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0755, true);

/**
 * 统一响应格式
 */
function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * 错误响应
 */
function errorResponse($message, $status = 400) {
    jsonResponse(['error' => $message], $status);
}
