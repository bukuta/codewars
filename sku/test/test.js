var expect=require('chai').expect;
var colors=require('colors');
var SkuSelector=require('../lib/sku.js');

describe("A",function(){
  it("aaaa",function(){
    expect(1).to.equal(1);
    });
  it('bbb',function(){
      expect(2).to.equal(2);
    });
});

//白-XL====== disabled
var attrs=[
{ "alias": "0", "attrValues": [
    { "alias": "黄色", "id": 10157, "value": "黄色" },
    { "alias": "白色", "id": 10156, "value": "白色" }
  ], "id": 1000000115, "name": "颜色" },
{ "alias": "0", "attrValues": [
  { "alias": "XL", "id": 10158, "value": "XL" },
  { "alias": "XLL", "id": 10159, "value": "XLL" }
  ], "id": 1000000116, "name": "型号" }
];

var skus={
  "10156_10158_": { "id": 10516, "price": 10, "saleNum": 0, "skuCode": "00489", "stockNum": 0 },
  "10156_10159_": { "id": 10517, "price": 20, "saleNum": 0, "skuCode": "00490", "stockNum": 200 },
  "10157_10158_": { "id": 10518, "price": 30, "saleNum": 0, "skuCode": "00491", "stockNum": 300 },
  "10157_10159_": { "id": 10519, "price": 40, "saleNum": 0, "skuCode": "00492", "stockNum": 3 }
};

//var skuselector0=new SkuSelector(attrs,skus);
//skuselector0.updateSKU([10157]);
//skuselector0.updateSKU([10156]);
//skuselector0.updateSKU([10158]);
//skuselector0.updateSKU([10159]);
//skuselector0.updateSKU([10156,10159]);
//skuselector0.updateSKU([10157,10158]);
//skuselector0.updateSKU([10157,10159]);
console.log("========================================");

var attrs1=[
  { "alias": "0", "attrValues": [
      { "alias": "黄色", "id": 10157, "value": "黄色" },
      { "alias": "白色", "id": 10156, "value": "白色" }
    ], "id": 1000000115, "name": "颜色" },
  { "alias": "0", "attrValues": [
      { "alias": "XL", "id": 10158, "value": "XL" },
      { "alias": "XLL", "id": 10159, "value": "XLL" }
    ], "id": 1000000116, "name": "型号" },
  { "alias": "0", "attrValues": [
      { "alias": "青少年", "id": 10164, "value": "青少年" },
      { "alias": "儿童", "id": 10163, "value": "儿童" }
    ], "id": 1000000125, "name": "人群" }
];

var skus1={
  "10156_10158_10163_": { "id": 10520, "price": 10, "saleNum": 0, "skuCode": "00493", "stockNum": 0 },
  "10156_10158_10164_": { "id": 10521, "price": 20, "saleNum": 0, "skuCode": "00494", "stockNum": 200 },
  "10156_10159_10163_": { "id": 10522, "price": 30, "saleNum": 0, "skuCode": "00495", "stockNum": 0 },
  "10156_10159_10164_": { "id": 10523, "price": 40, "saleNum": 0, "skuCode": "00496", "stockNum": 400 },
  "10157_10158_10163_": { "id": 10524, "price": 50, "saleNum": 0, "skuCode": "00497", "stockNum": 0 },
  "10157_10158_10164_": { "id": 10525, "price": 60, "saleNum": 0, "skuCode": "00498", "stockNum": 10 },//disabled
  "10157_10159_10163_": { "id": 10526, "price": 70, "saleNum": 0, "skuCode": "00499", "stockNum": 0 },
  "10157_10159_10164_": { "id": 10527, "price": 80, "saleNum": 0, "skuCode": "00500", "stockNum": 800 }
};

function test(){
var skuselector2=new SkuSelector(attrs1,skus1);
//skuselector.updateSKU([10158,10157]);
skuselector2.updateSKU([10156]);
skuselector2.updateSKU([10157]);
skuselector2.updateSKU([10158]);
skuselector2.updateSKU([10163]);
skuselector2.updateSKU([10156,10158]);
skuselector2.updateSKU([10156,10163]);
skuselector2.updateSKU([10157,10164]);
skuselector2.updateSKU([10158,10164]);
skuselector2.updateSKU([10159,10164]);

skuselector2.updateSKU([10156,10159,10163]);
skuselector2.updateSKU([10157,10159,10163]);

}

var start=+new Date();
for(var i=0;i<100;i++){
  test();
}
var end=+new Date();
console.log(end-start);





