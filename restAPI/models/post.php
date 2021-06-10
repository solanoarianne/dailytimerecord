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


        // Don't use this piece of shit inubos oras ko neto HAHAHAHAHAHHAH
        // function generalQuery($query){

        //     $this->result = $this->conn->query($query);
        //     $rowCount = $this->result->num_rows;
        //     if ($this->result->num_rows>0) {
        //         while($res = $this->result->fetch_assoc()){
        //             array_push($this->data,$res);
        //         }
        //         return $this->info = array(
        //                 'status'=>array(
        //                 'remarks'=>true,
        //                 'message'=>'Data retrieval successful.'
        //             ),
        //             'data' =>$this->data,
        //             'payload'=>$this->data,
        //             'dataCount'=>$rowCount,
        //             'timestamp'=>date('D M j, Y h:i:s e'),
        //             'prepared_by'=>'Inventory Admin'
        //         );
    
        //     } else {
        //         return $this->info = array('status'=>array(
        //             'remarks'=>false,
        //             'payload'=>$this->data,
        //             'dataCount'=>$rowCount,
        //             'message'=>'Data retrieval failed.'),
        //             'timestamp'=>date('D M j, Y h:i:s e'),
        //             'prepared_by'=>'Inventory Admin' );
        //     }

        // }

		//ADD PRODUCT FUNCTION
		function addProduct($dt) {
            $payload = $dt;

            $this->sql = "INSERT INTO inventory_tb (item_name, item_desc, item_quant, date_expiry, item_price, item_minimum, remarks, modifiedBy, dateModified, date_acquired) VALUES 
            ('$dt->item_name', '$dt->item_desc', '$dt->item_quant', '$dt->date_expiry', '$dt->item_price', '$dt->item_minimum', '$dt->remarks', '$dt->modifiedBy', CURRENT_DATE(), CURRENT_DATE())"; 
            
            $this->conn->query($this->sql);

            $this->data = $payload;

            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'Inventory Staff',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }
	
	

		//DELETE A PRODUCT FUNCTION

		function delProduct($dt) {
            $payload = $dt;

            $this->sql = "DELETE FROM inventory_tb WHERE item_id = '$dt->item_id'"; 
            // $this->sql = "UPDATE inventory_tb SET is_Archive = 1 WHERE item_id =$dt->item_id";

            $this->conn->query($this->sql);

            $this->data = $payload;

            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'Inventory Admin',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }

		//ARCHIVE A PRODUCT FUNCTION
		function arcProduct($dt) {
            $payload = $dt;

            $this->sql = "UPDATE inventory_tb SET is_Archive = 1 WHERE item_id =$dt->item_id";

            $this->conn->query($this->sql);

            $this->data = $payload;

            return array(
                'status'=>$this->status,
                'payload'=>$this->data,
                'prepared_by'=>'Inventory Admin',
                'timestamp'=>date('D M j, Y h:i:s e')
            );
        }

		//RECOVER A PRODUCT FUNCTION
		function recProduct($dt) {
            $payload = $dt;

            $this->sql = "UPDATE inventory_tb SET is_Archive = 0 WHERE item_id =$dt->item_id";

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

            $this->sql = " UPDATE inventory_tb SET item_name='$dt->item_name', item_desc='$dt->item_desc', item_quant='$dt->item_quant', date_expiry='$dt->date_expiry', item_price='$dt->item_price', item_minimum='$dt->item_minimum', remarks='$dt->remarks', modifiedBy='$dt->modifiedBy', dateModified = CURRENT_DATE() WHERE item_id='$dt->item_id'";
            $this->conn->query($this->sql);
            return $this->select('inventory_tb', null);
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
				'prepared_by'=>'Inventory bois',
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
				'prepared_by'=>'Inventory bois',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}


		function add_record($dt) {
			$sql = "INSERT INTO inventory_tb(item_name, item_desc, item_price, date_expiry, item_minimum, remarks, item_quant, modifiedBy) VALUES ('$dt->item_name', '$dt->item_desc', '$dt->item_price', '$dt->date_expiry', '$dt->item_minimum', '$dt->remarks', '$dt->item_quant', '$dt->modifiedBy')";
			$this->conn->query($sql);
			return $this->select('inventory_tb', null);
		}

		function edit_record($dt) {
			$sql = "UPDATE inventory_tb SET item_name='$dt->item_name', item_desc='$dt->item_desc', item_price='$dt->item_price', date_expiry='$dt->date_expiry', item_minimum='$dt->item_minimum', remarks='$dt->remarks', item_quant='$dt->item_quant', modifiedBy='$dt->modifiedBy' WHERE item_id=$dt->item_id";
			$this->conn->query($sql);
			return $this->select('inventory_tb', null);
		}

		function delete_record($dt) {
			$sql = "DELETE FROM inventory_tb WHERE item_id=$dt->item_id";
			$this->conn->query($sql);
			return $this->select('inventory_tb', null);
		}

		function archive_record($dt){
			$sql = "UPDATE inventory_tb SET is_Archive = 1 WHERE item_id =$dt->item_id";
			$this->conn->query($sql);
			return $this->select('inventory_tb', null);
			}

		function recover_record($dt){
			$sql = "UPDATE inventory_tb SET is_Archive = 0 WHERE item_id =$dt->item_id";
			$this->conn->query($sql);
			return $this->select('inventory_tb', null); 
		}


		// Item History Functions

		function selectMY($dt){
			$this->sql = "SELECT * FROM inventory_tb WHERE MONTH(date_acquired) = '$dt->selectedMonth' AND YEAR(date_acquired) = '$dt->selectedYear'";

			
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
				'prepared_by'=>'Inventory bois',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}

		function selectM($dt){
			$this->sql = "SELECT * FROM inventory_tb WHERE DATE_FORMAT(date_acquired, '%M') = '$dt->selectedMonth'";

			
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
				'prepared_by'=>'Inventory bois',
				'timestamp'=>date('D M j, Y G:i:s T')
			);
		}



	} // end of Post() Class
?>