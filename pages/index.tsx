import React from 'react';
import { Button, CardGroup } from 'semantic-ui-react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import Link from 'next/link';

interface Props {
  campaigns: string[];
}

const Index: React.FC<Props> = ({ campaigns }) => {
  return (
    <Layout>
      <Head>
        <title>Open Campaigns</title>
      </Head>
      <h3>Open Campaigns</h3>
      <Link href='/campaigns/new'>
        <Button
          floated='right'
          content='Create Campaign'
          icon='add circle'
          primary
        />
      </Link>
      <CardGroup
        items={campaigns.map((address) => ({
          header: address,
          description: (
            <Link href={`/campaigns/${address}`}>
              <a>View Campaign</a>
            </Link>
          ),
          fluid: true,
        }))}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return {
    props: {
      campaigns,
    },
  };
};

export default Index;
