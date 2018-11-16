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
    onCloseTap(){
      //传参给父组件
      let isChooseBox={
        isChooseBox:false
      }
      this.triggerEvent('getisDetail', isChooseBox);
    }
  }
})
