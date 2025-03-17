import React from 'react';
import Sidebar from '../../components/SidebarUser';
import PersonalInfo from '../../components/PersonalInfor';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

const Profile = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx('conatiner')}>
        <Sidebar />
        <PersonalInfo />
      </div>
    </div>
  );
};

export default Profile;