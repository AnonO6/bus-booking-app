import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react-native';

import LoginReset from '../../Screen/Login/LoginReset';



describe('LoginReset component', () => {
    test('renders without crashing', () => {
      render(<LoginReset navigation={{ navigate: jest.fn() }} route={{ params: { persons: [] } }} />);
    });
  
    test('displays error message for an unregistered phone number', async () => {
      const { getByPlaceholderText, getByText } = render(<LoginReset navigation={{ navigate: jest.fn() }} route={{ params: { persons: [] } }} />);
      
      const phoneNumberInput = getByPlaceholderText('Enter The Mobile Number');
      fireEvent.changeText(phoneNumberInput, '1234567890');
  
      const verifyButton = getByText('Verify');
      fireEvent.press(verifyButton);
  
      const errorMessage = getByText('Number is not registered');
      expect(errorMessage).toBeDefined();
    });
  
    test('navigates to LoginResetNew for a registered phone number', async () => {
      const mockNavigate = jest.fn();
      const { getByPlaceholderText, getByText } = render(<LoginReset navigation={{ navigate: mockNavigate }} route={{ params: { persons: [{ PhoneNumber: '1234567890' }] } }} />);
      
      const phoneNumberInput = getByPlaceholderText('Enter The Mobile Number');
      fireEvent.changeText(phoneNumberInput, '1234567890');
  
      const verifyButton = getByText('Verify');
      fireEvent.press(verifyButton);
  
      
      expect(mockNavigate).toHaveBeenCalledWith('LoginResetNew', { phone: '1234567890', persons: [{ PhoneNumber: '1234567890' }], personIndex: 0 });
    });
  });