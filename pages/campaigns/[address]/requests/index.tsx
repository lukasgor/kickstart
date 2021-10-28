import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import Link from 'next/link';
import { Table } from 'semantic-ui-react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../../../../components/Layout';
import Campaign from '../../../../ethereum/campaign';
import RequestRow, { Request } from '../../../../components/RequestRow';

interface Props {
  address: string;
  approversCount: number;
  requests: Request[];
}

const Requests: React.FC<Props> = ({ requests, address, approversCount }) => {
  const { Header, Row, HeaderCell, Body } = Table;
  const [error, setError] = React.useState<null | string>(null);
  return (
    <Layout>
      <Head>
        <title>Campaign Requests</title>
      </Head>
      <h3>Spending Requests List</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary floated='right' style={{ marginBottom: '10px' }}>
          Add Request
        </Button>
      </Link>

      {error && (
        <Message negative>
          <Message.Header>Something went wrong</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Status</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {requests.map((r, i) => (
            <RequestRow
              key={i}
              setError={setError}
              id={i}
              request={r}
              address={address}
              approversCount={approversCount}
            />
          ))}
        </Body>
      </Table>
      <div>Found {requests.length} request(s).</div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { address },
}) => {
  const campaign = Campaign(address as string);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill(0)
      .map((_, index) => {
        return campaign.methods.requests(index).call();
      }),
  );

  return {
    props: {
      requests: JSON.parse(JSON.stringify(requests)),
      address,
      approversCount: Number(approversCount),
    },
  };
};

export default Requests;
