import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
import {  Typography } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import { ConfirmDialog } from 'src/components/custom-dialog';


// ----------------------------------------------------------------------



export default function TransactionTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { status , user , amount , paymentMethod , paymentDetails} = row;

  const confirm = useBoolean();
  const payableAmount = amount - (amount * 0.05) // Assuming a 5% fee for the withdrawal

  // const quickEdit = useBoolean();

  // const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{user?.username}</TableCell>


        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fCurrency(amount)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fCurrency(payableAmount)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>

          {paymentMethod === 'BANK_TRANSFER' ?
          <>
          <Typography variant="body2">{paymentDetails?.bankAccount}</Typography>
          <Typography variant="body2">{paymentDetails?.accountHolderName}</Typography>
          <Typography variant="body2">{paymentDetails?.ifscCode}</Typography>
          </> :
          <Typography variant="body2">{paymentDetails?.upiId}</Typography>
          }

        </TableCell>

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Stack direction="row" spacing={1}>
            <Button onClick={() => handleWithdrawalRequest(id,'COMPLETED')} variant="contained" color="success" size="small">
              Accept
            </Button>
            <Button onClick={() => handleWithdrawalRequest(id,'CANCELLED')} variant="outlined" color="error" size="small">
              Reject
            </Button>
          </Stack>
        </TableCell> */}

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'active' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'banned' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

TransactionTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
