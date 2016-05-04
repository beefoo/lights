<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['migrate'] = "migrations/update";
// $route[LOGIN_PAGE] = 'examples/login';

$route['default_controller'] = 'home';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
