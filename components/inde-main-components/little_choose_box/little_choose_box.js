// components/inde-main-components/little_choose_box/little_choose_box.js
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
     choose(e){
      this.triggerEvent('delivery_choose', e);
    },
  }
})
