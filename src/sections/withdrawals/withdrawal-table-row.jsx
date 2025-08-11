import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Stack, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import { ConfirmDialog } from 'src/components/custom-dialog';


// ----------------------------------------------------------------------

export default function WithdrawalTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { status  } = row;

  const confirm = useBoolean();

  // const quickEdit = useBoolean();

  // const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>vivek521</TableCell>


        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fCurrency(40)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fCurrency(60)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>

          {false ?
          <>
          <Typography variant="body2">Account Holder:</Typography>
          <Typography variant="body2">Account No</Typography>
          <Typography variant="body2">IFSC:</Typography>
          </> :
          <Typography variant="body2">upi:</Typography>
          }

        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" color="success" size="small">
              Accept
            </Button>
            <Button variant="outlined" color="error" size="small">
              Reject
            </Button>
          </Stack>
        </TableCell>

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

WithdrawalTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
