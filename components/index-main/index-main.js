// components/indexmain/index-mian.js [0,610, 920, 1230, 1740, 2250, 2560, 2970, 3780, 3890, 4800, 5410]
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
    currentHeightArr: [0],
    isCurrentProduct:false,
    isDetail:false,
    currentProduct:'',
    isChooseBox:false,
    current_choose:[],
    isChoose:0,
    shopping_product:[],
    shopping_product_lenght:0,
    totalPrice:0,
    show_edit_shopping_car:false,
    top_list_height:0,
    bottom_list_height:0
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
    },
    scrolltoupper(){
      console.log(333);
    },
    scrolltolower(){
      console.log('0000');
    },
    getScrollHeight(){
      var self = this;
      let heightArr = [];
      let currentHeight = 0;
      let currentHeightArr=[0];
      let top_list_height=0;
      let bottom_list_height=0;
      const query = wx.createSelectorQuery().in(this);
      query.selectAll('.product-list').boundingClientRect(function (rects) {
        rects.forEach(item => {
          heightArr.push(item.height);
        })

        for (let i = 0; i < heightArr.length; i++) {
          if(i===0){
            top_list_height=heightArr[0]
          }
          if(i===heightArr.length-1){
            bottom_list_height=heightArr.length-1;
          }
          currentHeight += heightArr[i];
          currentHeightArr.push(currentHeight);
        }
        console.log(top_list_height,bottom_list_height);
        self.setData({
          currentHeightArr: currentHeightArr,
          top_list_height:top_list_height,
          bottom_list_height:bottom_list_height
        })
      }).exec();
    },
    onScroll(e){
      let scrolltop = e.detail.scrollTop;
      let currentHeightArr=this.data.currentHeightArr;
      currentHeightArr.forEach((item,idx)=>{
        if(scrolltop+80 >= currentHeightArr[idx] && scrolltop+80 < currentHeightArr[idx+1]){
          console.log(idx);
          this.setData({
            navActive:idx
          })
        }
      })
    },
    onImageTap(e){
      this.setData({
        isCurrentProduct:true,
        isDetail:true
      })
      this.getcurrentProduct(e);
    },
    getcurrentProduct(e){
      console.log('onImageTap',e);
      let current_product_list_id = e.currentTarget.dataset.list?e.currentTarget.dataset.list:e.detail.target.dataset.list;

      let current_product_image_id = e.currentTarget.dataset.imageid?e.currentTarget.dataset.imageid:e.detail.target.dataset.imageid;
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
    judge_add_or_cut(msg){
      console.log('judge_add_or_cut',msg)
      if(msg.detail.target.id==='add'){
        console.log('来自choose-box',msg);
        this.add_qty(msg);
      }else{
        this.cut_qty(msg);
      }
      //console.log(msg);
    },
    add_qty(e){
      console.log('add_qty',e);
      let qty=0;
      ++qty;
      if (e.detail.target.dataset.list) {
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
        this.get_shopping_list();
        //console.log(this.data.currentProduct.qty);
      } else {
      }
    },
    cut_qty(e){
      let cut_current_qty=this.data.currentProduct;
      if(this.data.currentProduct===''){
        //隐藏加减窗口
      }else{
        --cut_current_qty.qty;
        if(cut_current_qty.qty<=0){
          cut_current_qty.qty=0;
          this.setData({
            currentProduct:cut_current_qty
          })

          this.get_shopping_list();
        }else{
          this.setData({
            currentProduct:cut_current_qty
          })
          this.get_shopping_list();
        }
      }
    },
    //添加到购物车
    get_shopping_list(){
      let new_shopping_list=this.data.shopping_product;
      if(new_shopping_list.length>0){
       //去重
        new_shopping_list=new_shopping_list.filter((element, index, self)=>{
            return element.id != this.data.currentProduct.id;
        });

        //剔除数量小于1的商品
        new_shopping_list=new_shopping_list.filter((element, index, self)=>{
            return element.qty>0;
        });

          if(this.data.currentProduct.qty<=0){

          }else{
            new_shopping_list.push(this.data.currentProduct);
          }

      }else{
        new_shopping_list.push(this.data.currentProduct)
      }

      let shopping_product_lenght=new_shopping_list.length;
      this.setData({
        shopping_product:new_shopping_list,
        shopping_product_lenght:shopping_product_lenght
      })

      this.count_totalPrice();
      console.log('shopping_product',this.data.shopping_product)
    },
    count_totalPrice(){
      let totalPrice=0;
      this.data.shopping_product.forEach(item=>{
        totalPrice+=item.qty*item.skus.data[0].price;
      })

      this.setData({
        totalPrice:totalPrice
      })
    },
    onCloseTap(){
      this.setData({
        isCurrentProduct: false,
        currentProduct: '',
        isDetail:false,
        isChooseBox: false        
      })
    },
    onGetisDetail(e){
      if(e.detail.isDetail===false){
        this.setData({
          isDetail:e.detail.isDetail,
          currentProduct: '',
          isCurrentProduct: false
        })
      }
      if(e.detail.isChooseBox===false){
        this.setData({
          isChooseBox:e.detail.isChooseBox,
          currentProduct: '',
          isCurrentProduct: false
        })
      }
    },
    onGetisChooseBox(e){
      console.log('onGetisChooseBox',e)
      if(e.detail.target!=undefined){
        console.log('有')
         this.getcurrentProduct(e);
         this.setData({
          isCurrentProduct: true,
          isChooseBox: true
        })
      }else{
        console.log('无')

        this.setData({
          isCurrentProduct: true,
          isDetail:e.detail.isDetail,
          isChooseBox: e.detail.isChooseBox
        })
      }
    },
    onShow_edit_shopping_car(e){
      this.setData({
        show_edit_shopping_car:e.detail.istap,
          isCurrentProduct: e.detail.istap
      })
    }
  }
})
