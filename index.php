<?php
if ( ! defined('SERVER_ADMIN'))
{
    define('SERVER_ADMIN',trim($_SERVER['SERVER_ADMIN']));
}
function getDomain()
{
    $domain = isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : $_SERVER['HTTP_HOST'];
    $domain = preg_replace('/^([\w-]+\.)?([\w-]+\.[\w-]+)(\:\d+)?$/',"$2",$domain);
    return $domain;
}
function isMobile()
{
    $to_pc = (int) $_GET['toPC'];
    if ($to_pc)
    {
        return FALSE;
    }
    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    $mobile_agents = Array(
        "240x320", "acer", "acoon",
        "acs-", "abacho", "ahong", "airness", "alcatel",
        "amoi", "android", "anywhereyougo.com",
        "applewebkit/525", "applewebkit/532", "asus",
        "audio", "au-mic", "avantogo", "becker", "benq",
        "bilbo", "bird", "blackberry", "blazer", "bleu",
        "cdm-", "compal", "coolpad", "danger", "dbtel",
        "dopod", "elaine", "eric", "etouch", "fly ",
        "fly_", "fly-", "go.web", "goodaccess",
        "gradiente", "grundig", "haier", "hedy",
        "hitachi", "htc", "huawei", "hutchison",
        "inno", "ipad", "ipaq", "ipod", "jbrowser",
        "kddi", "kgt", "kwc", "lenovo", "lg ", "lg2",
        "lg3", "lg4", "lg5", "lg7", "lg8", "lg9", "lg-",
        "lge-", "lge9", "longcos", "maemo", "mercator",
        "meridian", "micromax", "midp", "mini", "mitsu",
        "mmm", "mmp", "mobi", "mot-", "moto", "nec-",
        "netfront", "newgen", "nexian", "nf-browser",
        "nintendo", "nitro", "nokia", "nook", "novarra",
        "obigo", "palm", "panasonic", "pantech", "philips",
        "phone", "pg-", "playstation", "pocket", "pt-",
        "qc-", "qtek", "rover", "sagem", "sama", "samu",
        "sanyo", "samsung", "sch-", "scooter", "sec-",
        "sendo", "sgh-", "sharp", "siemens", "sie-",
        "softbank", "sony", "spice", "sprint", "spv",
        "symbian
            ", "tablet", "talkabout", "tcl-",
        "teleca", "telit", "tianyu", "tim-", "toshiba",
        "tsm", "up.browser", "utec", "utstar", "verykool",
        "virgin", "vk-", "voda", "voxtel", "vx", "wap",
        "wellco", "wig browser", "wii", "windows ce",
        "wireless", "xda", "xde", "zte"
    );
    $is_mobile = false;
    foreach ($mobile_agents as $device) {
        if (stristr($user_agent, $device)) {
            $is_mobile = true;
            break;
        }
    }
    return $is_mobile;
}
$domain = getDomain();
if (isMobile())
{
    $url = 'http://m.'.$domain;
    header('Location: '.$url);
    exit;
} 
?> <!DOCTYPE html><html><head><meta charset=utf-8><link rel="shortcut icon" sizes=48x48 href=//jkysxh.cn/img/pc/static/favicon_<?php echo SERVER_ADMIN;?>.ico><title>WELCOME</title><link rel=stylesheet href=static/css/<?php echo SERVER_ADMIN;?>.css><script src=static/js/<?php echo SERVER_ADMIN;?>_global.config.js></script><link href=./static/css/app.ff7c1d6ac5db07797cdb76c3cf9d03e2.css rel=stylesheet></head><body><div id=app></div><script type=text/javascript src=./static/js/manifest.cc5bb8b333ff314f4c82.js></script><script type=text/javascript src=./static/js/vendor.7ef17549de2433cf2d21.js></script><script type=text/javascript src=./static/js/app.21ffd4f4f510dad9e890.js></script></body></html>