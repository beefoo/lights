<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Users extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
  }

  // POST /api/users/create?email=XXX&pass=XXX
  public function create()
  {
    // Retrieve user data
    $user_data = $this->_getData(array('email','pass'));
    $registered = FALSE;

    // Attempt registration
    if ($user_id = $this->ion_auth->register($user_data['email'], $user_data['pass'], $user_data['email']))
    {
      // Now attempt auto-login
      $remember = TRUE;
      if($this->ion_auth->login($user_data['email'], $user_data['pass'], $remember))
      {
        if ($user = $this->ion_auth->user()->row())
        {
          $registered = TRUE;
          $this->_respond(array(
            'status'   => 1,
            'user' => array(
              'user_id'  => $user->id,
              'email'    => $user->email
            ),
            'message' => 'Registration successful'
          ));
        }

      }
    }

    // Validation failed
    if (!$registered)
    {
      $errors_string = implode(", ", $this->ion_auth->errors_array());
      $this->_respond(array(
        'status'  => 0,
        'message' => $errors_string
      ));
    }
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

/* End of file users.php */
/* Location: /application/controllers/users.php */
