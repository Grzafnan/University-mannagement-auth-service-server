import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // Using Instance Methods
  //Check User Existence
  // const user = new User();
  // const isUserExist = await user.isUserExist(id);

  // Using Static Methods
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }

  //Check User match Password
  if (
    isUserExist?.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
  }

  //Create JWT token
  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  // invalid token - synchronous

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token!');
  }

  const { userId } = verifiedToken;
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }

  // Create new Access Token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
