// components/indexmain/index-mian.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuData: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    contentActive: '',
    navActive:0,
    currentHeightArr:[],
    isCurrentProduct:false,
    currentProduct:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseTap(e){
      let current_id = e.currentTarget.dataset.current_id;
      let id = e.currentTarget.dataset.index;
      this.setData({
        contentActive: current_id,
        navActive:id,
      })
      console.log(this.data)
    },
    getScrollHeight(){
      console.log(666);
      var self = this;
      let heightArr = [];
      let currentHeight = 0;
      let currentHeightArr=[];
      const query = wx.createSelectorQuery().in(this);
      query.selectAll('.product-list').boundingClientRect(function (rects) {
        rects.forEach(item => {
          heightArr.push(item.height);
        })
        for (let i = 0; i < heightArr.length; i++) {
          currentHeight += heightArr[i];
          currentHeightArr.push(currentHeight);
        }
        self.setData({
          currentHeightArr: currentHeightArr
        })
      }).exec();
    },
    handleScroll(e){
      console.log(e);
      console.log('before',this.data.navActive);
      let scrolltop = e.detail.scrollTop;
      for (let i = 0; i < this.data.currentHeightArr.length;i++){
        if (scrolltop > this.data.currentHeightArr[i] && scrolltop < this.data.currentHeightArr[i+1]){
          console.log(i);
          this.setData({
            navActive: i+1
          })
        }
      }
      console.log(this.data.currentHeightArr);
    },
    onImageTap(e){
      console.log(e);
      let current_product_list_id = e.currentTarget.dataset.list;      
      let current_product_image_id=e.currentTarget.dataset.imageid;
      current_product_list_id = current_product_list_id.slice(7)*1;
      console.log(current_product_image_id);
      this.setData({
        isCurrentProduct:true
      })
      for (let item of this.properties.menuData.data[current_product_list_id].products.data){
        if (item.id == current_product_image_id){
          console.log(item);          
          this.setData({
            currentProduct: item
          })
          break;
        }
      }
      console.log(this.data);
    },
    onCloseTap(){
      this.setData({
        isCurrentProduct: false
      })
    }
  }
})
