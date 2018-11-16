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
    currentHeightArr: [610, 920, 1230, 1740, 2250, 2560, 2970, 3780, 3890, 4800, 5410],
    isCurrentProduct:false,
    isDetail:false,
    currentProduct:'',
    isChooseBox:false,
    current_choose:[],
    isChoose:0,
    show_add_qty:false,
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
      //console.log(e);
     // console.log('before',this.data.navActive);
      let scrolltop = e.detail.scrollTop;
      //console.log('scrolltop', scrolltop);
      for (let i = 0;i < this.data.currentHeightArr.length;i++) {
        if (i < this.data.currentHeightArr.length - 1){
          const j =i;
          if (scrolltop >= this.data.currentHeightArr[j] && scrolltop <= this.data.currentHeightArr[j + 1]){
            //console.log(j)
              
              this.setData({
                navActive: j
              })
              break;
          }
        }else if(i===0){
          if (scrolltop <= this.data.currentHeightArr[0]){
            this.setData({
              navActive: 0
            })
          }
        }
        else{
          this.setData({
            navActive: this.data.currentHeightArr.length - 1
          })
        }
      }
    },
    onImageTap(e){
      this.setData({
        isCurrentProduct:true,
        isDetail:true
      })
      this.getcurrentProduct(e);
      console.log(this.data);
    },
    onCloseTap(){
      this.setData({
        isCurrentProduct: false,
        currentProduct: '',
        isDetail:false,
        isChooseBox: false        
      })
    },
    choose(e){
      this.setData({
        isCurrentProduct: true,
        isDetail: false,
        isChooseBox:true
      })
      console.log('choose',e);
      if (e.currentTarget.dataset.list){
        this.getcurrentProduct(e);                          
        }else{
        console.log('false', this.data.currentProduct.material_groups.length)
        }
    },
    getcurrentProduct(e){
      let current_product_list_id = e.currentTarget.dataset.list;
      let current_product_image_id = e.currentTarget.dataset.imageid;
      current_product_list_id = current_product_list_id.slice(7) * 1;
      console.log(current_product_image_id);
      for (let item of this.properties.menuData.data[current_product_list_id].products.data) {
        if (item.id == current_product_image_id) {
          this.init_currentProduct(item);
          console.log(item);
          
          this.setData({
            currentProduct: item
          })
          break;
        }
      }
    },
    init_currentProduct(item){
      let current_choose=[];
      if (item.specifications.data[0]){
        item.specifications.data[0].values.data.forEach(ele => {
          ele.isChoosed = false;
        })
        item.specifications.data[0].values.data[0].isChoosed = true;
        current_choose.push(item.specifications.data[0].values.data[0].name);
      }
      
      if (item.material_groups[0]){
        item.material_groups[0].materials.forEach(ele => {
          ele.isChoosed = false;
        })
      }
      if (item.attributes.data){
        item.attributes.data.forEach(ele => {
          ele.values.data.forEach(little_ele => {
            little_ele.isChoosed = false;
          })
          ele.values.data[0].isChoosed = true;
          current_choose.push(ele.values.data[0].name);
        })
      }
      current_choose=current_choose.join(',');
      this.setData({
        current_choose: current_choose
      })
      console.log(current_choose);
    },
    onGetChoosed(e){
      console.log(e)
      // this.setData({
      //   code: e.detail.val
      // })
    },
    add_qty(e){
      let qty=0;
      ++qty;
      this.setData({
        show_add_qty: true
      })
      if (e.currentTarget.dataset.list) {
        this.getcurrentProduct(e);
        if (this.data.currentProduct.qty) {
         qty += this.data.currentProduct.qty;
        }
        let new_current_product = this.data.currentProduct;        
        new_current_product.qty = qty;
        new_current_product.isEdit = true ;
        this.setData({
          currentProduct: new_current_product
        })
        console.log(this.data.currentProduct.qty);
      } else {
        console.log('false',e)
      }
    }
  }
})
