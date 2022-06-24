#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import { CdkStack } from '../lib/cdk-stack';

dotenv.config();

const appEnv = process.env.CDK_ENVIRONMENT || 'dev';

const app = new cdk.App();
new CdkStack(app, `loyalty-rewards-dapp-${appEnv}`, {
  env: { region: 'us-east-1' },
});
