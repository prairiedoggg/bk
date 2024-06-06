import React, { useState } from 'react';
import AuthModal from './AuthModal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const AuthModalController = ({ onClose }) => {
  const [formType, setFormType] = useState('로그인');

  const renderForm = () => {
    switch (formType) {
      case '로그인':
        return <LoginForm setFormType={setFormType} />;
      case '회원가입':
        return <SignUpForm setFormType={setFormType} />;
      default:
        return null;
    }
  };

  return (
    <AuthModal
      title={formType}
      component={renderForm()}
      onClose={onClose}
    ></AuthModal>
  );
};

export default AuthModalController;
