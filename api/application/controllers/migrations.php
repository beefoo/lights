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

  public function data() {
    if (ENVIRONMENT != 'development') return false;

    $this->load->model('spaces_model');
    $jsonData = json_decode(file_get_contents('http://light.friendrnd.com/api/spaces/show/default'), TRUE);
    $space = $this->spaces_model->getEntryByUid('default');

    if ($jsonData && $space && array_key_exists('space', $jsonData)) {
      $data = array('data' => json_encode($jsonData['space']['data']));
      $this->spaces_model->updateEntry($space->id, $data);
      echo json_encode(array("message" => "success", "data" => $data));

    } else {
      echo json_encode(array("message" => "failure"));
    }

  }

}
/* End of file migrations.php */
/* Location: ./application/controllers/migrations.php */
