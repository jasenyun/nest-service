import * as yaml from 'yaml';
import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';

let configFilePassedInCmd = null;
const argv = require('minimist')(process.argv.slice(2));
if (argv?.c) {
  configFilePassedInCmd = argv.c;
}

// 解析配置文件
let rawConfigs = [];
if (process.env.AUTHING_CONFIG_FILE) {
  rawConfigs = [path.resolve(process.env.AUTHING_CONFIG_FILE)];
} else if (configFilePassedInCmd) {
  rawConfigs = [path.resolve(configFilePassedInCmd)];
} else {
  rawConfigs = [
    path.resolve('./config/config.yaml'),
    path.resolve('./config.yaml'),
  ];
}

rawConfigs = rawConfigs
  .filter(Boolean)
  .filter(fs.existsSync)
  .map((file) => fs.readFileSync(file, 'utf-8'))
  .map((content) => yaml.parse(content));

if (rawConfigs.length === 0) {
  throw new Error('缺少配置文件：config.yaml');
}

const config = [...rawConfigs].reduce((prev, curr) => {
  return _.merge(prev, curr);
});

export const env = (key: string, defaultValue?: any) => {
  const envKey = key
    .split('.')
    .map((x) => x.toUpperCase())
    .join('_');
  return process.env[envKey] || _.get(config, key, defaultValue);
};
