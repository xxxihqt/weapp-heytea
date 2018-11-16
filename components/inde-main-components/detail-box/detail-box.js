// components/inde-main-components/detail-box/detail-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentProduct:{
      type:Object
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
      let isDetail={
        isDetail:false
      }
      this.triggerEvent('getisDetail', isDetail);
    },
    choose(){
      // this.setData({
      //   isCurrentProduct: true,
      //   isDetail: false,
      //   isChooseBox:true
      // })
      
      let isChooseBox={
        isDetail: false,
        isChooseBox:true
      }

      this.triggerEvent('getisChooseBox', isChooseBox);
      // if (e.currentTarget.dataset.list){
      //     this.getcurrentProduct(e);                          
      //   }else{
      //     console.log('false', this.data.currentProduct.material_groups.length)
      // }
    }
  }
})
