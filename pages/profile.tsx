import React from 'react';
import { getSession, UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Head from 'next/head';

//components
import Layout from 'components/global/Layout/Layout';

//styles
import * as Styled from 'styles/pages/profile';

//hooks
import useStore from 'hooks/useStore';

//store
import userStoreConfig, { UserStore } from 'store/user';

//config
import paths from 'config/paths';

export const getServerSideProps = withPageAuthRequired({
  returnTo: paths.home.profile.index,
});

interface Props {
  user: UserProfile;
}

const Profile = (props: Props): JSX.Element => {
  const [userStore] = useStore<UserStore>(
    new UserStore({ ...userStoreConfig, initialValues: props.user })
  );
  const router = useRouter();

  return (
    <>
      <Head>
        <title>City News | Profile</title>
      </Head>
      <Layout keySelected={-1}>
        <Styled.Profile>
          <Styled.ProfilePicture src={userStore.getValues().picture ?? ''} />
          <Styled.ProfileDescription>
            <p>Email: {userStore.getValues().email}</p>
            <p>Name: {userStore.getValues().name}</p>
            <p>Nickname: {userStore.getValues().nickname}</p>
            <Styled.LogoutButton type="primary" onClick={() => router.push(paths.home.api.auth.logout.index)}>
              Log out
            </Styled.LogoutButton>
          </Styled.ProfileDescription>
        </Styled.Profile>
      </Layout>
    </>
  );
};

export default Profile;
