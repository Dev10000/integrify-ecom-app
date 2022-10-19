/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// import axios from 'axios';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { axiosMongoApi } from '../../../utils/axios';

const getTokenFromYourAPIServer = async (reqBody) => {
  try {
    const response = await axiosMongoApi.post('/api/v1/auth/login', reqBody);
    const user = response.data;
    return user;
  } catch (error) {
    console.log(error);
    return {};
  }
};

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }),
];

const callbacks = {};

callbacks.signIn = async function signIn({ user, account }) {
  // eslint-disable-next-line no-constant-condition, no-self-compare
  if (account.provider === 'google') {
    const googleUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    };
    console.log('google user', googleUser);
    console.log('user', user, 'account:', account);

    const response = await getTokenFromYourAPIServer(googleUser);
    console.log('response:', response);

    user.accessToken = response.accessToken;
    return true;
  }

  return false;
};

callbacks.jwt = async function jwt({ token, user }) {
  console.log('JWT token:', token, 'jwt user:', user);
  if (user) {
    token = { accessToken: user.accessToken };
  }

  return token;
};

callbacks.session = async function session({ session, token }) {
  session.accessToken = token.accessToken;
  return session;
};

const options = {
  providers,
  callbacks,
};

// export default (req, res) => NextAuth(req, res, options);
export default NextAuth(options);

// export default NextAuth(authOptions);
