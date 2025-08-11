import { Helmet } from 'react-helmet-async';

import UserListView from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: User</title>
      </Helmet>

      <UserListView />
    </>
  );
}
