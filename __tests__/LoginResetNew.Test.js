import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react-native';

import LoginResetNew from '../../Screen/Login/LoginResetNew';

describe('LoginResetNew component', () => {
    test('renders without crashing', () => {
      render(<LoginResetNew navigation={{ navigate: jest.fn() }} route={{ params: {} }} />);
    });
  
    test('displays error message for an incorrect pin', async () => {
      const { getByPlaceholderText, getByText } = render(<LoginResetNew navigation={{ navigate: jest.fn() }} route={{ params: {} }} />);
      
      const pinInput = getByPlaceholderText('Enter the Pin (Temp:1)');
      fireEvent.changeText(pinInput, '0000');
  
      const resetButton = getByText('Reset');
      fireEvent.press(resetButton);
  
      const errorMessage = getByText('Invalid Pin (Temprary is 1)');
      expect(errorMessage).toBeDefined();
    });
  
    test('displays error message for a short password', async () => {
      const { getByPlaceholderText, getByText } = render(<LoginResetNew navigation={{ navigate: jest.fn() }} route={{ params: {} }} />);
      
      const pinInput = getByPlaceholderText('Enter the Pin (Temp:1)');
      fireEvent.changeText(pinInput, '1');
  
      const passwordInput = getByPlaceholderText('New Password');
      fireEvent.changeText(passwordInput, 'pass');
  
      const resetButton = getByText('Reset');
      fireEvent.press(resetButton);
  
      const errorMessage = getByText('Please enter password atleast greater then 5');
      expect(errorMessage).toBeDefined();
    });
  
    test('resets the password for correct pin and valid password', async () => {
      const mockNavigate = jest.fn();
      const mockLoginStateHandler = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <LoginResetNew
          navigation={{ navigate: mockNavigate, setOptions: jest.fn() }}
          route={{ params: { persons: [], personIndex: 0 } }}
        />
      );
  
      const pinInput = getByPlaceholderText('Enter the Pin (Temp:1)');
      fireEvent.changeText(pinInput, '1');
  
      const passwordInput = getByPlaceholderText('New Password');
      fireEvent.changeText(passwordInput, 'newPassword');
  
      const resetButton = getByText('Reset');
      fireEvent.press(resetButton);
  
      // Ensure LoginStateHandler is called with the updated user data
      expect(mockLoginStateHandler).toHaveBeenCalledWith({ Password: 'newPassword' });
    });
  });