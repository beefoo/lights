<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Users extends MY_Controller
{
  public function __construct()
  {
    parent::__construct();

    // Force SSL
    //$this->force_ssl();
  }

  // POST /api/users/create?username=XXX&passwd=XXX&email=XXX
  public function create()
  {
    // retrieve user data
    $user_data = $this->_getData(array('username','passwd','email'));

    // retrieve auth user
    $this->is_logged_in();

    // Load resources
    $this->load->model('users_model');
    $this->load->model('validation_callables');
    $this->load->library('form_validation');

    // Setup validation rules
    $this->form_validation->set_data($user_data);
    $validation_rules = $this->_validationRulesCreate();
    $this->form_validation->set_rules($validation_rules);

    // Run validation
    if( $this->form_validation->run() )
    {
      $user_data['passwd']     = $this->authentication->hash_passwd($user_data['passwd']);
      $user_data['user_id']    = $this->users_model->get_unused_id();
      $user_data['created_at'] = date('Y-m-d H:i:s');

      // If username is not used, it must be entered into the record as NULL
      if(empty($user_data['username']))
      {
        $user_data['username'] = NULL;
      }

      $this->db->set($user_data)
        ->insert(config_item('user_table'));

      if( $this->db->affected_rows() == 1 )
        $this->_respond(array(
          'status'  => 1,
          'message' => 'User ' . $user_data['username'] . ' was successfully created'
        ));
    }

    // Validation failed
    else
    {
      $this->_respond(array(
        'status'  => 0,
        'message' => 'Registration contains errors',
        'errors' => $this->form_validation->error_array()
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

  private function _validationRulesCreate(){
    return array(
      array(
        'field' => 'username',
        'label' => 'username',
        'rules' => 'max_length[20]|is_unique[' . config_item('user_table') . '.username]',
        'errors' => array('is_unique' => 'Username already in use.')
      ),
      array(
        'field' => 'passwd',
        'label' => 'passwd',
        'rules' => 'trim|required|min_length['. config_item('min_chars_for_password') .']|max_length['. config_item('max_chars_for_password') .']',
        'errors' => array(
            'required' => 'The password field is required.'
        )
      ),
      array(
        'field'  => 'email',
        'label'  => 'email',
        'rules'  => 'trim|required|valid_email|is_unique[' . config_item('user_table') . '.email]',
        'errors' => array('is_unique' => 'Email address already in use.')
      )
    );
  }
}

/* End of file users.php */
/* Location: /application/controllers/users.php */
