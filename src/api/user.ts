import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
// user.ts

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData extends LoginData {
  role: string;
  building: string;
  level: string;
  buildingType: string;
}

export interface LoginRes {
  token: string;
}

export interface ComplaintInfo {
  subject: string;
  content: string;
}
export interface ResolveData {
  id: string;
}
export interface BuildingOperation {
  id: string;
  paymentType: string;
  amount: string;
}

// regiser function
export async function register(registerData: RegisterData) {
  return axios.post<LoginRes>('/register', registerData);
}

// login function
export async function login(loginData: LoginData) {
  return axios.post('/login', loginData);
}

export function getUserInfo() {
  return axios.get('/getUserInfo');
}

export function requestComplaint(complaintInfo: ComplaintInfo) {
  return axios.post('/complaint', complaintInfo);
}
export function requestDeclaration(declarationInfo: ComplaintInfo) {
  return axios.post('/declaration', declarationInfo);
}
export function resolveComplaint(resolveData: ResolveData) {
  return axios.post('/resolveComplaint', resolveData);
}
export function resolveDeclaration(resolveData: ResolveData) {
  return axios.post('/resolveDeclaration', resolveData);
}
export function resolvePayment(resolveData: ResolveData) {
  return axios.post('/resolvePayment', resolveData);
}
export function buildingOperation(BuildingOperationData: BuildingOperation) {
  return axios.post('/buildingOperation', BuildingOperationData);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
