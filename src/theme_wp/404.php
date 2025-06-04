<?php
get_header();
?>
<!-- ↓↓ main ↓↓ -->
<main class="p_404">
    <!-- ↓↓ mv ↓↓ -->
    <?php include __DIR__ . '/includes/mv.php'; ?>
    <!-- ↑↑ mv ↑↑ -->
    <!-- ↓↓ 404 ↓↓ -->
    <div class="l_container">
        <div class="p_404__inner" data-aos="fade-up" style="padding: 100px 0">
            <p>お探しのページは見つかりません。</br>一時的にアクセスできない状態か、移動もしくは削除されてしまった可能性があります。</p>
            <div class="btn" style="width: 280px; margin-top:30px;">                            
                <a href="<?= home_url(); ?>" class="c_btn03">
                    <span class="c_btn02__text">トップへ戻る</span>
                    <svg class="c_btn02__icon" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.70702 7.15554C8.09766 6.79249 8.09766 6.20454 7.70702 5.84149L1.70846 0.272152C1.31762 -0.0907178 0.683965 -0.0907179 0.293128 0.272152C-0.0977086 0.635022 -0.0977086 1.22334 0.293128 1.58621L5.58462 6.5L0.295327 11.4138C-0.0955099 11.7767 -0.0955099 12.365 0.295327 12.7278C0.686163 13.0907 1.31982 13.0907 1.71066 12.7278L7.71002 7.15852L7.70702 7.15554Z" fill="#fff"/>
                    </svg>                                                                  
                </a>
            </div>
        </div>        
    </div>
    <!-- ↑↑ 404 ↑↑ -->
</main>
<!-- ↑↑ main ↑↑ -->
<?php
get_footer();
?>