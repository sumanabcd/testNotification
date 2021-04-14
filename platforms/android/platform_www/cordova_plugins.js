cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-firebasex.FirebasePlugin",
      "file": "plugins/cordova-plugin-firebasex/www/firebase.js",
      "pluginId": "cordova-plugin-firebasex",
      "clobbers": [
        "FirebasePlugin"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-firebasex": "12.1.0",
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-androidx-adapter": "1.1.3",
    "cordova-plugin-console": "1.1.0"
  };
});