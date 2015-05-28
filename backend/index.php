<?php

require_once('simple_html_dom_1_5.php');
require_once('UrlParser.php');
require_once('config.php');

$DEBUG = FALSE;

if($_REQUEST['url']) {
	$url = $_REQUEST['url'];
}
else {
	echo error;
	exit;
}

$url_par = new UrlParser($url);

$html = new simple_html_dom();
$html->load_file($url); 

$title = '';
$css = '';
$content = '';

foreach($html->find('title') as $element) {
	$title = $element->plaintext;
	break;
}

function resize_image($path, $w, $h) {
	$data = file_get_contents($path);
    list($width, $height) = getimagesizefromstring($data);
	
	//if($width <= $w) return $data;
	
	$src = imagecreatefromstring($data); 
	
	if($width > $w) {
		$r = $height / $width;
		
		$newwidth =  $w;
		$newheight = $r * $newwidth;
	}
	else {
		$newwidth =  $width;
		$newheight = $height;
	}
	
    $dst = imagecreatetruecolor($newwidth, $newheight);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

    ob_start();
    imagejpeg($dst, null, 30);
    return(ob_get_clean());
}

function encodeImage($url_par, $url) {
	$path = $url_par->getAbsoluteUrl($url);
	
	try {
		$data = resize_image($path, 350, 800);
		$base64 = 'data:image/jpg' . ';base64,' . base64_encode($data);
	}
	catch(Exception $e) {
		$base64 = '';
	}
	
	return $base64;
}

function getCss($url_par, $url) {
	
	return file_get_contents($url_par->getAbsoluteUrl($url));
}

foreach($html->find('link') as $element) {
	if($element->rel === 'stylesheet') {
		$url = $element->href;
		
		$url = html_entity_decode($url);
		
		try{
			$css[] = getCss($url_par, $url);
		}
		catch(Exception $e) {
		
		}
	}
}

foreach($html->find('style') as $element) {
	$css[] = $element->innertext;
}

foreach($html->find('img') as $element) {
	$element->src = encodeImage($url_par, $element->src);
} 

foreach($html->find('a') as $element) {
	$element->href = $url_par->getAbsoluteUrl($element->href);
}

foreach($html->find('script') as $element) {
	$element->innertext = '';
}

foreach($html->find('body') as $element) {
	$content = strip_tags($element, implode('', $allowed_tags));
}

$result = array(
	'title' => $title,
	'timestamp' => time(),
	'content' => $content,
	'css' => implode(';', $css)
	);


if($DEBUG) {
	var_dump($result);
	exit;
}


$json = json_encode($result);

header('content-type: application/json; charset=utf-8');
	
echo isset($_GET['callback'])
	? "{$_GET['callback']}($json)"
	: $json;