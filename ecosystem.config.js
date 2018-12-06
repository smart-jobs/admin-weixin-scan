const app = 'smart-admin-weixin';
module.exports = {
  apps: [{
    "name": app,  // 应用名称
    "script": "./server/index.js",  // 实际启动脚本
    "out": `./logs/${app}.log`,
    "error": `./logs/${app}.err`,
    "watch": [  // 监控变化的目录，一旦变化，自动重启
      "dist"
    ],
    "env": {
      "NODE_ENV": "production",  // 环境参数，当前指定为生产环境
      "PORT": 3300,
    }
  }]
}