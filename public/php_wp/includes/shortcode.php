<?php
/* Template directory */
add_shortcode('tmpurl', 'shortcode_tmpurl');
function shortcode_tmpurl() {
	return get_bloginfo('template_url');
}

/* Site directory */
add_shortcode('siteurl', 'shortcode_siteurl');
function shortcode_siteurl() {
	return get_bloginfo('url');
}
?>