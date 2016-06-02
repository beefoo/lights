<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Users extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();

    $this->load->model('spaces_model');
    $this->ion_auth->set_error_delimiters('','');
    $this->ion_auth->set_message_delimiters('','');
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
      // Create a new space for user
      $this->spaces_model->insertEntry(array(
        'user_id' => $user_id,
        'data' => '{}'
      ));
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

  // POST /api/users/forgot_password?email=XXX
  public function forgot_password()
  {
    $user_data = $this->_getData(array('email'));

    if ($forgotten = $this->ion_auth->forgotten_password($user_data['email']))
    {
      $messages_string = implode(", ", $this->ion_auth->messages_array());
      $this->_respond(array(
        'status'  => 1,
        'message' => $messages_string
      ));
    }

    else
    {
      $errors_string = implode(", ", $this->ion_auth->errors_array());
      $this->_respond(array(
        'status'  => 0,
        'message' => $errors_string
      ));
    }
  }

  // POST /api/users/reset_password?code=XXX&pass=XXX
  public function reset_password()
  {
    $user_data = $this->_getData(array('code','pass'));
    $reset = FALSE;

    if ($user = $this->ion_auth->forgotten_password_check($user_data["code"]))
    {
      if ($this->ion_auth->update($user->id, array('password' => $user_data["pass"])))
      {
        $remember = TRUE;
        // authenticate user
        if($this->ion_auth->login($user->email, $user_data['pass'], $remember))
        {
          $reset = TRUE;
          $messages_string = implode(", ", $this->ion_auth->messages_array());
          $this->_respond(array(
            'status'  => 1,
            'user' => array(
              'user_id'  => $user->id,
              'email'    => $user->email
            ),
            'message' => $messages_string
          ));
        }
      }
    }

    if (!$reset)
    {
      $errors_string = implode(", ", $this->ion_auth->errors_array());
      $this->_respond(array(
        'status'  => 0,
        'message' => $errors_string
      ));
    }
  }

  // POST /api/users/update?email=XXX&pass=XXX&current_pass=XXX
  public function update()
  {
    $user_data = $this->_getData(array('email','pass','current_pass'));
    $updated = FALSE;
    if ($user = $this->ion_auth->user()->row())
    {
      $remember = TRUE;
      // authenticate current_pass
      if($this->ion_auth->login($user->email, $user_data['current_pass'], $remember))
      {
        $data = array('email' => $user_data['email']);

        // only submit new password if set
        if ($user_data['pass']) $data['password'] = $user_data['pass'];

        if ($this->ion_auth->update($user->id, $data))
        {
          $updated = TRUE;
          $this->_respond(array(
            'status'  => 1,
            'user' => array(
              'user_id'  => $user->id,
              'email'    => $user_data['email']
            ),
            'message' => 'Successfully updated user account'
          ));
        }

      }
    }

    if (!$updated)
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
      $data[$field] = $this->input->get_post($field);
    }

    return $data;
  }

  private function _respond($data){
    echo json_encode($data);
  }

}

/* End of file users.php */
/* Location: /application/controllers/users.php */
