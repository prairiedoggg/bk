const baseURL = 'http://localhost:5000';
import axios from 'axios';

export const postSignup = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/auth/register`, data);
    console.log('회원가입 완료', res);
    return res;
  } catch (error) {
    console.error('회원가입 오류:', error);
    throw error;
  }
};

export const postLogin = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/auth/login`, data);
    console.log('로그인 완료', res);
    return res;
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
};
