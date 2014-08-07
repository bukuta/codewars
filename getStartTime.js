function getStartTime(schedules,duration){
  //转换时间格式为表示分钟的数字形式
  //计算出各人的空闲时间段
  //对空闲时间段取交集
  //遍历交集，找到长度大于等于duration的块，返回此块开始时间
  get_free_points(schedules);
  return ;
}
function get_free_points(schedules){
  var new_schedules=schedules.map(function(row){
    return row.map(function(clip){
      return clip.map(function(time){
        return parseTime(time);
      });
    });
  });
  console.log(new_schedules);
}
function is_free_at(schedules,minutes){

}
function is_last_enough_at(schedules,minutes,duration){

}
function formatTime(minutes){
  return Math.floor(minutes/60)+":"+minutes%60;
}
function parseTime(timestr){
  return timestr.split(':').map(Number).reduce(function(minutes,min,index,arr){
    return minutes+min*Math.pow(60,(arr.length-1-index));
  },0);
}
var schedules = [
  [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
  [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
  [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
];
var assert=require('assert');
assert.equal(getStartTime(schedules, 60), '12:15','error');
assert.equal(getStartTime(schedules, 90), null,'error');
