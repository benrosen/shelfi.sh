import * as cdk from "aws-cdk-lib";
import { CfnOutput, Duration, RemovalPolicy } from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  AllowedMethods,
  Distribution,
  OriginAccessIdentity,
  SecurityPolicyProtocol,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { CanonicalUserPrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class ShelfishStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: cdk.StackProps & { domainName: string; siteSubDomain: string }
  ) {
    super(scope, id, props);

    const zone = HostedZone.fromLookup(this, `${id}-zone`, {
      domainName: props.domainName,
    });

    const siteDomain = props.siteSubDomain + "." + props.domainName;

    const cloudfrontOAI = new OriginAccessIdentity(
      this,
      "${id}-cloudfront-oai",
      {
        comment: `OAI for ${id}`,
      }
    );

    new CfnOutput(this, "Site", { value: "https://" + siteDomain });

    const siteBucket = new Bucket(this, "SiteBucket", {
      bucketName: siteDomain,
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    siteBucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [siteBucket.arnForObjects("*")],
        principals: [
          new CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    new CfnOutput(this, "Bucket", { value: siteBucket.bucketName });

    const certificate = new Certificate(this, `${id}-certificate`, {
      domainName: siteDomain,
    });

    new CfnOutput(this, "Certificate", { value: certificate.certificateArn });

    const distribution = new Distribution(this, `${id}-distribution`, {
      certificate: certificate,
      defaultRootObject: "index.html",
      domainNames: [siteDomain],
      minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: "/error.html",
          ttl: Duration.minutes(30),
        },
      ],
      defaultBehavior: {
        origin: new S3Origin(siteBucket, {
          originAccessIdentity: cloudfrontOAI,
        }),
        compress: true,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });

    new CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
    });

    new ARecord(this, `${id}-a-record`, {
      recordName: siteDomain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone,
    });

    new BucketDeployment(this, `${id}-bucket-deployment`, {
      sources: [Source.asset("./client/build")],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    // for individual users, composite index size is probably small enough to just send in its entirety
    // searching can be done on the client's machine with an autocomplete component
    // users that want a composite index larger than what can be searched client-side can pay
  }
}
