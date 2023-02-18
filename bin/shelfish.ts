#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { ShelfishStack } from "../lib/shelfish-stack";

const app = new cdk.App();
new ShelfishStack(app, "ShelfishStack", {
  domainName: "shelfi.sh",
  siteSubDomain: "www",
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
