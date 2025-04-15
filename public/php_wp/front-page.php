<?php
get_header();
?>
<!-- ↓↓ main ↓↓ -->
<script>
    if (!window.sessionStorage.getItem("storage_loadding")) {
        document.documentElement.classList.add("is_loadding");    
        window.sessionStorage.setItem("storage_loadding", new Date().getTime().toString());    
    }
</script>
<main class="p_top">   
    <div class="c_loading">
        <div class="c_loading__inner">
            <div class="c_loading__content">
                <div class="c_loading__item"></div>
                <div class="c_loading__item"></div>
            </div>
        </div>
    </div>   
    <div class="p_top__inner">
        <figure class="p_top__title">
            <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_text01.svg" alt="">
        </figure>
        <div class="p_top__lucky">
            <div class="p_top__lucky__inner js_lucky">
                <div class="p_top__lucky__img">
                    <img class="img_mocha_01" src="<?= get_theme_file_uri(); ?>/assets/images/common/img_mocha_01.svg" alt="">
                    <img class="img_mocha_02" src="<?= get_theme_file_uri(); ?>/assets/images/common/img_mocha_02.svg" alt="">
                    <svg class="img_mocha_03" xmlns="http://www.w3.org/2000/svg" width="165.279" height="266.264" viewBox="0 0 165.279 266.264">
                        <path d="M327.189,112.652a16.125,16.125,0,0,0-1.944-2.168C299.769,86.823,264.676,71.75,225.688,70.45c9.872,5.431,21.333,13.948,36.926,27.336.734.63,10.97,14.081,11.556,14.865a153.623,153.623,0,0,1,0,181.732c-.586.784-1.3,1.443-1.945,2.168-19.43,21.952-48.606,34.446-80.56,38.586a237.647,237.647,0,0,0,28.554,1.576c41.175,0,80.719-12.7,105.025-40.163.641-.724,1.359-1.383,1.944-2.168a153.622,153.622,0,0,0,0-181.732" transform="translate(-191.665 -70.45)" fill="#c5ddea"/>
                        <rect width="165.278" height="266.264" transform="translate(0 0)" fill="none"/>
                    </svg>
                    <svg class="img_mocha_04" xmlns="http://www.w3.org/2000/svg" width="21.103" height="96.631" viewBox="0 0 21.103 96.631">
                        <path d="M395.037,328.272a7.966,7.966,0,0,1-.627-1.647,8.144,8.144,0,0,1-.258-1.465,8.252,8.252,0,0,1,.186-2.606,44.908,44.908,0,0,1,1.1-4.866,36.268,36.268,0,0,1,1.81-4.633,7.646,7.646,0,0,1,1.335-2.236,7.959,7.959,0,0,1,1.1-1.037,7.768,7.768,0,0,1,1.548-.963l.289-.131a5.3,5.3,0,0,1,6.33,1.522,7.54,7.54,0,0,1,1.491,3.154,8.352,8.352,0,0,1,.16,1.473,11.568,11.568,0,0,1-.106,1.416,26.057,26.057,0,0,1-1.136,5.511,29.069,29.069,0,0,1-2.358,5.116,11.4,11.4,0,0,1-.747,1.21,9.2,9.2,0,0,1-.982,1.108,7.824,7.824,0,0,1-2.921,1.761,5.052,5.052,0,0,1-6.054-2.4Z" transform="translate(-390.837 -234.59)" fill="#fff"/>
                        <path d="M401.051,232.744a20.225,20.225,0,0,1-1.348-2.958c-.385-.977-.73-1.948-1.006-2.918-.3-.968-.582-1.93-.8-2.9-.246-.962-.457-1.926-.652-2.89-.859-3.845-1.886-7.621-2.925-11.383s-2.1-7.522-3.307-11.264c-.31-.932-.642-1.857-.909-2.813-.3-.943-.551-1.909-.771-2.9a30.291,30.291,0,0,1-.566-3.04,18.786,18.786,0,0,1-.252-3.272l0-.2a3.8,3.8,0,0,1,5.923-3.06,18.672,18.672,0,0,1,2.677,2.258,30.171,30.171,0,0,1,2.2,2.574c.644.91,1.274,1.833,1.824,2.8s1.041,1.956,1.516,2.955a70.465,70.465,0,0,1,4.644,12.452,73.807,73.807,0,0,1,2.152,13.109c.074,1.1.162,2.206.16,3.314s-.059,2.22-.166,3.329a31.824,31.824,0,0,1-.559,3.323,20.678,20.678,0,0,1-1.083,3.294,3.738,3.738,0,0,1-6.667.348Z" transform="translate(-388.515 -182.503)" fill="#fff"/>
                    </svg>

                    <img class="img_02" src="<?= get_theme_file_uri(); ?>/assets/images/common/img_house.png" alt="">
                    <img class="img_03" src="<?= get_theme_file_uri(); ?>/assets/images/common/img_turn.svg" alt="">    
                    <svg class="img_04" xmlns="http://www.w3.org/2000/svg" width="182.657" height="37.69" viewBox="0 0 182.657 37.69">
                        <path d="M262.048,480.29H89.569a5.089,5.089,0,0,0-5.089,5.089v27.513a5.089,5.089,0,0,0,5.089,5.088H262.048a5.089,5.089,0,0,0,5.089-5.088V485.379a5.089,5.089,0,0,0-5.089-5.089" transform="translate(-84.48 -480.29)" fill="#f37b68"/>
                    </svg>
                </div>
                <figure class="img_bones01 bones">
                    <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones01.svg" alt="">
                </figure>
                <figure class="img_bones01 bones">
                    <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones01.svg" alt="">
                </figure>
                <figure class="img_bones01 bones">
                    <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones01.svg" alt="">
                </figure>
                <figure class="img_bones01 bones">
                    <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones01.svg" alt="">
                </figure>
                <figure class="img_bones02 bones">
                    <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones02.svg" alt="">
                </figure>
                <figure class="img_bones02 bones">
                    <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones02.svg" alt="">
                </figure>
                <figure class="img_bones02 bones">
                    <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones02.svg" alt="">
                </figure>
                <figure class="img_bones02 bones">
                    <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones02.svg" alt="">
                </figure>
                <figure class="img_bones02 bones">
                    <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones02.svg" alt="">
                </figure>
                <figure class="img_bones02 bones">
                    <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones02.svg" alt="">
                </figure>

                <figure class="img_bones03 bones">
                    <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones_with_flesh_02.svg" alt="">
                </figure>
                <figure class="img_bones03 bones">
                    <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones_with_flesh_02.svg" alt="">
                </figure>

                <span class="p_top__lucky__dots">
                    <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_dots.svg" alt="">
                </span>
            </div>
            <span class="p_top__lucky__btn js_lucky">
                <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_btn.svg" alt="">
            </span>
        </div>
        <div class="c_loadpopup">
            <div class="c_loadpopup__inner">
                <div class="c_loadpopup__animation">                    
                    <span class="c_loadpopup__circle">
                        <span class="c_loadpopup__circle__item"></span>
                        <span class="c_loadpopup__circle__item"></span>
                        <span class="c_loadpopup__circle__item"></span>
                        <span class="c_loadpopup__circle__item"></span>
                        <span class="c_loadpopup__circle__item"></span>
                        <span class="c_loadpopup__circle__item"></span>
                        <span class="c_loadpopup__circle__item"></span>
                        <span class="c_loadpopup__circle__item"></span>
                    </span>   
                    <figure class="c_loadpopup__bones01">
                        <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones_with_flesh_02.svg" alt="">
                    </figure>   
                    <figure class="c_loadpopup__bones02">
                        <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones01.svg" alt="">
                    </figure>   
                    <figure class="c_loadpopup__bones03">
                        <img src="<?= get_theme_file_uri(); ?>/assets/images/common/img_bones02.svg" alt="">
                    </figure>               
                </div>
            </div>
        </div>
        <div class="c_popup01 js_popup"></div>
        <div class="c_popup02 js_popup"></div>
        <div class="c_popup03 js_popup"></div>
    </div> 
</main>
<!-- ↑↑ main ↑↑ -->
<?php
get_footer();
?>