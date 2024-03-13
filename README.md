# BFREE BACKEND DEVELOPER ASSESSMENT: Step Functions Workflow for Loan Payment Notifications

This project implements a serverless workflow for sending loan payment notifications to customers. The workflow is implemented using AWS Step Functions, AWS Lambda, and Localstack. Follow the instructions below to successfully deploy and test the project.

For detailed report, please refer to the [Report](https://docs.google.com/document/d/1NfIP-GV8-SQeW8PXNlbUWOfmbbP-esXhpUY0qx81Vrw/edit?usp=sharing).

## Prerequisites

- Node.js v14.x or later, which can be installed from [here](https://nodejs.org/en/download/)
- Serverless Framework v2.x, run `npm install -g serverless` to install it globally
- Localstack, which can be installed for your platform from [here](https://docs.localstack.cloud/getting-started/installation/)
- LocalStack AWS CLI, which can be installed by running `pip install awscli-local`

## Environment Variables

- Create a `.env` file in the root of the project and add the following environment variables for Nodemailer:
  ```bash
  SMTP_HOST=your_smtp_host # e.g. smtp.ethereal.email
  SMTP_PORT=your_smtp_port # e.g. 587
  SMTP_USER=your_smtp_server_username # e.g. your_ethereal_username
  SMTP_PASS=your_smtp_server_password # e.g. your_ethereal_password
  EMAIL_FROM=your_email_from # e.g. your_email_address
  ```

## Setting up and running Step Function

### Using NPM

- Run `npm i` to install the project dependencies
- Run `localstack start -d` to start localstack in detached mode
- Run `serverless deploy --stage local` or `npm run deploy` to deploy this stack to Localstack
- Create a new execution for the state machine using the following command:
  ```bash
  awslocal stepfunctions create-state-machine --name process-loan-step   --definition "$(cat step-definition.json)"   --role-arn arn:aws:iam::000000000000:role/step-function-lambda
  ```
- Start the execution using the following command:
  ```bash
  awslocal stepfunctions start-execution --state-machine-arn arn:aws:states:us-east-1:000000000000:stateMachine:process-loan-step --name Test-One --input file://src/datasource/input.json
  ```

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `localstack start -d` to start localstack in detached mode
- Run `serverless deploy --stage local` or `yarn deploy` to deploy this stack to Localstack
- Create a new execution for the state machine using the following command:
  ```bash
  awslocal stepfunctions create-state-machine --name process-loan-step   --definition "$(cat step-definition.json)"   --role-arn arn:aws:iam::000000000000:role/step-function-lambda
  ```
- Start the execution using the following command:

  ```bash
  awslocal stepfunctions start-execution --state-machine-arn arn:aws:states:us-east-1:000000000000:stateMachine:process-loan-step --name Test-One --input file://src/datasource/input.json
  ```

### Monitoring the Step Function

- Now you can check your localstack [dashboard](https://app.localstack.cloud/dashboard) to see the state machine execution

## Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `datasource` - containing the input data for the state machine
- `functions` - containing code base and configuration for lambda functions
- `libs` - containing shared code base between lambdas
- `notification-templates` - containing the notification template for sending email to customers
- `services` - containing the code base for the services used in the project

```
.
├── src
│   ├── datasource              # Input data for the state machine
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── repaid              # Repaid lambda
│   │   │   ├── handler.ts      # `repiad` lambda source code
│   │   │   ├── index.ts        # `repaid` lambda Serverless configuration
│   │   ├── unpaid              # Unpaid lambda
│   │   │   ├── handler.ts      # `unpaid` lambda source code
│   │   │   ├── index.ts        # `unpaid` lambda Serverless configuration
│   │   │
│   │   └── index.ts            # Export of all lambda configurations
│   │   └── schema.ts           # JSON-Schema definitions for the lambda input
│   │
│   └── libs                    # Lambda shared code and libraries
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── logger.ts           # Sharable library for logging
│   └── notification-templates  # Notification template for sending email to customers
        └── index.ts            # Export of all notification templates
│       └── template.ts         # Email template for sending email to customers
│   └── services                # Services used in the project
        └── email.service.ts    # Email service for sending email to customers
        └── index.ts            # Export of all services
        └── loan.service.ts     # Loan service for constructing loan data and communicating with the email service
│
├── package.json
├── serverless.ts               # Serverless service file
├── step-definition.json        # Step function definition
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
```
