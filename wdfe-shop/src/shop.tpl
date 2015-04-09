<meta content-type="text/smarty" required/>
<h1>abc</h1>

<div data-role="shop-wrapper" class="shop-wrapper">
  <h3>{=$shopinfo.shopname=}</h3>
  <div>
    <ul class="goods-list">
      {=foreach $goods as $key=>$item=}
      <li class="goods-item" data-role="goods" data-goodsid="{=$item.id=}">{=$item.name=}</li>
      {=/foreach=}
    </ul>
  </div>
</div>
