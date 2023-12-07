import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react-native';
//1
import Login from '../../Screen/Login/Login';

describe('Login Component', () => {
    test('renders without crashing', () => {
      const { getByText, getByPlaceholderText } = render(<Login />);
      expect(getByText('BUS BOOKING SYSTEM')).toBeTruthy();
      expect(getByPlaceholderText('Enter The Mobile Number')).toBeTruthy();
      expect(getByPlaceholderText('Enter Password')).toBeTruthy();
      expect(getByText('Register Here')).toBeTruthy();
      expect(getByText('Login')).toBeTruthy();
    });
  
    test('handles login button click with valid credentials', () => {
      const mockNavigation = { navigate: jest.fn() };
      const mockLoginStateHandler = jest.fn();
  
      const { getByText, getByPlaceholderText } = render(
        <Login navigation={mockNavigation} LoginStateHandler={mockLoginStateHandler} />
      );
      fireEvent.changeText(getByPlaceholderText('Enter The Mobile Number'), 'mockPhoneNumber');
      fireEvent.changeText(getByPlaceholderText('Enter Password'), 'mockPassword');
      fireEvent.press(getByText('Login'));
      expect(mockLoginStateHandler).toHaveBeenCalledWith(
        { PhoneNumber: 'mockPhoneNumber', Password: 'mockPassword' },
        expect.any(Object)
      );
      expect(mockNavigation.navigate).toHaveBeenCalledWith('OperatorLogin', expect.objectContaining({
        persons: expect.any(Array),
      }));
    });
  
  });