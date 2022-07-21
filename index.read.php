<?php
header("content-type:text/html;charset=utf-8");
date_default_timezone_set('Asia/Shanghai'); // 设置时区
ini_set('display_errors', 'On'); //打开错误提示
ini_set('error_reporting', E_ALL); //显示所有错误

// 替换字段
function replace_string($old_txt, $new_txt, $string){
    return str_replace($old_txt, $new_txt, $string);
}
// 读取文件内容
function read_html($old_path, $new_path, $file){
    $fp = fopen($file, 'r');
    if (!feof($fp)){ // 文件存在
        $contents = fread($fp, filesize($file));
        $contents = replace_string($old_path, $new_path, $contents);
    }else{
        $contents = 'null file';
    }
    fclose($fp);
    return $contents;
}

// 输出内容
$file = './built/index.html';
$old_path = '="./';
$new_path = '="./built/';
echo read_html($old_path, $new_path, $file);
exit();