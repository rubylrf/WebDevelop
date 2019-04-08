<?php

# Success response

sleep(2);
$json = json_decode($HTTP_RAW_POST_DATA);
echo json_encode($json->data);


#############################################################################


# Error response

// echo json_encode(array('status'=>'failure', 'msg'=>'ERROR: Access denied.'));