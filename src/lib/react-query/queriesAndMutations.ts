import { INewUser } from "@/types";
import { useMutation } from "@tanstack/react-query";
import {
  checkEmailExists,
  checkUsernameExists,
  createUserAccount,
  signInAccount,
  signOut,
} from "../appwrite/api";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: () => signOut(),
  });
};

export const useCheckEmailExists = () => {
  return useMutation({
    mutationFn: (email: string) => checkEmailExists(email),
  });
};

export const useCheckUsernameExists = () => {
  return useMutation({
    mutationFn: (username: string) => checkUsernameExists(username),
  });
};
