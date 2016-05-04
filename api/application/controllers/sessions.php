<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Sessions extends MY_Controller
{
  public function __construct()
  {
    parent::__construct();

    // Force SSL
    //$this->force_ssl();
  }

  // POST /api/sessions/create?login_string=XXX&login_pass=XXX&login_token=XXX
  public function create()
  {
    // Make sure we aren't redirecting after a successful login
    $this->authentication->redirect_after_login = FALSE;

    // Do the login attempt
    $this->auth_data = $this->authentication->user_status(0);

    // Set user variables if successful login
    if( $this->auth_data )
        $this->_set_user_variables();

    // Call the post auth hook
    $this->post_auth_hook();

    // Login attempt was successful
    if( $this->auth_data )
    {
      $this->_respond(array(
        'status'   => 1,
        'user' => array(
          'user_id'  => $this->auth_user_id,
          'username' => $this->auth_username,
          'email'    => $this->auth_email
        ),
        'message' => 'Sucessfully logged in as '.$this->auth_username
      ));
    }

    // Login attempt not successful
    else
    {
      $this->tokens->name = 'login_token';

      $on_hold = (
        $this->authentication->on_hold === TRUE OR
        $this->authentication->current_hold_status()
      )
      ? 1 : 0;

      $this->_respond(array(
        'status'  => 0,
        'count'   => $this->authentication->login_errors_count,
        'on_hold' => $on_hold,
        'token'   => $this->tokens->token(),
        'message' => 'Could not find that email/password combination'
      ));
    }
  }

  // GET /api/sessions/current
  public function current()
  {
    $this->is_logged_in();

    // Logged in
    if(!empty($this->auth_user_id))
    {
      $this->_respond(array(
        'status'   => 1,
        'user' => array(
          'user_id'  => $this->auth_user_id,
          'username' => $this->auth_username,
          'email'    => $this->auth_email
        ),
        'message' => 'You are logged in as '.$this->auth_username
      ));
    }

    // Nobody logged in
    else
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
    $this->authentication->logout();

    $this->_respond(array(
      'status'  => 1,
      'message' => "Successfully logged out"
    ));
  }

  private function _respond($data){
    echo json_encode($data);
  }
}

/* End of file sessions.php */
/* Location: /application/controllers/sessions.php */
