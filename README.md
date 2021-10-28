# Kickstart

## Getting started

Kickstart is a kickstarter-like application but build on Ethereum. 
It enables you to create campaigns and gather contributors, but unlike a real kick-starter the money(eth) is stored on a smart contract and you need to get at least 50% contributors approvals for any spending (so campaign manager is not able to just run away with money). 
You need to have a [metamask](https://metamask.io/) installed in order to interact with the app.
Test version running on ropsten network: https://kickstart-kappa.vercel.app/

### Installation & running locally

Install all dependencies:

```sh
yarn install
```

Run the app locally:

```sh
yarn dev
```

By default app is connected to Ropsten test network, if you want to run the app in production environment, check the deployment section.

## Contributing

### Creating a PR

All code should be submitted through PRs and approved by at least one code owner. Code owners are
listed in the [CODEOWNERS](.github/CODEOWNERS) file. When creating a PR, follow the PR template and
provide whatever information is required for people to understand the why, what and how of your
changes.

### Testing

When adding changes, make sure to cover them with sufficient tests. It is up to you to determine
what needs to be tested or not, but try to make sure to always cover the different use cases of
whatever you're testing.

We use [jest](https://jestjs.io) for testing. Test suites can
be started by any of the following commands in the project directory:

```sh
# test all changed files
yarn test

# test and watch for file changes
yarn test --watch
```

### Conventional commits

We use [conventional commits](https://www.conventionalcommits.org) to keep our commits readable, but
also to automatically handle our release flow and generate changelogs in the future.

## Deployment

If you want to deploy the contracts to other networks, create a `.env` file based on `.env.example` in the root of the project. Next you need to fill `DEPLOY_ACC_MNEMONIC` and `RPC_URL` and run `yarn compile:contracts && yarn deploy:contracts`. After that copy the campaign factory address outputted after deployment and paste it to `FACTORY_ADDRESS` in `.env` file. 


### Pushing to a branch

The following happens when a commit is pushed to a branch other than master:

1.  Dependencies are installed.
1.  Linter is run.
1.  All tests are run.

### Pushing/merging to master

App is automatically deployed to: https://kickstart-kappa.vercel.app/ 
