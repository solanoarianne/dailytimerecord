<?php 
	class Post {
		private $conn;
		private $sql;
		private $data = array();
		private $info = [];
		private $status =array();
		private $failed_stat = array(
			'remarks'=>'failed',
			'message'=>'Failed to retrieve the requested records'
		);
		private $success_stat = array(
			'remarks'=>'success',
			'message'=>'Successfully retrieved the requested records'
		);
		public function __construct($db){
			$this->conn = $db;
		}


		//ADD PRODUCT FUNCTION
		function addProduct($dt) {
            $payload = $dt;

            $this->sql = "INSERT INTO employee_tb (emp_id, first_name, item_desc, last_name, date_expiry, contact_num, item_minimum, time_in, time_out, remarks, modifiedBy, dateModified, date_acquired, measurementType) VALUES 
            ('$dt->emp_id', '$dt->first_name', '$dt->item_desc', '$dt->last_name', '$dt->date_expiry', '$dt->contact_num', '$dt->item_minimum', '$dt->time_in', '$dt->time_out','$dt->remarks', '$dt->modifiedBy', CURRENT_DATE(), CURRENT_DATE(), '$dt->measurementType')"; 
            
            $this->conn->query($this->sql);

            $this->data = $payload;

            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'DTR Staff',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }
	
	

		//DELETE A PRODUCT FUNCTION

		function delProduct($dt) {
            $payload = $dt;

            $this->sql = "DELETE FROM employee_tb WHERE item_id = '$dt->item_id'"; 
            // $this->sql = "UPDATE employee_tb SET is_Archive = 1 WHERE item_id =$dt->item_id";

            $this->conn->query($this->sql);

            $this->data = $payload;

            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'DTR Admin',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }

		//ARCHIVE A PRODUCT FUNCTION
		function arcProduct($dt) {
            $payload = $dt;

            $this->sql = "UPDATE employee_tb SET is_Archive = 1 WHERE item_id =$dt->item_id";

            $this->conn->query($this->sql);

            $this->data = $payload;

            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'DTR Admin',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }

		//RECOVER A PRODUCT FUNCTION
		function recProduct($dt) {
            $payload = $dt;

            $this->sql = "UPDATE employee_tb SET is_Archive = 0 WHERE item_id =$dt->item_id";

            $this->conn->query($this->sql);

            $this->data = $payload;

            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'Inventory Admin',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }

	

		//UPDATE A PRODUCT

		function editProduct($dt){

            $payload = $dt;

            $this->sql = " UPDATE employee_tb SET emp_id ='$dt->emp_id', first_name='$dt->first_name', item_desc='$dt->item_desc', last_name='$dt->last_name', date_expiry='$dt->date_expiry', contact_num='$dt->contact_num', item_minimum='$dt->item_minimum', time_in='$dt->time_in', time_out='$dt->time_out', remarks='$dt->remarks', modifiedBy='$dt->modifiedBy', dateModified = CURRENT_DATE(), measurementType='$dt->measurementType' WHERE item_id='$dt->item_id'";
            $this->conn->query($this->sql);
            return $this->select('employee_tb', null);
        }



        // Eto na yung bagong pang pull ng hindi naka archive na items
		function select($table, $filter_data) {
			$this->sql = "SELECT * FROM $table WHERE is_Archive = 0";

			
			if($result = $this->conn->query($this->sql)){
				if($result->num_rows>0){
					while($res = $result->fetch_assoc()){
						array_push($this->data, $res);
					}
					$this->status = $this->success_stat;
					http_response_code(200);
				}
			}
			return array(
				'status'=>$this->status,
				'payload'=>$this->data,
				'prepared_by'=>'DTR bois',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}

        //Eto yung pang view ng mga naka archive sa archive table
        function selectArchive($table, $filter_data) {
			$this->sql = "SELECT * FROM $table WHERE is_Archive = 1";

			
			if($result = $this->conn->query($this->sql)){
				if($result->num_rows>0){
					while($res = $result->fetch_assoc()){
						array_push($this->data, $res);
					}
					$this->status = $this->success_stat;
					http_response_code(200);
				}
			}
			return array(
				'status'=>$this->status,
				'payload'=>$this->data,
				'prepared_by'=>'DTR bois',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}


		function add_record($dt) {
			$sql = "INSERT INTO employee_tb(emp_id, first_name, item_desc, contact_num, date_expiry, item_minimum, time_in, time_out, remarks, last_name, modifiedBy) VALUES ('$dt->emp_id', '$dt->first_name', '$dt->item_desc', '$dt->contact_num', '$dt->date_expiry', '$dt->item_minimum', '$dt->time_in', '$dt->time_out',  '$dt->remarks', '$dt->last_name', '$dt->modifiedBy')";
			$this->conn->query($sql);
			return $this->select('employee_tb', null);
		}

		function edit_record($dt) {
			$sql = "UPDATE employee_tb SET emp_id='$dt->emp_id', first_name='$dt->first_name', item_desc='$dt->item_desc', contact_num='$dt->contact_num', date_expiry='$dt->date_expiry', item_minimum='$dt->item_minimum', time_in='$dt->time_in', time_out='$dt->time_out', remarks='$dt->remarks', last_name='$dt->last_name', modifiedBy='$dt->modifiedBy' WHERE item_id=$dt->item_id";
			$this->conn->query($sql);
			return $this->select('employee_tb', null);
		}

		function delete_record($dt) {
			$sql = "DELETE FROM employee_tb WHERE item_id=$dt->item_id";
			$this->conn->query($sql);
			return $this->select('employee_tb', null);
		}

		function archive_record($dt){
			$sql = "UPDATE employee_tb SET is_Archive = 1 WHERE item_id =$dt->item_id";
			$this->conn->query($sql);
			return $this->select('employee_tb', null);
			}

		function recover_record($dt){
			$sql = "UPDATE employee_tb SET is_Archive = 0 WHERE item_id =$dt->item_id";
			$this->conn->query($sql);
			return $this->select('employee_tb', null); 
		}


		// Item History Functions

		function selectMY($dt){
			$this->sql = "SELECT * FROM employee_tb WHERE MONTH(date_acquired) = '$dt->selectedMonth' AND YEAR(date_acquired) = '$dt->selectedYear'";

			
			if($result = $this->conn->query($this->sql)){
				if($result->num_rows>0){
					while($res = $result->fetch_assoc()){
						array_push($this->data, $res);
					}
					$this->status = $this->success_stat;
					http_response_code(200);
				}
			}
			return array(
				'status'=>$this->status,
				'payload'=>$this->data,
				'prepared_by'=>'DTR bois',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}

		function selectM($dt){
			$this->sql = "SELECT * FROM employee_tb WHERE DATE_FORMAT(date_acquired, '%M') = '$dt->selectedMonth'";

			
			if($result = $this->conn->query($this->sql)){
				if($result->num_rows>0){
					while($res = $result->fetch_assoc()){
						array_push($this->data, $res);
					}
					$this->status = $this->success_stat;
					http_response_code(200);
				}
			}
			return array(
				'status'=>$this->status,
				'payload'=>$this->data,
				'prepared_by'=>'DTR bois',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}



	} // end of Post() Class
?>