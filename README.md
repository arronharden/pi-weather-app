
## Development mode
Development mode will start 2 instances of node.js - one serving out the browser UI content (port 3000), and the other serving out the Express based REST APIs (port 8080). The instance serving out the browser UI content uses a proxy configuration in `package.json` which will forward any unknown URLs requested on port 3000 to `http://localhost:8080` in order to allow the UI to function the same whether running in development or production node.

Both instances of node.js will automatically restart when a change is detected in the relevant source files.

To start in development mode using the default `app_config.json` configuration, run the command:

```
npm run start:dev
```

To start in development mode using the `app_config-mock.json` configuration, run the command:

```
npm run start:dev -- --app_config=mock
```

## Production mode
Start in production

```
npm build
npm start
```