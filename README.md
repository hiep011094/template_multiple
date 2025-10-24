1. Setting "npm i"
2. Start "npm start"
3. build WP to public "gulp build_wp_bridge"
3. build convert @media css  "gulp post_css"
--------------------------------------
Set up Server

1. Sửa file docker-compose.yml
+ sửa lại đường dẫn 
wordpress
web_jline_template (đổi tên database)
volumes:
            - 'D:/DATA/hiep_learning/template_multiple/src/wp-bridge/wp-content:/var/www/html/wp-content'

DB
web_jline_template
volumes:
            - 'D:/DATA/hiep_learning/template_multiple/src/wp-bridge/db-data:/var/lib/mysql'


2. Khởi động server:
cd vô src/theme_wp
docker-compose up -d

http://localhost:8001/  (đường dẫn mysqladmin - port 8001 có thể thay đổi tuỳ thích)
http://localhost:8000/   (chạy wordpress - port 8000 có thể thay đổi tuỳ thích)

- đóng server: 
docker-compose down -v  (xoá wordpress , xoá database)

* When done, you can format the css code up the server with the command "gulp post_css"