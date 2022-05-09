# 主要功能包含

- [ ] 使用config来完成环境一键切换  
- [ ] 登录（token） 授权（auth） 图片上传
- [ ] 路由api示例 查询/更新/删除/新增
- [ ] 使用mysql（sequelize）来数据存储
- [ ] redis 和 cron 来做缓存/定时任务等
- [ ] 使用ajv进行数据验证
- [ ] 日志中间件，记录日志
- [ ] 增加mocha示例
- [ ] 完成发送邮件功能

使用docker-compose部署
blog nginx mysql redis

api文档地址 ./doc/api.md

重要提示：
development.json里面配置的host都是对应的docker-compose.yaml的服务名
注释掉了redis.conf  # bind 127.0.0.1 -::1 (用了服务名)

注意： 启动失败可以使用命令 docker container ls -a  查看信息
然后使用 docker logs xxx
每次构建都需要先拉取代码 然后npm install 然后在启动npm run docker-compose
进入容器 docker exec -it 容器名 bash

删除无效的none镜像： docker rmi $(docker images -f "dangling=true" -q)
