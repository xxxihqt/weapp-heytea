进入页面图片接口https://go.cdn.heytea.com/storage/2018/10/23/yaTa0vp6p2tt3xslWjzwSoXbae2Mp9I00lPGGS3V.gif



 <!-- <view class="detailBox" wx:if="{{isDetail}}">
    <view class="closeBox" >
      <text class="close"  bindtap="onCloseTap">X</text>
    </view>
    <view class="msgBox">
      <view class="current_img_box">
        <image src="{{currentProduct.images.data.url}}" class="current_img"></image>        
      </view>
      <view class="current_text_box">
        <text class="current_name product_name">{{currentProduct.name}}</text>
        <text class="current_desc product_desc">{{currentProduct.description}}</text>
        <text class="current_price product_price">￥{{currentProduct.skus.data[0].price}}</text>
        <view>
          <text class="choose choose_two" catchtap='choose'>选规格</text>          
        </view>
      </view>
    </view>
  </view> -->




  <!-- <view class="chooseBox"  wx:if="{{isChooseBox}}">
    <view class="title_box">
      <text class="current_title">{{currentProduct.name}}</text>
      <text class="choose_close"  bindtap="onCloseTap">X</text>    
    </view>
    <scroll-view class="classify_box" scroll-y="true">
      <current-product wx:if="{{currentProduct.specifications.data[0]}}"currentProduct_data="{{currentProduct.specifications.data[0]}}" id="currentProduct_specifications" class="currentProduct_section_group"></current-product>
      <current-product currentProduct_data="{{currentProduct.material_groups[0]}}" id="currentProduct_material_groups"  class="currentProduct_section_group"></current-product>
      <current-product wx:for="{{currentProduct.attributes.data}}" wx:key="item.id" currentProduct_data="{{item}}" id="currentProduct_attributes{{item.name}}"  class="currentProduct_section_group"></current-product>
    </scroll-view>    
    <view class="add_to_car_box">
      <view class="car_text_box">
        <text class="current_price">￥{{currentProduct.skus.data[0].price}}</text>
        <view class="choose_section">
          <text class="current_choose_item">{{current_choose}}</text>
        </view>
      </view>
      <view class="car_go_box">
        <text class="add_to_car">加入购物袋</text>        
      </view>
    </view>
  </view> -->





        <!-- <view class="edit_product_qty_box">
              <text class=" choose current_cut" wx-if="{{show_add_qty}}.indexOf({{inner_item.id}})" catchtap="cut_qty">-</text>
              <text class="current_qty" wx-if="{{show_add_qty}}">{{inner_item.id===currentProduct.id?currentProduct.qty:''}}</text>
              <text class=" choose current_add" wx:if="{{inner_item.material_groups.length===0 && inner_item.attributes.data.length===0 && inner_item.specifications.data.length===0 }}" catchtap='add_qty' data-list="current{{littleIndex}}" data-imageid="{{inner_item.id}}">+</text>                          
              <text class="choose"  wx:else catchtap='choose' data-list="current{{littleIndex}}" data-imageid="{{inner_item.id}}">选规格</text>    
            </view> -->