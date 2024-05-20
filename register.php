<?php

session_start();
$login = $_POST['login'];
$pass = $_POST['pass'];
$md5_pass = md5($pass);
$email = $_POST['email'];

