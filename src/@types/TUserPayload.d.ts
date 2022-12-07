interface TUserPayload {
  sub: string;
  name: string;
  email: string;
  avatar?: string;
  iat?: number;
  exp?: number;
}
