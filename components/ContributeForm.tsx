import React from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

type Props = {
  campaignAddress: string;
};

const ContributeForm: React.FC<Props> = ({ campaignAddress }) => {
  const [contributeAmount, setContributeAmount] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const { replace } = useRouter();

  const onSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      const campaign = Campaign(campaignAddress);

      try {
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.contribute().send({
          from: accounts[0],
          value: web3.utils.toWei(contributeAmount, 'ether'),
        });
        setSuccess(true);
        setContributeAmount('');
        replace(`/campaigns/${campaignAddress}`);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [campaignAddress, setLoading, contributeAmount, replace],
  );

  return (
    <Form error={Boolean(error)} success={success} onSubmit={onSubmit}>
      <Form.Field>
        <h3>Become a contributor!</h3>
        <label htmlFor='contribute-amount'>Amount to contribute</label>
        <Input
          label='ether'
          id='contribute-amount'
          labelPosition='right'
          value={contributeAmount}
          onChange={(e) => {
            setContributeAmount(e.target.value);
          }}
        />
      </Form.Field>
      <Button disabled={!Boolean(contributeAmount)} loading={loading}>
        Contribute!
      </Button>
      <Message error header='Oops!' content={error} />
      <Message
        success
        header='Success'
        content='Your contribution has been recorded!'
      />
    </Form>
  );
};

export default ContributeForm;
