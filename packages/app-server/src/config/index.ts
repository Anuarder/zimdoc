import dotenv from 'dotenv';
import path from 'path';
import convict from 'convict';
import { schema } from './schema';

dotenv.config({
  path: path.join(process.cwd(), 'server', '.env'),
});

const config = convict(schema);

config.validate({ allowed: 'strict' });

const IS_DEV = config.get('env') === 'development';
const IS_PROD = config.get('env') === 'production';

if (IS_DEV) {
  global.console.info(config.getProperties(), '\n');
}

export { config, IS_DEV, IS_PROD };
