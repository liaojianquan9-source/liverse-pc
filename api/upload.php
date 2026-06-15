<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    if (!isset($_FILES['image'])) {
        errorResponse('没有上传文件');
    }
    
    $file = $_FILES['image'];
    
    // 检查上传错误
    if ($file['error'] !== UPLOAD_ERR_OK) {
        errorResponse('上传失败: ' . $file['error']);
    }
    
    // 验证文件类型
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!in_array($file['type'], $allowedTypes)) {
        errorResponse('仅支持 JPG、PNG、WebP、GIF 格式');
    }
    
    // 验证文件大小（最大 5MB）
    $maxSize = 5 * 1024 * 1024;
    if ($file['size'] > $maxSize) {
        errorResponse('文件大小不能超过 5MB');
    }
    
    // 生成唯一文件名
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid() . '_' . time() . '.' . $ext;
    $filepath = UPLOAD_DIR . $filename;
    
    if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        errorResponse('文件保存失败', 500);
    }
    
    $url = '/uploads/' . $filename;
    
    jsonResponse([
        'success' => true,
        'url' => $url,
        'filename' => $filename
    ]);
}

errorResponse('不支持的请求方法', 405);
