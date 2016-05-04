<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Form_validation extends CI_Form_validation {

  public function error_array()
  {
    return $this->_error_array;
  }

}

/* End of file MY_Form_validation.php */
/* Location: /application/libraries/MY_Form_validation.php */
