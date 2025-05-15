export const UserType = {
  CANDIDATE: 'CANDIDATE',
  EMPLOYER: 'EMPLOYER',
  ADMIN: 'ADMIN',
} as const;

export type UserType = typeof UserType[keyof typeof UserType];