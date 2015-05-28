<?php

class UrlParser {
	protected $baseUrl;

	function __construct($siteUrl) {
		$this->baseUrl = parse_url($siteUrl);
	}
	
	public function getAbsoluteUrl($url) {
		$baseUrl = $this->baseUrl;
		$url = parse_url($url);
		
		if(!isset($url['scheme'])) {
			$url['scheme'] = $baseUrl['scheme'];
		}
		
		if(!isset($url['host'])) {
			$url['host'] = $baseUrl['host'];
		}
		
		if(!isset($url['path'])) {
			$url['path'] = '';
		}
		
		if(!isset($url['query'])) {
			$url['query'] = '';
		}
		
		$full = $url['scheme'] . '://' . $url['host'] . $url['path']. '?' . $url['query'];
		
		return $full;
	}

}

/*
$url1 = 'http://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/March_20th_Eclipse_-_Ireland_cropped.jpg/100px-March_20th_Eclipse_-_Ireland_cropped.jpg';

$url2 = '//upload.wikimedia.org/wikipedia/commons/thumb/1/1f/March_20th_Eclipse_-_Ireland_cropped.jpg/100px-March_20th_Eclipse_-_Ireland_cropped.jpg';

$url3 = 'upload.wikimedia.org/wikipedia/commons/thumb/1/1f/March_20th_Eclipse_-_Ireland_cropped.jpg/100px-March_20th_Eclipse_-_Ireland_cropped.jpg';

$url4 = '/wikipedia/commons/thumb/1/1f/March_20th_Eclipse_-_Ireland_cropped.jpg/100px-March_20th_Eclipse_-_Ireland_cropped.jpg';

$data[] = parse_url($url1);
$data[] = parse_url($url2);
$data[] = parse_url($url3);
$data[] = parse_url($url4);

var_dump($data);

Output:
array (size=4)
  0 => 
    array (size=3)
      'scheme' => string 'http' (length=4)
      'host' => string 'upload.wikimedia.org' (length=20)
      'path' => string '/wikipedia/commons/thumb/1/1f/March_20th_Eclipse_-_Ireland_cropped.jpg/100px-March_20th_Eclipse_-_Ireland_cropped.jpg' (length=117)
  1 => 
    array (size=2)
      'host' => string 'upload.wikimedia.org' (length=20)
      'path' => string '/wikipedia/commons/thumb/1/1f/March_20th_Eclipse_-_Ireland_cropped.jpg/100px-March_20th_Eclipse_-_Ireland_cropped.jpg' (length=117)
  2 => 
    array (size=1)
      'path' => string 'upload.wikimedia.org/wikipedia/commons/thumb/1/1f/March_20th_Eclipse_-_Ireland_cropped.jpg/100px-March_20th_Eclipse_-_Ireland_cropped.jpg' (length=137)
  3 => 
    array (size=1)
      'path' => string '/wikipedia/commons/thumb/1/1f/March_20th_Eclipse_-_Ireland_cropped.jpg/100px-March_20th_Eclipse_-_Ireland_cropped.jpg' (length=117)

*/