// components/inde-main-components/choose-box/choose-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentProduct:{
      type:Object
    },
    current_choose:{
      type:String
    },
    littleIndex:{
      type:Number
    },
    shopping_product:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show_edit_qty:false,
    now_shopping_product:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCloseTap(){
      //传参给父组件
      let isChooseBox={
        isChooseBox:false
      }
      this.triggerEvent('getisDetail', isChooseBox);
    },
    //加入购物车
    on_show_edit_qty(e){
      this.setData({
        show_edit_qty:true
      })

      //调用方法，实现第一次加减
      this.selectComponent('.edit_product_qty_box').deliveryId(e);

      this.triggerEvent('delivery_msg', e);

      this.setData({
        now_shopping_product:this.data.shopping_product
      })

      this.selectComponent('.edit_product_qty_box').count_currentProduct(e);

      console.log('添加到购物袋',this.data.now_shopping_product);
    },
    judge_add_or_cut(e){
      console.log('add-----',e);
      //let e=e.detail;
      let new_e=e.detail;
      
      this.triggerEvent('delivery_msg', new_e);
      this.setData({
        now_shopping_product:this.data.shopping_product
      })

    }
  }
})
