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


        function generalQuery($query){

            $this->result = $this->conn->query($query);
            $rowCount = $this->result->num_rows;
            if ($this->result->num_rows>0) {
                while($res = $this->result->fetch_assoc()){
                    array_push($this->data,$res);
                }
                return $this->info = array(
                        'status'=>array(
                        'remarks'=>true,
                        'message'=>'Data retrieval successful.'
                    ),
                    'data' =>$this->data,
                    'payload'=>$this->data,
                    'dataCount'=>$rowCount,
                    'timestamp'=>date('D M j, Y h:i:s e'),
                    'prepared_by'=>'Inventory Admin'
                );
    
            } else {
                return $this->info = array('status'=>array(
                    'remarks'=>false,
                    'payload'=>$this->data,
                    'dataCount'=>$rowCount,
                    'message'=>'Data retrieval failed.'),
                    'timestamp'=>date('D M j, Y h:i:s e'),
                    'prepared_by'=>'Inventory Admin' );
            }

        }

		//ADD PRODUCT FUNCTION
		function addProduct($dt) {
            $payload = $dt;

            $this->sql = "INSERT INTO inventory_tb (item_name, item_desc, item_quant, date_expiry, item_price, item_minimum, remarks, modifiedBy) VALUES 
            ('$dt->item_name', '$dt->item_desc', '$dt->item_quant', '$dt->date_expiry', '$dt->item_price', '$dt->item_minimum', '$dt->remarks', '$dt->modifiedBy')"; 
            
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

            $this->sql = " UPDATE inventory_tb SET item_name='$dt->item_name1', item_desc='$dt->item_desc1', item_quant='$dt->item_quant1', date_expiry='$dt->date_expiry1', item_price='$dt->item_price1', item_minimum='$dt->item_minimum1', remarks='$dt->remarks1', modifiedBy='$dt->modifiedBy1' WHERE item_id='$dt->item_id1'";
            $this->conn->query($this->sql);
            return $this->select('inventory_tb', null);
        }




		function select($table, $filter_data) {
			$this->sql = "SELECT * FROM $table";

			if($filter_data!=null){
				$this->sql.=" WHERE item_id='$filter_data'";
			}

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
	} // end of Post() Class
?>