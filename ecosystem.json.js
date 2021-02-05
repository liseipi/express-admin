module.exports = {
  apps: [
    {
      name: 'express-api',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'npm',
      // autoRefresh: true,
      // watch: true,
      args: 'start'
    }
  ]
}
