import { IBaseResponse } from '@base/interfaces';
import { AxiosInstance, AxiosSecureInstance } from '@lib/config';
import { responseHandlerFn } from '@lib/utils';
import { ISignIn, ISignInResponse } from './interfaces';

const END_POINT: string = '/auth';

export const AuthServices = {
  NAME: END_POINT,

  signIn: async (payload: ISignIn): Promise<ISignInResponse> => {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/login`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },

  passwordResetRequest: async (payload: {
    identifier: string;
  }): Promise<
    IBaseResponse<{
      identifier: string;
      hash: string;
      otp: number;
    }>
  > => {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/reset-password-request`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },

  passwordReset: async (payload: {
    identifier: string;
    hash: string;
    otp: number;
    newPassword: string;
  }): Promise<IBaseResponse> => {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/reset-password-verify`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },

  passwordUpdate: async (payload: { currentPassword: string; newPassword: string }): Promise<IBaseResponse> => {
    try {
      const res = await AxiosSecureInstance.patch(`${END_POINT}/change-password`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
};
