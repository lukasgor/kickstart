import React from 'react';
import { Form, Button, Input, Message, Container } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });
      router.push('/');
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <Form onSubmit={onSubmit} error={Boolean(errorMessage)}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40px',
          }}
        >
          <Form.Field>
            <h3 style={{ textAlign: 'center' }}>Create a Campaign</h3>
            <label>Minimum value required to become a contributor</label>
            <Input
              value={minimumContribution}
              onChange={(e) => setMinimumContribution(e.target.value)}
              label='wei'
              labelPosition='right'
            />
          </Form.Field>
          <Button loading={loading} primary>
            Create!
          </Button>
        </div>
        <Message error header='Oops!' content={errorMessage} />
      </Form>
    </Layout>
  );
};

export default CampaignNew;
