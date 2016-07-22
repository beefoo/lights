<?php
class Spaces_model extends CI_Model {
  function __construct() {
    parent::__construct();
  }

  function accessibleFields(){
    return array("data");
  }

  function getEntryByUid($uid){
    $query = $this->db->get_where('spaces', array('uid' => $uid), 1);
    $result = $query->result();
    return (count($result) > 0) ? $this->parseEntry($result[0]) : FALSE;
  }

  function getEntryByUserId($user_id){
    $query = $this->db->get_where('spaces', array('user_id' => $user_id), 1);
    $result = $query->result();
    return (count($result) > 0) ? $this->parseEntry($result[0]) : FALSE;
  }

  function insertEntry($data) {
    $data['date_created'] = time();
    $data['uid'] = random_string('alnum', 16);
    $data['token'] = random_string('alnum', 60);
    $this->db->insert('spaces', $data);
    $data['data'] = json_decode($data['data']);
    return $data;
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
