module.exports = {
  apps: [
    {
      name: 'probation-frontend',
      exec_mode: 'cluster',
      instances: 1,
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}