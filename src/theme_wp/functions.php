<?php
include_once('includes/styles-scripts-all.php');
// include_once('includes/download_tracker.php');
// ================ DEFAULT SETTING ===================
//add Featured Image
add_theme_support( 'post-thumbnails' );

//remove_filter( 'the_excerpt', 'wpautop' );
/*increa limit upload file*/
@ini_set( 'upload_max_size', '64M' );
@ini_set( 'post_max_size', '64M' );
@ini_set( 'max_execution_time', '300' );
/*--add feature images--*/

function custom_upload_mime_types( $mime_types ) {
    $mime_types['svg'] = 'image/svg+xml'; 
    return $mime_types;
}
add_filter( 'upload_mimes', 'custom_upload_mime_types' );

//ADD MENU
if ( function_exists( 'register_nav_menu' ) ) {
    register_nav_menu( 'main-menu', 'Main Menu' );
}
//EXCERPT
add_post_type_support( 'page', 'excerpt' );

require_once( dirname( __FILE__ ) . '/includes/shortcode.php' );
// ================ END DEFAULT SETTING ===================


// Prevent WP from adding <p> tags on pages
function disable_wp_auto_p( $content ) {
    if ( is_singular( 'page' ) ) {
        remove_filter( 'the_content', 'wpautop' );
        remove_filter( 'the_excerpt', 'wpautop' );
    }
    return $content;
}
add_filter( 'the_content', 'disable_wp_auto_p', 0 );

//EXCERPT
add_post_type_support( 'page', 'excerpt' );

// Prevent WP from adding <p> tags on pages by Contact form 7
add_filter('wpcf7_autop_or_not', '__return_false');

add_filter('show_admin_bar', function($show) {
    if (!is_admin()) {
        return false;
    }
    return $show;
});
?>
