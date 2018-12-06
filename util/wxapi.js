import axios from 'axios';

const baseUrl = 'http://oa.chinahuian.cn/api';
const appid = 'wx0a4d3e220354c906';

const request = async (uri) => {
  const res = await axios.get(uri);
  if(res.status !== 200) {
    console.error(`Http Code: ${response.status}`)
    return { errcode: -1, errmsg: '网络错误' };
  }
  return res.data;
}

export const fetchAuth = async (code) => {
  // TODO: 获取openid
  let uri = `${baseUrl}/fetch?code=${code}`;
  let res = await request(uri);
  if(res.errcode !== 0) return res;
  const { openid } = res;
  // TODO: 获得用户信息
  uri = `${baseUrl}/api.weixin.qq.com/cgi-bin/user/info?appid=${appid}&openid=${openid}&lang=zh_CN`;
  let res = await request(uri);
  if(res.errcode !== 0) return res;
  const { subscribe } = res;
  return { openid, subscribe };
}