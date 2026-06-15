<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        errorResponse('无效的请求数据');
    }
    
    // 验证必填字段
    $required = ['name', 'email', 'message'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            errorResponse("字段 {$field} 为必填项");
        }
    }
    
    // 验证邮箱格式
    if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        errorResponse('邮箱格式不正确');
    }
    
    // XSS 过滤
    $data = [
        'name' => htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8'),
        'email' => htmlspecialchars(trim($input['email']), ENT_QUOTES, 'UTF-8'),
        'subject' => htmlspecialchars(trim($input['subject'] ?? ''), ENT_QUOTES, 'UTF-8'),
        'message' => htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8'),
        'submittedAt' => date('c')
    ];
    
    // 保存到文件
    $file = DATA_DIR . 'contacts.json';
    $contacts = [];
    
    if (file_exists($file)) {
        $json = file_get_contents($file);
        $contacts = json_decode($json, true) ?: [];
    }
    
    $contacts[] = $data;
    
    if (file_put_contents($file, json_encode($contacts, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)) === false) {
        errorResponse('保存失败', 500);
    }
    
    jsonResponse([
        'success' => true,
        'message' => '提交成功，我们会尽快与您联系'
    ]);
}

errorResponse('不支持的请求方法', 405);
