const { Router } = require('express')
const axios = require('axios');
const _ = require('lodash');

const request = async (req, action, data) => {
  try{
    const tenant = req.header('x-tenant');
    const { api: {baseUrl }} = req.app.get('config');
    const url = `${baseUrl}/weixin/${action}`;
    const res = await axios({
      method: _.isUndefined(data) ? 'get' : 'post',
      url,
      data,
      responseType: 'json',
      headers: { 'X-Tenant': tenant ||'master' }
    });
    if(res.status !== 200) {
      return { errcode: -1, errmsg: `Http Code: ${res.status}` };
    }
    return res.data;
  }catch(err){
    console.error(`接口请求失败: ${err.config.url} - ${ err.message }`);
    if(err.response && err.response.data) {
      console.debug(err.response.data);
    }
    return { errcode: -1, errmsg: '接口请求失败' };
  }
}

const router = Router()

router.get('/demo', async function (req, res) {
  // console.log('this: ', this);
  const tenant = req.header('x-tenant');
  const url = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN';
  const ret = await axios.get(url);
  res.json(ret.data);
})

/* 微信登录 */
router.post('/login', async function (req, res) {
  const ret = await request(req, 'login', req.body);
  res.json(ret);
})

/* 绑定微信号 */
router.post('/bind', async function (req, res) {
  const ret = await request(req, 'bind', req.body);
  res.json(ret);
})

/* 检查二维码状态 */
router.post('/check', async function (req, res) {
  const ret = await request(req, 'check', req.body);
  res.json(ret);
})

/* 获取微信绑定用户 */
router.get('/fetch', async function (req, res) {
  const { openid } = req.query;
  const ret = await request(req, `fetch?openid=${openid}`);
  res.json(ret);
})

module.exports = router
