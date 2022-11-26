import { useRouter } from 'next/router';
import React from 'react';

//styles
import * as Styled from 'styles/pages/signin';

//config
import paths from 'config/paths';

const Signin = (): JSX.Element => {
  const router = useRouter();

  return (
    <Styled.Signin>
      <Styled.SigninButton onClick={() => router.push(paths.home.api.auth.login.index)}>Sign in</Styled.SigninButton>
    </Styled.Signin>
  )
}

export default Signin;