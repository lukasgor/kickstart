import React from 'react';
import { Form, Button, Message, Input, TextArea } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../../components/Layout';
import web3 from '../../../../ethereum/web3';
import getCampaign from '../../../../ethereum/campaign';

const NewRequest: React.FC = () => {
  const {
    query: { address },
    push,
  } = useRouter();
  const [description, setDescription] = React.useState('');
  const [etherAmount, setEtherAmount] = React.useState('');
  const [recipient, setRecipient] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      const campaign = getCampaign(address as string);
      setLoading(true);
      setError(null);
      try {
        const accounts = await web3.eth.getAccounts();
        await campaign.methods
          .createRequest(
            description,
            web3.utils.toWei(etherAmount, 'ether'),
            recipient,
          )
          .send({
            from: accounts[0],
          });
        push(`/campaigns/${address}/requests`);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [address, description, etherAmount, push, recipient],
  );

  return (
    <Layout>
      <Link href={`/campaigns/${address}`}>Back</Link>

      <Form error={Boolean(error)} onSubmit={onSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h3>New Request</h3>
          <Form.Field>
            <label htmlFor='description'>Description</label>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id='description'
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='ether-amount'>Amount needed in Ether</label>
            <Input
              value={etherAmount}
              onChange={(e) => setEtherAmount(e.target.value)}
              id='ether-amount'
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='recipient'>Recipient Address</label>
            <Input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              id='recipient'
            />
          </Form.Field>
          <Button loading={loading} primary>
            Create!
          </Button>
        </div>
        <Message error header='Oops!' content={error} />
      </Form>
    </Layout>
  );
};

export default NewRequest;
