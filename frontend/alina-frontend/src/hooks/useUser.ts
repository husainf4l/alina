// React Query hooks for User

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/lib/api/services';
import type { User } from '@/lib/api/types';

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUser(userId),
    enabled: !!userId,
  });
};

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<User>) => userService.updateCurrentUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userService.deleteAccount(),
    onSuccess: () => {
      // HTTP-only cookies cleared by backend
      // Clear React Query cache
      queryClient.clear();
    },
  });
};
