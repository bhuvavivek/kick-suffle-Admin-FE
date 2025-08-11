import { Helmet } from 'react-helmet-async';

import WithdrawalListView from 'src/sections/withdrawals/view';

// ----------------------------------------------------------------------

export default function WithdrawalsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Withdrawals</title>
      </Helmet>

      <WithdrawalListView />
    </>
  );
}
