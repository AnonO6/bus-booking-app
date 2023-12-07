
import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react-native';
import LoginRegisterVerify from '../../Screen/Login/LoginRegisterVerify';

describe('LoginRegisterVerify component', () => {
    test('renders without crashing', () => {
      render(<LoginRegisterVerify navigation={{ navigate: jest.fn() }} route={{ params: {} }} />);
    });
  
    test('displays error message for an incorrect pin', async () => {
      const { getByPlaceholderText, getByText } = render(<LoginRegisterVerify navigation={{ navigate: jest.fn() }} route={{ params: {} }} />);
      
      const pinInput = getByPlaceholderText('Enter The Pin');
      fireEvent.changeText(pinInput, '0000');
  
      const registerButton = getByText('Register');
      fireEvent.press(registerButton);
  
      const errorMessage = getByText('Invalid User Name or Password');
      expect(errorMessage).toBeDefined();
    });
  
    test('registers the user for a correct pin', async () => {
      const mockNavigate = jest.fn();
      const mockLoginStateHandler = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <LoginRegisterVerify
          navigation={{ navigate: mockNavigate }}
          route={{ params: { phone: '1234567890', password: 'password', name: 'John' } }}
        />
      );
  
      const pinInput = getByPlaceholderText('Enter The Pin');
      fireEvent.changeText(pinInput, '1234');
  
      const registerButton = getByText('Register');
      fireEvent.press(registerButton);
  
      // Ensure LoginStateHandler is called with the correct user data
      expect(mockLoginStateHandler).toHaveBeenCalledWith({
        Name: 'John',
        PhoneNumber: '1234567890',
        Password: 'password',
      });
    });
  });