var mysql=require("mysql");
var async=require("async");
var _=require('underscore');

var dbConfig={
  host     : 'localhost',
  user     : 'hooper',
  password : 'hooper',
  database : 'hooper'
}

var createPool=function(options){
    
    var pool=mysql.createPool(options);
    return pool;
}


/**SqlStore类
 * -options为数据库配置参数*/
var SqlStore=function(options){
    this.options=options||dbConfig;
    this.pool=createPool(options);
}


/**需要自行调用conn.release()释放连接*/
SqlStore.prototype.getConnection=function(cb){
    this.pool.getConnection(function(err,conn){
        if(err) cb(err,conn);
    });
}

/**
 * 2015-11-25 袁add
 * 用以批量执行一些sql而且可能需要回滚的场景
 * cb:在获取数据库连接后回调,格式为fn(err,conn,next),在使用完conn后，应调用next(err,conn)释放数据库连接
 * beginTran:是否开启数据库事务，会根据回调函数是否传入err对象而决定是提交还是回滚事务
 * commitCB: 在提交或回滚数据库事务后回调，格式为fn(error),如果提交失败会传入error对象*/
SqlStore.prototype.getConnectionWithAutoTran=function(callback,beginTran,commitCB){
    var pool=this.pool;
    /**按顺序执行方法**/
    async.waterfall([
            /**获取数据库连接*/
                function(next){
                pool.getConnection(function(err,conn){
                    if(err||!beginTran){
                        if(err)
                        return callback(err,conn,next);
                    }
                    conn.beginTransaction(function(err){
                        if(err)
                        callback(err,conn,next);
                    });
                });
            }
        ],
        function(err,conn){
            if(!conn){
                return ;
            }

            if(!beginTran){
                return conn.release();
            }
            if(err){
                conn.rollback();
                conn.release();
                if(commitCB)commitCB(err);
                return ;
            }

            conn.commit(function(error){
                if(error){
                    conn.rollback();
                }
                conn.release();
                if(commitCB)commitCB(error);
            });
        }
    );
}
/**在事务里执行sql，执行完毕后自动释放数据库连接*/
SqlStore.prototype.queryInTrans=function(options,callback){
    var pool=this.pool;
    async.waterfall([
        //获取数据库连接
        function(cb){
            pool.getConnection(function(err,conn){
                cb(err,conn);
            });
        },
        //开启事务
        function(conn,cb){
          conn.beginTransaction(function(err){
              cb(err,conn);
          });
        },
        //执行sql
        function(conn,cb){
            conn.query(options,function(err,rows,fields){
                cb(err,conn,rows,fields);
            });
        }
    ],
        function(err,conn,rows,fields){
            if(!conn){
                callback(err,rows,fields);
                return;
            }

            if(err){
               conn.rollback();
               conn.release();
               callback(err,rows,fields);
               return;
            }

            conn.commit(function(error){
               if(error){
                   conn.rollback();
               }

                conn.release();
                callback(error,rows,fields);
            });
        }
    );
}

/**执行sql，执行完毕后自动释放数据库连接*/
SqlStore.prototype.query=function(options,callback){
    var pool=this.pool;
    async.waterfall([
        //获取数据库连接
        function(cb){
            pool.getConnection(function(err,conn){
                cb(err,conn);
            });
        },
        //执行sql
        function(conn,cb){
            conn.query(options,function(err,rows,fields){
                cb(err,conn,rows,fields);
            });
        }
    ],
        function(err,conn,rows,fields){
            if(conn)conn.release();
            callback(err,rows,fields);
        }
    );
}

/**获取查询条件*/
SqlStore.prototype.getSqlWhere=function(where,logic){
    if(_.isString(where))return where;

    logic=logic||'and';
    var objArray=gdds.util.objectToArray(where);
    if(objArray.length<=0)return '';

    var sql=[];
    var params=[];
    var names=objArray[0];
    var values=objArray[1];

    for(var i= 0;i<names.length;i++){
        sql.push('??=?');
        sql.push('and');
        params.push(names[i]);
        params.push(values[i]);
    }

    sql.pop();/**去掉最后添加的and*/
    return mysql.format(sql.join(' '),params);
}

SqlStore.prototype.queryByExample=function(tableName,where,cb,fields,orderBy){
    var sql=['select'];

    fields=fields&&fields.length>0?fields.join(','):'*';
    sql.push(fields);
    sql.push('from');
    sql.push(mysql.escapeId(tableName));


    if(where){
        where=this.getSqlWhere(where);
        sql.push('where');
        sql.push(where);
    }

    if(orderBy){
        sql.push('order by');
        sql.push(orderBy);
    }

    this.query(sql.join(' '),cb);
}

SqlStore.prototype.insert=function(tableName,example,cb){
    var objArray=gdds.util.objectToArray(example);
    if(objArray.length==0)
        return cb();

    var names=objArray[0];
    var values=objArray[1];

    var sql=['insert into'];
    sql.push(tableName);
    sql.push('(');
    sql.push(mysql.escapeId(names));
    sql.push(')');

    sql.push('values');
    sql.push('(');
    sql.push(mysql.escape(values));
    sql.push(')');

    this.query(sql.join(' '),cb);
};

/** add by caijinsheng on 2015/9/25  **/
SqlStore.prototype.insertOrUpdate=function(tableName,example,cb){
    var objArray=gdds.util.objectToArray(example);
    if(objArray.length==0)
        return cb();

    var names=objArray[0];
    var values=objArray[1];

    var sql=['insert into'];
    sql.push(tableName);
    sql.push('(');
    sql.push(mysql.escapeId(names));
    sql.push(')');

    sql.push('values');
    sql.push('(');
    sql.push(mysql.escape(values));
    sql.push(')');

    sql.push('ON DUPLICATE KEY UPDATE');
    sql.push(mysql.escape(example));

    this.query(sql.join(' '),cb);
};

SqlStore.prototype.update=function(tableName,example,where,cb){
    var objArray=gdds.util.objectToArray(example);
    if(objArray.length==0)
        return cb();

    var names=objArray[0];
    var values=objArray[1];

    var sql=['update'];
    sql.push(tableName);
    sql.push('set');
    sql.push(mysql.escape(example));

    if(where){
        where=this.getSqlWhere(where);
        sql.push('where');
        sql.push(where);
    }

    this.query(sql.join(' '),cb);
}

SqlStore.prototype.delete=function(tableName,where,cb){
    var sql=['delete from'];
    sql.push(tableName);

    if(where){
        where=this.getSqlWhere(where);
        sql.push('where');
        sql.push(where);
    }

    this.query(sql.join(' '),cb);
}


module.exports=function(options){
    return new SqlStore(options);
}
