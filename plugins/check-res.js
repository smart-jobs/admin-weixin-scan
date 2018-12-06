import Vue from 'vue'
import _ from 'lodash'
import assert from 'assert';
const Weui = process.client ? require('we-vue') : undefined;

const Plugin = {

  install(Vue, options) {
    // 4. 添加实例方法
    Vue.prototype.$checkRes = function (res, okText, errText) {
      assert(_.isObject(res) && !_.isNull(res));
      let { okText: _okText, errText: _errText } = okText;
      if (_.isString(okText)) {
        _okText = okText;
        _errText = errText;
      }
      const { errcode = 0, errmsg } = res;
      if (errcode === 0) {
        Weui.Toast.success('操作成功');
        console.log('操作成功: ', _okText);
        return true;
      } else {
        Weui.Toast.fail(errmsg || _errText);
        return false;
      }
    }
  }

}
export default () => {
  Vue.use(Plugin)
}
