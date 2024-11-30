declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }
}

export type SessionUser = {
  memberId: string;
  username: string;
  fullName: string;
  email: string;
};
