<?php
class Spaces_model extends CI_Model {
  function __construct() {
    parent::__construct();
  }

  function accessibleFields(){
    return array("uid", "data");
  }

  function getEntryByUid($uid){
    $query = $this->db->get_where('spaces', array('uid' => $uid), 1);
    $result = $query->result();
    return (count($result) > 0) ? parseEntry($result[0]) : FALSE;
  }

  function insertEntry($data) {
    $data['date_created'] = time();
    $this->db->insert('spaces', $data);
  }

  function parseEntry($entry) {
    $entry->data = json_decode($entry->data);
    return $entry;
  }

  function updateEntry($id, $data) {
    $data['date_modified'] = time();
    $this->db->update('spaces', $data, array('id' => $id));
  }
}
