## 仿简书博客系统

##### 一.项目背景

博客大家再熟悉不过了，我们可以发一些技术，学习，生活相关的博文提供交流和学习。简书是一个界面简洁美观，功能清晰明了，但却不失优雅的创作平台。学完了node之后萌生一个想法，模仿做一个类似的系统。

##### 二.所用技术

主体上：后端基于node.js的express框架开发，数据库是MongoDB，前端用了jquery，bootstrap等框架。

着重点：

* 主要使用后端渲染，使用的是art-template模板引擎，这样更有利于seo优化。
* 对于如，发表评论，加载更多文章等需要不刷新页面，动态展示的功能，采用前端art-template模板引擎渲染。在后端中写好接口，前端发送Ajax请求去更新渲染这些内容。
* 数据库采用mongoose库进行连接
* 发表功能中集成了一个富文本编辑器（wangEditor），它比百度的UEditor 更轻量简洁。基本满足文章编辑的需求。编辑器链接<http://www.wangeditor.com/>
* 在express中使用了body-parser，express-session，connect-flash，cookie-parser，moment等中间件

##### 三.项目的目录结构说明

* app.js  项目入口文件
* router.js  路由映射关系文件
* models  数据库模型模块
* public 公共目录，包含css，js
* routes 每个路由对应的响应处理模块
* views  所有的html页面
* user 用户数据文件

##### 四.功能演示

1. 登陆

   ![1](<https://raw.githubusercontent.com/yu2487848387/jianshuBlog/master/readmeImages/1.jpg>)

2. 首页

   ![2](<https://raw.githubusercontent.com/yu2487848387/jianshuBlog/master/readmeImages/2.jpg>)

3. 文章详情页

   ![3](<https://raw.githubusercontent.com/yu2487848387/jianshuBlog/master/readmeImages/3.jpg>)

4. 评论

   ![4](<https://raw.githubusercontent.com/yu2487848387/jianshuBlog/master/readmeImages/4.jpg>)

5. 发表

   ![5](<https://raw.githubusercontent.com/yu2487848387/jianshuBlog/master/readmeImages/5.jpg>)

6. 个人中心

   ![6](<https://raw.githubusercontent.com/yu2487848387/jianshuBlog/master/readmeImages/6.jpg>)

7. 设置

   ![7](<https://raw.githubusercontent.com/yu2487848387/jianshuBlog/master/readmeImages/7.jpg>)

8. 消息

   ![8](<https://raw.githubusercontent.com/yu2487848387/jianshuBlog/master/readmeImages/8.jpg>)

9. 后台

   ![9](<https://raw.githubusercontent.com/yu2487848387/jianshuBlog/master/readmeImages/9.jpg>)