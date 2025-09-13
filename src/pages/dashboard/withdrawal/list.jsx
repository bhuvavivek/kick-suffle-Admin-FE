import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import WithdrawalListView from 'src/sections/withdrawals/view';

// ----------------------------------------------------------------------

export default function WithdrawalsPage({withdrawals = true}) {
  return (
    <>
      <Helmet>
        <title> Dashboard: {withdrawals ?  "Withdrawals" : "Deposits"}</title>
      </Helmet>

      <WithdrawalListView withdrawal={withdrawals}/>
    </>
  );
}


WithdrawalsPage.propTypes = {
  withdrawals: PropTypes.bool
};