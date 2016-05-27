<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Sessions extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
  }

  // POST /api/sessions/create?email=XXX&pass=XXX
  public function create()
  {
    $user_data = $this->_getData(array('email','pass'));
    $remember = TRUE;
    $authenticated = FALSE;

    // Login attempt was successful
    if($this->ion_auth->login($user_data['email'], $user_data['pass'], $remember))
    {
      if ($user = $this->ion_auth->user()->row())
      {
        $authenticated = TRUE;
        $this->_respond(array(
          'status'   => 1,
          'user' => array(
            'user_id'  => $user->id,
            'email'    => $user->email
          ),
          'message' => 'Sucessfully logged in'
        ));
      }
    }

    // Login attempt not successful
    if (!$authenticated)
    {
      $errors_string = implode(", ", $this->ion_auth->errors_array());
      $this->_respond(array(
        'status'  => 0,
        'message' => $errors_string
      ));
    }
  }

  // GET /api/sessions/current
  public function current()
  {
    $found = FALSE;

    if ($this->ion_auth->logged_in())
    {
      if ($user = $this->ion_auth->user()->row())
      {
        $found = TRUE;
        $this->_respond(array(
          'status'   => 1,
          'user' => array(
            'user_id'  => $user->id,
            'email'    => $user->email
          ),
          'message' => 'You are logged in with email '.$user->email
        ));
      }
    }

    if (!$found)
    {
      $this->_respond(array(
        'status'  => 0,
        'message' => "Nobody is logged in"
      ));
    }
  }

  // POST /api/sessions/destroy
  public function destroy()
  {
    $this->ion_auth->logout();

    $this->_respond(array(
      'status'  => 1,
      'message' => "Successfully logged out"
    ));
  }

  private function _getData($fields){
    $data = array();

    foreach($fields as $field){
      if ($value = $this->input->get_post($field))
        $data[$field] = $value;
    }

    return $data;
  }

  private function _respond($data){
    echo json_encode($data);
  }
}

/* End of file sessions.php */
/* Location: /application/controllers/sessions.php */
