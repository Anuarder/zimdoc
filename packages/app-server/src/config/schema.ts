const schema = {
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    format: 'Number',
    default: 8000,
    env: 'PORT',
  },
  app_host: {
    format: 'String',
    default: '0.0.0.0',
    env: 'APP_HOST',
  },
  deploy_env: {
    format: ['production', 'staging', 'development'],
    default: 'development',
    env: 'DEPLOY_ENV',
  },
  server_api_prefix: {
    doc: 'Prefix for api routes',
    format: 'String',
    env: 'SERVER_API_PREFIX',
    default: '/',
  },
  server_static_prefix: {
    doc: 'Prefix for static files',
    format: 'String',
    env: 'SERVER_STATIC_PREFIX',
    default: '/static',
  },
};

export { schema };
