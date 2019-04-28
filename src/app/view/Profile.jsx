import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Profile = ({ username, verify }) => {
  const [verifiedState, setVerified] = useState(false);

  useEffect(() => { verify(setVerified); }, [verify]);

  return (
    <div>
      <p>Your Profile, {username}</p>
      <p>{verifiedState ? 'Verified' : ''}</p>
    </div>
  );
};

Profile.propTypes = {
  verify: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default Profile;
