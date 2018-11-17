// components/inde-main-components/shopping-car/shopping-car.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopping_product:{
      type:Array
    },
    shopping_product_lenght:{
      type:Number
    },
    totalPrice:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    istap:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show_edit_shopping_car(){

      let _istap=this.data.istap;

      let istap={
        istap:_istap
      }
      this.triggerEvent('show_edit_shopping_car', istap) 
      this.setData({
        istap:!this.data.istap
      })
      console.log(istap.istap);
    }
  }
})
