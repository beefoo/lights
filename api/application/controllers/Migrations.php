<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Migrations extends CI_Controller {

  public function update() {
    $this->load->library('migration');

    if (!$this->migration->current()) {
      show_error($this->migration->error_string());

    } else {
      echo json_encode(array("message" => "success"));
    }
  }

}
/* End of file migrations.php */
/* Location: ./application/controllers/migrations.php */
