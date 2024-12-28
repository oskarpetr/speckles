declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }
}

export type SessionUser = {
  userId: string;
  username: string;
  fullName: string;
  email: string;
};
