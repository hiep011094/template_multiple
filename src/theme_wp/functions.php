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


add_action('wp_ajax_fetch_random_posts', 'fetch_random_posts');
add_action('wp_ajax_nopriv_fetch_random_posts', 'fetch_random_posts'); 

function fetch_random_posts() {

    $args = array(
        'post_type'      => 'prize', 
        'posts_per_page' => 1,    
        'orderby'        => 'rand',
    );
    
    $query = new WP_Query($args);

    $posts_html = '';
    $layout = '';
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            if( have_rows('set_layout') ):
                while ( have_rows('set_layout') ) : the_row();  
                    $layout = get_row_layout();
                    if( $layout == 'layout_01' ):
                        $layout_01_img = '';
                        if(get_sub_field('layout_01_img')) {
                            $layout_01_img = '<figure class="c_popup03__content01__banner">
                                                    <img src="'.get_sub_field('layout_01_img')['url'].'" alt="">
                                                </figure>';
                        }
                        $posts_html .= '<div class="c_popup03__inner">       
                                            <span class="c_popup03__close js_close">
                                                <svg viewBox="0 0 17.356 17.356">
                                                    <path d="M8.678,12.149,3.471,17.356,0,13.884,5.207,8.678,0,3.471,3.471,0,8.678,5.207,13.884,0l3.471,3.471L12.149,8.678l5.207,5.207-3.471,3.471Z" fill="#f39800"/>
                                                </svg>                              
                                            </span>         
                                            <div class="c_popup03__content01">
                                                <figure class="c_popup03__content01__img01">
                                                    <img src="'.get_theme_file_uri().'/assets/images/common/img_bones_with_flesh_01.svg" alt="">
                                                </figure>
                                                '.$layout_01_img.'
                                            </div>   
                                            <div class="c_popup03__content02">
                                                <figure class="c_popup03__content02__txt">
                                                    <img src="'.get_theme_file_uri().'/assets/images/common/img_text02.svg" alt="">
                                                </figure>
                                            </div>    
                                            <div class="c_popup03__list">
                                                <div class="c_popup03__list__item">
                                                    <a href="" class="c_popup03__list__link">
                                                        <span class="c_popup03__list__img">
                                                            <img src="'.get_theme_file_uri().'/assets/images/common/img_01.png" alt="">
                                                        </span>
                                                        <span class="c_popup03__list__txt">
                                                            <img src="'.get_theme_file_uri().'/assets/images/common/img_text03.svg" alt="">
                                                        </span>
                                                    </a>
                                                </div>
                                                <div class="c_popup03__list__item">
                                                    <a href="https://wamhouse.net/" class="c_popup03__list__link" target="_blank" rel="noopener noreferrer">
                                                        <span class="c_popup03__list__img">
                                                            <img src="'.get_theme_file_uri().'/assets/images/common/img_02.png" alt="">
                                                        </span>
                                                        <span class="c_popup03__list__txt">
                                                            <img src="'.get_theme_file_uri().'/assets/images/common/img_text04.svg" alt="">
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>         
                                        </div>';
                    elseif( $layout == 'layout_02' ): 
                        $layout_02_img = '';  
                        $layout_02_content = '';  
                        if(get_sub_field('layout_02_img')) {
                            $layout_02_img = '<figure class="c_popup01__content01__img03">
                                                    <img src="'.get_sub_field('layout_02_img')['url'].'" alt="">
                                                </figure>';
                        }
                        if(get_sub_field('layout_02_content')) {
                            $layout_02_content = get_sub_field('layout_02_content');
                        }
                        $posts_html .= '<div class="c_popup01__inner">                
                                            <div class="c_popup01__content01">
                                                <figure class="c_popup01__content01__img01">
                                                    <img src="'.get_theme_file_uri().'/assets/images/common/img_bones04.svg" alt="">
                                                    <span class="c_popup01__close js_close">
                                                        <svg viewBox="0 0 17.356 17.356">
                                                            <path d="M8.678,12.149,3.471,17.356,0,13.884,5.207,8.678,0,3.471,3.471,0,8.678,5.207,13.884,0l3.471,3.471L12.149,8.678l5.207,5.207-3.471,3.471Z" fill="#f39800"/>
                                                        </svg>                              
                                                    </span>
                                                </figure>
                                                <div class="c_popup01__scroll">
                                                    '.$layout_02_img.'
                                                    <div class="c_popup01__content01__txt">
                                                        '.$layout_02_content.'
                                                    </div>
                                                </div>
                                                <figure class="c_popup01__content01__img02">
                                                    <img src="'.get_theme_file_uri().'/assets/images/common/img_bones05.svg" alt="">
                                                </figure>
                                            </div>   
                                            <div class="c_popup01__content02">
                                                <figure class="c_popup01__content02__txt">
                                                    <img src="'.get_theme_file_uri().'/assets/images/common/img_text02.svg" alt="">
                                                </figure>
                                            </div>    
                                            <div class="c_popup01__list">
                                                <div class="c_popup01__list__item">
                                                    <a href="" class="c_popup01__list__link">
                                                        <span class="c_popup01__list__img">
                                                            <img src="'.get_theme_file_uri().'/assets/images/common/img_01.png" alt="">
                                                        </span>
                                                        <span class="c_popup01__list__txt">
                                                            <img src="'.get_theme_file_uri().'/assets/images/common/img_text03.svg" alt="">
                                                        </span>
                                                    </a>
                                                </div>
                                                <div class="c_popup01__list__item">
                                                    <a href="https://wamhouse.net/" class="c_popup01__list__link" target="_blank" rel="noopener noreferrer">
                                                        <span class="c_popup01__list__img">
                                                            <img src="'.get_theme_file_uri().'/assets/images/common/img_02.png" alt="">
                                                        </span>
                                                        <span class="c_popup01__list__txt">
                                                            <img src="'.get_theme_file_uri().'/assets/images/common/img_text04.svg" alt="">
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>         
                                        </div>';
                    else:
                        $layout_03_img = '';  
                        $layout_03_content = '';  
                        if(get_sub_field('layout_03_img')) {
                            $layout_03_img = '<figure class="c_popup02__content01__img03">
                                                    <img src="'.get_sub_field('layout_03_img')['url'].'" alt="">
                                                </figure>';
                        }
                        if(get_sub_field('layout_03_content')) {
                            $layout_03_content = get_sub_field('layout_03_content');
                        }
                        $posts_html .= '<div class="c_popup02__inner">                
                                            <div class="c_popup02__content01">
                                                <figure class="c_popup02__content01__img01">
                                                    <img src="'.get_theme_file_uri().'/assets/images/common/img_bones06.svg" alt="">
                                                    <span class="c_popup02__close js_close">
                                                        <svg viewBox="0 0 17.356 17.356">
                                                            <path d="M8.678,12.149,3.471,17.356,0,13.884,5.207,8.678,0,3.471,3.471,0,8.678,5.207,13.884,0l3.471,3.471L12.149,8.678l5.207,5.207-3.471,3.471Z" fill="#f39800"/>
                                                        </svg>                              
                                                    </span>
                                                </figure>
                                                <div class="c_popup01__scroll">
                                                    '.$layout_03_img.'
                                                    <div class="c_popup02__content01__txt">
                                                        '.$layout_03_content.'
                                                    </div>
                                                </div>
                                                <figure class="c_popup02__content01__img02">
                                                    <img src="'.get_theme_file_uri().'/assets/images/common/img_bones07.svg" alt="">
                                                </figure>
                                            </div>   
                                            <div class="c_popup02__content02">
                                                <figure class="c_popup02__content02__txt">
                                                    <img src="'.get_theme_file_uri().'/assets/images/common/img_text02.svg" alt="">
                                                </figure>
                                            </div>    
                                            <div class="c_popup02__list">
                                                <div class="c_popup02__list__item">
                                                    <a href="" class="c_popup02__list__link">
                                                        <span class="c_popup02__list__img">
                                                            <img src="'.get_theme_file_uri().'/assets/images/common/img_01.png" alt="">
                                                        </span>
                                                        <span class="c_popup02__list__txt">
                                                            <img src="'.get_theme_file_uri().'/assets/images/common/img_text03.svg" alt="">
                                                        </span>
                                                    </a>
                                                </div>
                                                <div class="c_popup02__list__item">
                                                    <a href="https://wamhouse.net/" class="c_popup02__list__link" target="_blank" rel="noopener noreferrer">
                                                        <span class="c_popup02__list__img">
                                                            <img src="'.get_theme_file_uri().'/assets/images/common/img_02.png" alt="">
                                                        </span>
                                                        <span class="c_popup02__list__txt">
                                                            <img src="'.get_theme_file_uri().'/assets/images/common/img_text04.svg" alt="">
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>         
                                        </div>';
                    endif;
                endwhile;
            endif;
        }        
    }

    wp_send_json_success(array(
        'html'   => $posts_html,
        'layout' => $layout,
    ));

    wp_reset_postdata();
    wp_die();
}


add_action('wp_enqueue_scripts', 'enqueue_ajax_script');
function enqueue_ajax_script() {
    wp_enqueue_script('ajax-random-posts', get_template_directory_uri() . '/assets/js/custom-ajax.js', ['jquery'], null, true);
    wp_localize_script('ajax-random-posts', 'ajax_obj', [
        'ajax_url' => admin_url('admin-ajax.php')
    ]);
}

add_filter('show_admin_bar', function($show) {
    if (!is_admin()) {
        return false;
    }
    return $show;
});
?>
