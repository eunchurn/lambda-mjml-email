# Lambda MJML Email sender

AWS Lambda function Email delivery AWS SES

## Lambda Function

change function name in `terraform/locals.tf`

```hcl
locals {
  name          = "mjml-email"
  author        = "Eunchurn Park"
  email         = "eunchurn.park@gmail.com"
  lambda_memory = 128

  tags = {
    Name      = "Email Sender"
    GitRepo   = "https://github.com/eunchurn/lambda-mjml-email"
    ManagedBy = "Terraform"
    Owner     = "${local.email}"
  }
}
```

## Initialize

```
yarn tf:init
```

## Deployment

```
yarn deploy:all
```

## Update

```
yarn update:all
```

## API에서 직접 Trigger 함

### Usage

```typescript
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

// should sync with lambda email event type
export enum EmailSendEventType {
  resetPassword = "resetPassword",
}
export interface EmailSendEvent {
  mailType: EmailSendEventType;
  email: string;
  name: string;
  link: string;
  subject: string;
  message: string;
}

const client = new LambdaClient({ region: "ap-northeast-2" });

export function sendEmail(data: EmailSendEvent) {
  const command = new InvokeCommand({
    FunctionName: "mjml-email",
    Payload: Buffer.from(JSON.stringify(data)),
  });
  return client.send(command);
}
```
