import { MutationConfig } from '@lib/config';
import { useMutation } from '@tanstack/react-query';
import { AuthServices } from './services';
import { clearAuthSession } from './utils/client';

export const AuthHooks = {
  useSignIn: ({ config }: { config?: MutationConfig<typeof AuthServices.signIn> } = {}) => {
    return useMutation({
      mutationFn: AuthServices.signIn,
      ...config,
    });
  },

  usePasswordResetRequest: ({ config }: { config?: MutationConfig<typeof AuthServices.passwordResetRequest> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: AuthServices.passwordResetRequest,
      onSettled: (data) => {
        if (!data?.success) return;
      },
    });
  },

  usePasswordReset: ({ config }: { config?: MutationConfig<typeof AuthServices.passwordReset> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: AuthServices.passwordReset,
      onSettled: (data) => {
        if (!data?.success) return;
      },
    });
  },

  usePasswordUpdate: ({ config }: { config?: MutationConfig<typeof AuthServices.passwordUpdate> } = {}) => {
    return useMutation({
      mutationFn: AuthServices.passwordUpdate,
      onSettled: (data) => {
        if (!data?.success) return;
      },
      ...config,
    });
  },

  useSignOut: () => {
    clearAuthSession();
    window.location.reload();
  },
};
