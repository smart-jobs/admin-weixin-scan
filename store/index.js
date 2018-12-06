import Vue from 'vue';
import _ from 'lodash';
import * as types from './mutation-types';
const { BusinessError, ErrorCode } = require('naf-core').Error;

const wxapi = {
  baseUrl: 'http://oa.chinahuian.cn',
  appid: 'wx0a4d3e220354c906',
};

export const state = () => ({
  openid: null,
  subscribe: 0,
  userinfo: null,
})

// actions
export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, app, error, redirect }) {
    // console.debug('call nuxtServerInit...');

    if (req.session && req.session.auth) {
      const { timestamp, subscribe } = req.session.auth;
      if(subscribe === 1 || (_.isNumber(timestamp) && new Date().getTime() - timestamp < 30000)) {
        console.debug('set auth info from session: ', req.session.auth);
        commit(types.AUTH_SUCCESS, req.session.auth);
        return;
      }
      req.session.auth = null;
    }
    const { code } = req.query;
    if (!code) {
      // TODO: 重定向到授权页面
      const host = (req.app.get('trust proxy') && req.header('X-Forwarded-Host')) || req.header('Host');
      const originalUrl = encodeURIComponent(`${req.protocol}://${host}${req.originalUrl}`);
      const redirect_uri = `${wxapi.baseUrl}/api/auth?appid=${wxapi.appid}&response_type=code&redirect_uri=${originalUrl}#wechat`;
      console.debug('redirect to auth for ', req.originalUrl);
      redirect(redirect_uri);
      return;
    }

    // TODO: 获取用户信息，保存在session中
    const res = await dispatch('fetchAuth', { code });
    if (res.errcode === 0) {
      console.debug('save auth info to session: ', res);
      req.session.auth = { ...res, timestamp: new Date().getTime()};
    } else {
      error(res.errmsg);
    }
  },

  async fetchAuth({ commit/* , state */ }, { code }) {
    try {
      console.debug('fetch auth info by code: ', code);
      // TODO: 获取openid
      let uri = `${wxapi.baseUrl}/api/fetch?code=${code}`;
      let res = await this.$axios.$get(uri);
      // console.debug('res: ', res);
      if (res.errcode && res.errcode !== 0) return res;
      const { openid } = res;
      // TODO: 获得用户信息
      uri = `${wxapi.baseUrl}/api.weixin.qq.com/cgi-bin/user/info?appid=${wxapi.appid}&openid=${openid}&lang=zh_CN`;
      res = await this.$axios.$get(uri);
      // console.debug('res: ', res);
      if (res.errcode && res.errcode !== 0) return res;
      const { subscribe } = res;
      commit(types.AUTH_SUCCESS, { openid, subscribe });
      return { errcode: 0, errmsg: 'ok', openid, subscribe };
    } catch (err) {
      return { errcode: -1, errmsg: '处理错误' };
    }
  },

  async checkQrcode({ commit, state }, { qrcode }) {
    console.debug('checkQrcode: ', qrcode);
    let res = await this.$axios.$post('/check', { qrcode });
    // console.debug('res: ', res);
    if (res.errcode === 0 && res.status !== 'pending') {
      console.error('二维码状态无效：', res.status);
      return { errcode: -1, errmsg: '二维码状态无效' };
    }
    return res;
  },

  async fetchUser({ commit, state }) {
    // TODO: 获取openid
    const { openid } = state;
    console.debug('fetchUser: ', openid);
    let res = await this.$axios.$get(`/fetch?openid=${openid}`);
    // console.debug('res: ', res);
    if (res.errcode === 0) {
      commit(types.BIND_USER, res.userinfo);
    }
    return res;
  },

  async bind({ commit, state }, { qrcode, username, password }) {
    // TODO: 获取openid
    const { openid } = state;
    const res = await this.$axios.$post('/bind', { openid, qrcode, username, password });
    if (res.errcode === 0) {
      commit(types.BIND_SUCCESS);
    }
    return res;
  },

  async login({ commit, state }, { qrcode }) {
    // TODO: 获取openid
    const { openid } = state;
    const res = await this.$axios.$post('/login', { openid, qrcode });
    if (res.errcode === 0) {
      commit(types.LOGIN_SUCCESS);
    }
    return res;
  },
};

export const mutations = {
  [types.AUTH_SUCCESS](state, { openid, subscribe }) {
    state.openid = openid;
    state.subscribe = subscribe;
  },
  [types.BIND_USER](state, payload) {
    state.userinfo = payload;
  },
  [types.BIND_SUCCESS](state, payload) {
    this.$router.push('/bind-success');
  },
  [types.LOGIN_SUCCESS](state, payload) {
    this.$router.push('/login-success');
  },
}

export const getters = {
  openid: state => state.openid,
  subscribe: state => state.subscribe,
}