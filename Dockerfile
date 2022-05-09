FROM keymetrics/pm2
COPY . /home/www/myblog
WORKDIR /home/www/myblog
EXPOSE 3000
ENTRYPOINT [ "pm2-runtime","start","./src/app.js" ]