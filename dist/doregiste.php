<?php
    header ('Content-type:text/html;charset=utf-8');

    $username = $_POST['username'];
  
    $password = $_POST['password'];

	//1、链接数据库
	$link = mysql_connect('localhost','root','123456');
	//2、判断是否链接成功
	if(!$link){
		echo '未能连接';
		exit;

	}
	//3、设置字符集
	mysql_set_charset('utf8');
	//4、选择用哪个数据库
	mysql_select_db('yougou');

	//5、准备sql语句
	$sql = "insert into user (username,password) values('{$username}','{$password}')";//int 类型可以不加''
	//6、发送sql语句
	$res = mysql_query($sql);
	 if($res){
	 	echo "注册成功<a href = 'login.html'>返回登录</a>";
	 }else{
	 	echo "<a href = 'registe.html'>重新注册</a>";
	 	exit;
	 }
	//8、关闭数据库
	mysql_close();




?>