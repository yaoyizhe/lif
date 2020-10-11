//加载Express模块
const express = require('express');

//加载MySQL模块
const mysql = require('mysql');

//加载body-parser模块
const bodyParser = require('body-parser');

//加载md5模块
const md5 = require('md5');
const { nextTick } = require('process');

//创建MySQL连接池
const pool = mysql.createPool({
    //MySQL数据库服务器的地址
    host:'127.0.0.1',
    //MySQL数据库服务器端口号
    port:3306,
    //用户名
    user:'root',
    //密码
    password:'',
    //数据库名称
    database:'lofter'
});

//创建Express应用
const server = express();
//托管静态资源
server.use(express.static('./public'))

//使用body-parser模块
server.use(bodyParser.urlencoded({
    extended:false
}));

//获取文章分类信息的API
server.get('/category',(req,res)=>{
    //查询xzqa_category(文章类型)表中所有的记录 
    var sql = 'SELECT id,category_name FROM lf_category';
    // MySQL连接池执行查询操作
    pool.query(sql,(err,results)=>{
        //如果发生异常,则直接抛出异常
        if(err){
            next(err)
            return
        }
        //将相关的查询信息返回到客户端
        res.send({message:'查询成功',code:200,category:results});

    });

});
//获取指定分类文章信息的API
server.get('/getArticles',(req,res)=>{

    //获取地址栏请求参数 -- cid(文章分类ID)
    var cid = req.query.cid;

    //获取地址栏请求参数 -- page(当前页码)
    var page = req.query.page;

    //设置每页显示的记录数
    var pagesize = 5;

    //存储计算后的分页总页数
    var pagecount;

    //查询某一文章分类包含的文章总数
    var sql = 'SELECT COUNT(id) AS count FROM lf_article WHERE category_id=?';
    
    pool.query(sql,[cid],(err,results)=>{
        if(err){
            next(err)
            return
        }
     
        pagecount = Math.ceil(results[0].count / pagesize);
    });
 //页码应该是滚动触发loadMore()函数时提交给服务器
 var offset = (page - 1) * pagesize;
 //以获取到的cid参数为条件查询该分类下的文章信息
 sql = 'SELECT id,title,content,image FROM lf_article WHERE category_id=? LIMIT ' + offset + ',' + pagesize;
 //执行SQL查询
 pool.query(sql,[cid],(err,results)=>{
     if(err){
         next(err)
         return
     }
     res.send({message:'查询成功',code:200,articles:results,pagecount:pagecount});
 });

});

//根据ID获取文章信息的API
server.get('/article',(req,res)=>{
    //获取URL地址栏的参数
    var id = req.query.id;
    //  查询评论
    var sql='select a.id,a.username,a.avatar,c.comment_id,c.content from lf_comment  as c inner join lf_author as a on a.id=c.author_id where c.article_id=?';
    pool.query(sql,[id],(err,results)=>{
        if(err){
            next(err)
            return
        }
        comment=results;
        
    });
    //查下回复
    sql='select a.id as res_id,a.username as responder,a.avatar as res_avatar,b.id as rev_id,b.username as reviewers,b.avatar as rev_avatar,r.content,r.comment_id from lf_replay  as r left join lf_author as a on a.id=r.from_uid left join lf_author as b on b.id=r.to_uid left join lf_comment as c on c.comment_id=r.comment_id';
    pool.query(sql,(err,results)=>{
        if(err){
            next(err)
            return
        }
        replay=results;
        
    });
    //查询图片
    
    pool.query('select s.image from lf_image as s inner join lf_article as c on s.article_id=c.id where c.id=?',[id],(err,results)=>{

        if(err){
            next(err)       
            return
        }
        image=results;
    });
    //根据ID查询指定文章的SQL
    sql = 'SELECT r.id,title,content,username,avatar FROM lf_article AS r INNER JOIN lf_author AS a  ON author_id = a.id WHERE r.id=?';

    pool.query(sql,[id],(err,results)=>{

        if(err){
            next(err)
            return
        }
        //因为数据表中id是主键,也就意味着只存在唯一的一条记录
        res.send({message:'查询成功',code:200,article:results[0],image:image,comment:comment,replay:replay});

    });
     
});

//用户注册API
server.post('/register',(req,res)=>{    
    //获取用户的注册信息
    var phone =req.body.phone;
    var username = req.body.username;
    var password = md5(req.body.password);

    //查询是否存在输入的用户名,如果不存在,则将数据写入到数据表
    //如果存在,则返回错误信息给客户端
    var sql = "SELECT COUNT(id) AS count FROM lf_author WHERE username=? and phone=?"; 
    pool.query(sql,[username,phone],(err,results)=>{
        if(err){
            next(err)
            return
        }     
        //用户已经存在
        if(results[0].count == 1){
            res.send({message:'注册失败',code:201})
        }  else {
            //将获取到的用户信息写入到数据表
            sql = 'INSERT lf_author(phone,username,password) VALUES(?,?,?)';
            pool.query(sql,[phone,username,password],(err,results)=>{

                if(err){
                    next(err)
                    return
                }

                res.send({message:'注册成功',code:200});
            });
        }
    })

});
//用户登录API
server.post('/login',(req,res)=>{
    //获取用户登录的信息
    var phone = req.body.phone;
    var password = md5(req.body.password);

    //以用户名和密码为条件进行查找
    var sql = "SELECT id,username,avatar,phone FROM lf_author WHERE phone=? AND password=?";
    pool.query(sql,[phone,password],(err,results)=>{
        if(err){
            next(err)                       
            return
        }
        if(results.length == 0){
            res.send({message:'登录失败',code:202});
        } else {
            res.send({message:'登录成功',code:200,info:results[0]});
        }

    });
});

server.listen(8080);

app.use((err,req,res,next)=>{
    res.status(500)
    res.send({
        code:500,
        msg:'Sorry! Server tmp error! Plase retry later!',
        err:err
    })
})
