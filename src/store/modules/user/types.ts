export type RoleType = '' | '*' | 'admin' | 'user';

export interface Building {
  building: string;
  check_in_time: string;
  check_out_time: string;
  community_id: string;
  level: string;
  state: boolean;
  type: string;
  user_id: string;
  _id: string;
  username?: string;
}
export interface Community {
  area: string;
  contact: string;
  location: string;
  name: string;
  _id: string;
}
export interface Complaint {
  community_id: string;
  content: string;
  status: boolean;
  subject: string;
  time: string;
  user_id: string;
  _id: string;
}
export interface Declaration {
  community_id: string;
  content: string;
  status: boolean;
  subject: string;
  time: string;
  user_id: string;
  _id: string;
}
export interface Payment {
  amount: string;
  building_id: string;
  community_id: string;
  state: boolean;
  time: string;
  type: string;
  _id: string;
}
export interface User {
  community_id: string;
  created_at: string;
  username: string;
  _id: string;
}

export interface UserState {
  user: User;
  building: Building[];
  community: Community[];
  complaint: Complaint[];
  declaration: Declaration[];
  payment: Payment[];
  usersList: User[];
  adminsList: User[];
  role: RoleType;
}
