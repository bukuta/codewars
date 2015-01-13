var fs=require('fs');
var UglifyJS=require('uglifyjs');

/**
 * 按字符串分析源码
 *  取出define调用
 *  查看调用参数
 *
 *  转换define调用:
 *    添加id,
 *    修改depends为绝对路径
 *    修改require("")为绝对路径
 *
 *
 * 统计
 *
 *
 */
