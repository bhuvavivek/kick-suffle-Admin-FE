import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Stack, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
import axiosInstance, { endpoints } from 'src/utils/axios';

import Label from 'src/components/label';
import { ConfirmDialog } from 'src/components/custom-dialog';


// ----------------------------------------------------------------------



export default function WithdrawalTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow , refetch,withdrawal}) {
  const {id, status , user , amount , paymentMethod , paymentDetails , createdAt} = row;
  

  const confirm = useBoolean();
  const payableAmount = amount - (amount * 0.05) // Assuming a 5% fee for the withdrawal

  // const quickEdit = useBoolean();

  // const popover = usePopover();

  const handleWithdrawalRequest = async (transactionId, action) =>{
  try{
    const response = await axiosInstance.post(endpoints.transactions.withdrawal_action(transactionId),{
      status: action
    })

    if (response.status === 200){
      console.log('Withdrawal status updated successfully');
      refetch();
    } else {
      console.error('Failed to update withdrawal status');
    }
  }catch(error){
    console.log(error);
  }
}

  return (
    <>
      <TableRow hover selected={selected}>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{user?.username}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDate(createdAt)}</TableCell>


        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fCurrency(amount)}</TableCell>
      { withdrawal && <TableCell sx={{ whiteSpace: 'nowrap' }}>{fCurrency(payableAmount)}</TableCell>}

      { withdrawal && <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {paymentMethod === 'BANK_TRANSFER' ?
          <>
          <Typography variant="body2">{paymentDetails?.bankAccount}</Typography>
          <Typography variant="body2">{paymentDetails?.accountHolderName}</Typography>
          <Typography variant="body2">{paymentDetails?.ifscCode}</Typography>
          </> :
          <Typography variant="body2">{paymentDetails?.upiId}</Typography>
          }

        </TableCell>}

      {  withdrawal &&  <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Stack direction="row" spacing={1}>
            <Button onClick={() => handleWithdrawalRequest(id,'COMPLETED')} variant="contained" color="success" size="small" disabled={status === 'COMPLETED' || status === 'CANCELLED'}>
              Accept
            </Button>
            <Button onClick={() => handleWithdrawalRequest(id,'CANCELLED')} variant="outlined" color="error" size="small" disabled={status === 'CANCELLED' || status === 'COMPLETED'}>
              Reject
            </Button>
          </Stack>
        </TableCell> }

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'COMPLETED' && 'success') ||
              (status === 'COMPLETED' && 'warning') ||
              (status === 'PENDING' && 'error') ||
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

WithdrawalTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  refetch: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
  withdrawal: PropTypes.bool
};
