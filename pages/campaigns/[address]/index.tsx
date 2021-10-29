import React from 'react';
import { Grid, Button, Card } from 'semantic-ui-react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import ContributeForm from '../../../components/ContributeForm';
import web3 from '../../../ethereum/web3';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';

interface Props {
  minimumContribution: number;
  balance: number;
  requestsCount: number;
  approversCount: number;
  manager: string;
  campaignAddress: string;
}

const CampaignShow = ({
  balance,
  manager,
  minimumContribution,
  requestsCount,
  approversCount,
  campaignAddress,
}: Props) => {
  return (
    <Layout>
      <Head>
        <title>Campaign Details</title>
      </Head>
      <h3>Campaign Details</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto',
                gridColumnGap: '12px',
              }}
            >
              <Card
                header={manager}
                meta='Address of manager'
                description='The manager created this campaign and can create requests to withdraw money.'
                fluid
                style={{
                  gridColumn: '1 / -1',
                }}
              />
              <Card
                fluid
                header={minimumContribution}
                meta='Minimum Contribution (wei)'
                description='You need to contribute at least this much wei to become a contributor.'
              />
              <Card
                fluid
                header={requestsCount}
                meta='Number of Requests'
                description='A request tries to withdraw money from the contract. Requests must be approved by contributors.'
              />
              <Card
                fluid
                header={approversCount}
                meta='Number of Contributors'
                description='Number of people who have already donated to this campaign.'
              />
              <Card
                fluid
                header={web3.utils.fromWei(balance, 'ether')}
                meta='Campaign Balance (ether)'
                description='How much money this campaign has left to spend.'
              />
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm campaignAddress={campaignAddress} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${campaignAddress}/requests`}>
              <Button primary>View Requests</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { address },
}) => {
  const campaign = Campaign(address as string);
  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      campaignAddress: address,
    },
  };
};

export default CampaignShow;
