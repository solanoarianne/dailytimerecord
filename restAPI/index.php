<?php 
    date_default_timezone_set('Asia/Manila'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT, POST, PATCH, OPTIONS, GET');
    header('Content-Type: application/json');
    

    include_once './config/payrollDB.php';
    include_once './models/post.php';
	include_once './models/auth.php';

    
	$database = new Database();
	$db = $database->connect();
	$post = new Post($db);
	$auth = new Auth($db);
	$data = array();

	$req = explode('/', rtrim($_REQUEST['request'], '/'));

	switch ($_SERVER['REQUEST_METHOD']) {
		

		case 'POST':
			switch ($req[0]) {

				case 'inventory':
					echo json_encode($post->select("employee_tb", "0"));
					
				break;

				case 'inventory_Archive':
					echo json_encode($post->selectArchive("employee_tb", "1"));
					
				break;

				case 'addProduct':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->addProduct($d));
				break;

		
				case 'editProduct':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->editProduct($d));
				break;

                case 'delProduct':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
                    echo json_encode($post->delProduct($d));
				break;

				case 'arcProduct':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->arcProduct($d));
				break;

				case 'recProduct':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->recProduct($d));
				break;

				case 'registerUser':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->registerUser($d));
				break;

				case 'loginUser':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->loginUser($d));
				break;

				case 'selectMY':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->selectMY($d));
				break;

				case 'selectM':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($post->selectM($d));
				break;



				default:
					http_response_code(400);
					echo "Bad Request";
				break;
			}
		break;
		
		

		case 'GET':
			switch ($req[0]) {

				
				case 'inventory':
					echo json_encode($post->generalQuery("SELECT * FROM employee_tb"));
					
				break;

				// case 'addProduct':
				// 	$d = json_decode(base64_decode(file_get_contents("php://input")));
				// 	echo json_encode($post->addProduct($d));
				// break;

				// case 'editProduct':
				// 	$d = json_decode(base64_decode(file_get_contents("php://input")));
				// 	echo json_encode($post->editProduct($d));
				// break;

                // case 'delProduct':
				// 	$d = json_decode(base64_decode(file_get_contents("php://input")));
                //     echo json_encode($post->delProduct($d));
				// break;

				// case 'registerUser':
				// 	$d = json_decode(base64_decode(file_get_contents("php://input")));
				// 	echo json_encode($auth->registerUser($d));
				// break;

				// case 'loginUser':
				// 	$d = json_decode(base64_decode(file_get_contents("php://input")));
				// 	echo json_encode($auth->loginUser($d));
				// break;

				// default:
				// 	http_response_code(400);
				// 	echo "Bad Request";
				// break;
			}
		break;
		
		default:
			http_response_code(400);
			echo "Bad Request";
		break;
	}

?>