<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Migration_Add_spaces extends CI_Migration {
  public function up() {
    $this->dbforge->add_field(array(
      'id' => array('type' => 'INT', 'constraint' => 10, 'unsigned' => TRUE, 'auto_increment' => TRUE),
      'uid' => array('type' => 'VARCHAR','constraint' => 40, 'null' => FALSE),
      'token' => array('type' => 'VARCHAR','constraint' => 60, 'null' => FALSE),
      'user_id' => array('type' => 'INT', 'constraint' => 10, 'unsigned' => TRUE),
      'data' => array('type' => 'MEDIUMTEXT'),
      'date_created' => array('type' => 'INT', 'unsigned' => TRUE, 'constraint' => 10, 'null' => FALSE),
      'date_modified' => array('type' => 'INT', 'unsigned' => TRUE, 'constraint' => 10, 'null' => FALSE)
    ));
    $this->dbforge->add_key('id', TRUE);
    $this->dbforge->add_key('user_id');
    $this->dbforge->create_table('spaces');
    $this->db->query('ALTER TABLE `spaces` ADD UNIQUE INDEX (`uid`)');
  }
  public function down() {
    $this->dbforge->drop_table('spaces');
  }
}
