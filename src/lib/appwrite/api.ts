import { INewUser } from "@/types";
import { ID, OAuthProvider, Query } from "appwrite";
import { account, appwriteConfig, avatars, database } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) {
      throw new Error("Failed to create user account");
    }

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch {
    throw new Error("Failed to create user account");
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl?: URL;
  username?: string;
}) {
  try {
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch {
    throw new Error("Failed to save user to database");
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function signInWithFacebook() {
  try {
    const session = await account.createOAuth2Session(
      OAuthProvider.Facebook,
      "http://localhost:5173/", // redirect here on success
      "https://localhost:5173/accounts/sign-in" // redirect here on failure
    );
    return session;
  } catch {
    throw new Error("Failed to sign in with Facebook");
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch {
    return null;
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch {
    return null;
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function checkEmailExists(email: string) {
  try {
    const userEmailExists = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("email", email)]
    );

    return userEmailExists.documents.length > 0;
  } catch {
    throw new Error("Failed to check if email exists");
  }
}

export async function checkUsernameExists(username: string) {
  try {
    const userUsernameExists = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("username", username)]
    );

    return userUsernameExists.documents.length > 0;
  } catch {
    throw new Error("Failed to check if email exists");
  }
}
