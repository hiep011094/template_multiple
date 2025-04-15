<?php
add_action( 'wp_enqueue_scripts', function() {
    $themeUrl = get_template_directory_uri();

    
    // css files
    wp_enqueue_style( 'aos-css', $themeUrl . '/assets/css/aos.css?ver=1.0.1' );
    wp_enqueue_style( 'style-css', $themeUrl . '/assets/css/common.css?ver=1.0.1' );

    if(is_front_page()){
        wp_enqueue_style( 'top-css', $themeUrl . '/assets/css/top.css?ver=1.0.1' );
    }

    

   

    // js files

    wp_enqueue_script( 'jquery-js', $themeUrl . '/assets/js/jquery-3.5.1.min.js', array(), '1.0', true );    
    wp_enqueue_script( 'aos-js', $themeUrl . '/assets/js/aos.js', array(), '1.0', true );
    wp_enqueue_script( 'common-js', $themeUrl . '/assets/js/common.js', array(), '1.0', true );
    

    // js only page, post
    if(is_front_page()){
        wp_enqueue_script( 'top-js', $themeUrl . '/assets/js/top.js', array(), '1.0', true );
    }
} );


?>