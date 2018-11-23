//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    this.getdata();
  },
  getdata(){
    let getMusicRankings = new Promise((resolve, reject) => {
      wx.request({
        url: 'https://api.apiopen.top/musicRankings',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res);
        }
      })
    })
    let getNews = new Promise((resolve, reject) => {
      wx.request({
        url: 'https://www.apiopen.top/journalismApi',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res);
        }
      })
    })
    let getDailyVideo = new Promise((resolve, reject) => {
      wx.request({
        url: 'https://api.apiopen.top/todayVideo',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res);
        }
      })
    })
    Promise.all([getMusicRankings, getDailyVideo, getNews])
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
})
