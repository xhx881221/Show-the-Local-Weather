//声明存放数据的变量。
var today = {};
var sk = {};
var future = {};

//声明IP回调处理函数，并在获取IP地址后，向聚合数据发送数据请求。
var getLocalIP = function(response) {
  var ipConfig = response.ip;
  var script = document.createElement("script");
  script.src = "https://v.juhe.cn/weather/ip?key=394711a1d12139f55ef2aad300690871&ip=" + ipConfig + "&callback=handleRequest";
  document.body.insertBefore(script, document.body.firstChild);
}

//声明聚合数据回调处理函数，将三组对象数据方别存在三个对象内。并通过DOM操作，实现数据的显示功能。
var handleRequest = function(response) {
  today = response.result.today;
  domOperate("city", today);
  domOperate("week", today);
  domOperate("date_y", today);
  domOperate("weather", today);
  domOperate("temperature", today);
  domOperate("wind", today);
  domOperate("dressing_index", today);
  domOperate("wash_index", today);
  domOperate("travel_index", today);
  domOperate("exercise_index", today);
  domOperate("uv_index", today);
  sk = response.result.sk;
  domOperate("humidity", sk);
  future = Object.values(response.result.future);
  for (var i = 1; i < 7; i++) {
    future_domOperate("week", future[i]);
    future_domOperate("temperature", future[i]);
    future_domOperate("weather", future[i]);
    future_domOperate("wind", future[i]);
  }
}

//向IP地址获取网址，发送数据请求。
var script = document.createElement("script");
script.src = "https://ipinfo.io/json/?callback=getLocalIP";
document.body.insertBefore(script, document.body.firstChild);

//DOM操作函数
var domOperate = function(ID, obj) {
  document.getElementById(ID).innerHTML = document.getElementById(ID).innerHTML + obj[ID];
}
var future_domOperate = function(ID, obj) {
  document.getElementById("future_" + ID).innerHTML = document.getElementById("future_" + ID).innerHTML + obj[ID];
}