export const userMock = {
  id: 1,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
}

export const validLogin = {
  email: 'user@user.com',
  password: 'secret_user',
};

export const validationLoginEmail = {
  email: 'invalidEmail@user.com',
  password: 'secret_user',
};

export const validationLoginPassword = {
  email: 'user@user.com',
  password: 'invalid_password',
};

export const emailVazio = {
  password: 'secret_user',
};

export const passwordVazia = {
  email: 'user@user.com',
};

export const mockTokenVerification = {
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}
