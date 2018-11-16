// components/current-product/current-product.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentProduct_data:{
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
    send_choosed(e){
      console.log('sucess');
      // let choosed_name = e.detail.dataset.choosed_name;
      // let choosed = e.detail.dataset.choosed;
      // let choosed_data={
      //   choosed_name,
      //   choosed
      // }
      // this.triggerEvent('choosedEvent', choosed_data);
    }
  }
})
