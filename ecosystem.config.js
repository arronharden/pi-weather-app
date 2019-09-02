module.exports = {
  apps: [{
    name: 'pi-weather-app',
    script: 'bin/www',

    instances: 1,
    exp_backoff_restart_delay: 100,

    log_file: 'pw_app.log',
    merge_logs: true,
    time: true,

    watch: true,
    ignore_watch: ['node_modules', 'pw_app.log', '.git'],
    watch_options: {
      followSymlinks: false
    },

    env: {
      APP_CONFIG: ''
    },
    env_mock: {
      APP_CONFIG: 'mock'
    }
  }]
}
