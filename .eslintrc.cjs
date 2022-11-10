module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    '@nuxtjs'
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    indent: ['error', 2]
  },
  globals: {
    L: true
  }
}
