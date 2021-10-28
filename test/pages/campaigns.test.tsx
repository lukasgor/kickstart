/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import CampaignList from '../../pages';

jest.mock('next/router', () => {
  return {
    useRouter: () => ({
      pathname: '/campaigns',
    }),
  };
});

const testCampaigns = ['0xEda0f6d9b5Af97186Db47Fde9139a4dFBEF003Ef'];

test('renders campaign list', async () => {
  render(<CampaignList campaigns={testCampaigns} />);
  expect(screen.getByText(testCampaigns[0])).toBeInTheDocument();
});
