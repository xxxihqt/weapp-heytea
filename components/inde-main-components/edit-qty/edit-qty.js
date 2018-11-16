// components/edit-qty/edit-qty.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    edit_data:{
      type:Object
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
    currentProduct:'',
     show_add_qty:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    deliveryId(e){
      //显示减号和数量
      this.setData({
        show_add_qty:true
      })
      this.triggerEvent('delivery_mag', e);
      console.log(e);
      this.count_currentProduct(e);
    },
    count_currentProduct(e){
        //console.log('count_currentProduct',e)
      for(var item of this.data.shopping_product){
        if(item.id===e.currentTarget.dataset.imageid){
          this.setData({
            currentProduct:item
          })
          break;
        }
      }
    }
  }
})
