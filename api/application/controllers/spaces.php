<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Spaces extends CI_Controller {

  public function __construct() {
    parent::__construct();

    $this->load->model('spaces_model');
  }

  public function show($uid)
  {
    if (!$space = $this->spaces_model->getEntryByUid($uid)) {
      $this->_respond(array(
        'status'  => 0,
        'message' => 'No space found with this id: '.$uid
      ));
      return false;
    }
    echo json_encode($space);
  }

  public function save($uid)
  {
    $space = $this->spaces_model->getEntryByUid($uid);
    $data = $this->_getData();

    if ($space){
      $this->spaces_model->updateEntry($space->id, $data);

    } else {
      $this->spaces_model->insertEntry($data);
    }

    $this->_respond(array(
      'status'  => 1,
      'message' => 'Successful saved data'
    ));
  }

  private function _respond($data){
    echo json_encode($data);
  }

  private function _getData(){
    $fields = $this->spaces_model->accessibleFields();
    $data = array();

    foreach($fields as $field){
      if ($value = $this->input->get_post($field))
        $data[$field] = $value;
    }

    return $data;
  }
}
/* End of file spaces.php */
/* Location: ./application/controllers/spaces.php */
