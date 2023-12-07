import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react-native';
//1

import Register from '.Screen/Login/LoginRegister';

describe('Register Component', () => {
    it('renders without crashing', () => {
      const { getByText, getByPlaceholderText } = render(<Register route={{ params: {} }} />);
      
      // 
      expect(getByText('Register')).toBeTruthy();
      expect(getByPlaceholderText('Enter The Mobile Number')).toBeTruthy();
      expect(getByPlaceholderText('Enter Your Name')).toBeTruthy();
      expect(getByPlaceholderText('Enter Password')).toBeTruthy();
      expect(getByText('Login Here')).toBeTruthy();
      expect(getByText('Verify')).toBeTruthy();
    });
  
    it('handles registration with valid credentials', () => {
      const mockNavigation = { setOptions: jest.fn() };
      const mockLoginStateHandler = jest.fn();
  
      const { getByText, getByPlaceholderText } = render(
        <Register navigation={mockNavigation} route={{ params: { persons: [] } }} />
      );
      fireEvent.changeText(getByPlaceholderText('Enter The Mobile Number'), 'mockPhoneNumber');
      fireEvent.changeText(getByPlaceholderText('Enter Your Name'), 'mockName');
      fireEvent.changeText(getByPlaceholderText('Enter Password'), 'mockPassword');
      fireEvent.press(getByText('Verify'));
      expect(mockLoginStateHandler).toHaveBeenCalledWith(
        [{ Name: 'mockName', Password: 'mockPassword', PhoneNumber: 'mockPhoneNumber' }],
        expect.any(Object)
      );
  
      // Check if navigation was called with the expected parameters
      expect(mockNavigation.setOptions).toHaveBeenCalledWith({ headerShown: true });
    });
  
  });