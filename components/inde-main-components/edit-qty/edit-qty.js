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
    },
    now_shopping_product:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentProduct:'',
     show_add_qty:false,
     from_choose_box_hide:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    deliveryId(e){
      console.log('choose',e);
      //显示减号和数量
      this.setData({
        show_add_qty:true
      })
    
        this.triggerEvent('delivery_msg', e);
      
      this.count_currentProduct(e);
    },
    count_currentProduct(e){
          console.log('edit_qty',this.data.now_shopping_product)

        if(this.data.now_shopping_product.length===0){

          if(e.target.dataset.from){
            this.setData({
                show_add_qty:true
            })
          }else{
            this.setData({
              show_add_qty:false
            })
          } 
        }else{
          let id = e.currentTarget.dataset.imageid;
          for(var item of this.data.now_shopping_product){
            if(item.id===id){
              this.setData({
                  currentProduct:item
              })
                break;
            }
          }
        }
    }
  }
})
