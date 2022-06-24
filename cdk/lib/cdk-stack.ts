import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as dotenv from 'dotenv';

dotenv.config();

const CD_ROLE = process.env.CDK_AWS_ROLE as string;
const githubAccountOwner = process.env.GITHUB_ACCOUNT as string;
const githubRepo = process.env.GITHUB_REPO as string;
const githubBranch = process.env.GITHUB_BRANCH as string;

const configBucket = process.env.SITE_CONFIG_BUCKET as string;
const folder = process.env.SITE_CONFIG_FOLDER as string;

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    console.log(`CD_ROLE:`, CD_ROLE);
    console.log(`githubAccountOwner:`, githubAccountOwner);

    const role = iam.Role.fromRoleArn(this, 'CDRole', CD_ROLE);

    const gitHubSource = codebuild.Source.gitHub({
      owner: githubAccountOwner,
      repo: githubRepo,
      fetchSubmodules: false,
      cloneDepth: 25,
      webhook: true,
      branchOrRef: githubBranch,
      webhookTriggersBatchBuild: false,
      webhookFilters: [
        codebuild.FilterGroup.inEventOf(codebuild.EventAction.PUSH).andBranchIs(
          githubBranch
        ),
        codebuild.FilterGroup.inEventOf(
          codebuild.EventAction.PULL_REQUEST_MERGED
        ).andBranchIs(githubBranch),
      ],
    });

    new codebuild.Project(this, `loyalty-rewards-dapp-${githubBranch}`, {
      source: gitHubSource,
      concurrentBuildLimit: 1,
      role,
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
        computeType: codebuild.ComputeType.LARGE
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            commands: [
              'node --version',
              'cd cdk',
              `aws s3 sync s3://${configBucket}/${folder}/cdk .`,
              'npm install',
              'npm run deploy',
              'cd ..',
              'export NODE_OPTIONS="--max-old-space-size=8192"',
              'npm install',
              'npm install -g serverless',
              `aws s3 sync s3://${configBucket}/${folder}/app .`,
              'serverless',
            ],
          },
        },
      }),
    });

    // S3 bucket and cloudfront for static assets

    const staticAssetsBucket = new s3.Bucket(this,  `loyalty-dapp-${githubBranch}`, {
      bucketName: `loyalty-rewards-dapp-${githubBranch}`,
      publicReadAccess: true,
    });

    const staticDistribution = new cloudfront.Distribution(
      this,
      "static-dist",
      {
        defaultBehavior: {
          origin: new origins.S3Origin(staticAssetsBucket),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      }
    );

    new CfnOutput(this, `loyalty-rewards-dapp-${githubBranch}-cf`, {
      value: staticDistribution.distributionDomainName,
      exportName: `loyalty-rewards-dapp-${githubBranch}-cf`,
    });
  }
}
