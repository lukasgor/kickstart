import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { useRouter } from 'next/router';

export interface Request {
  approvalCount: string;
  complete: boolean;
  description: string;
  recipient: string;
  value: string;
}

interface Props {
  request: Request;
  address: string;
  approversCount: number;
  id: number;
  setError: (a: string | null) => void;
}

const RequestRow: React.FC<Props> = ({
  request,
  id,
  approversCount,
  address,
  setError,
}) => {
  const { Row, Cell } = Table;
  const [approveLoading, setApproveLoading] = React.useState(false);
  const [finalizeLoading, setFinalizeLoading] = React.useState(false);
  const { replace } = useRouter();

  const onApprove = React.useCallback(async () => {
    const campaign = Campaign(address);
    setApproveLoading(true);
    setError(null);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });
      replace(`/campaigns/${address}/requests`);
    } catch (e) {
      setError(e.message);
    } finally {
      setApproveLoading(false);
    }
  }, [address, id, replace, setError]);

  const onFinalize = React.useCallback(async () => {
    const campaign = Campaign(address);
    setFinalizeLoading(true);
    setError(null);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0],
      });
      replace(`/campaigns/${address}/requests`);
    } catch (e) {
      setError(e.message);
    } finally {
      setFinalizeLoading(false);
    }
  }, [address, id, replace, setError]);

  const readyToFinalize = parseInt(request.approvalCount) > approversCount / 2;

  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell>{request.complete ? 'Completed' : 'Pending'}</Cell>
      <Cell>
        {!request.complete && (
          <Button
            color='green'
            basic
            loading={approveLoading}
            onClick={onApprove}
          >
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {!request.complete && (
          <Button
            color='teal'
            basic
            loading={finalizeLoading}
            onClick={onFinalize}
          >
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;
