import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import { UserCollection } from '../db/models/user.js';
import { SessionCollection } from '../db/models/session.js';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/users.js';

const createSessionData = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
  refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
});

export const register = async (payload) => {
  const { email, password } = payload;

  const user = await UserCollection.findOne({ email });
  if (user) throw createHttpError(409, 'Email in use');

  const hashPassword = await bcrypt.hash(password, 10);

  return await UserCollection.create({
    ...payload,
    password: hashPassword,
  });
};

export const login = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) throw createHttpError(401);

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw createHttpError(401);

  await SessionCollection.deleteOne({ userId: user._id });

  const sessionData = createSessionData();

  return await SessionCollection.create({
    userId: user._id,
    ...sessionData,
  });
};

export const refreshToken = async (payload) => {
  const oldSession = await SessionCollection.findOne({
    _id: payload.sessionId,
    refreshToken: payload.refreshToken,
  });
  if (!oldSession) throw createHttpError(401, 'Session not found');

  if (Date.now() > oldSession.refreshTokenValidUntil)
    throw createHttpError(401, 'Refresh token expired');

  await SessionCollection.deleteOne({ _id: payload.sessionId });

  const sessionData = createSessionData();

  return await SessionCollection.create({
    userId: oldSession.userId,
    ...sessionData,
  });
};

export const logout = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const getSession = (filter) => SessionCollection.findOne(filter);

export const getUser = (filter) => UserCollection.findOne(filter);
