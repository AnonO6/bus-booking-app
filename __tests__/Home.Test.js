import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react-native';


import Home from '../../Screen/Home/Home';

describe('Home component', () => {
    const mockNavigate = jest.fn();
    const mockLoginStateHandler = jest.fn();
    const person = {
      Name: 'John Doe',
      PhoneNumber: '1234567890',
    };
  
    test('renders without crashing', () => {
      render(<Home navigation={{ navigate: mockNavigate }} route={{ params: { person } }} />);
    });
  
    test('displays user information correctly', async () => {
      const { getByText } = render(<Home navigation={{ navigate: mockNavigate }} route={{ params: { person } }} />);
  
      const nameText = getByText('John Doe');
      const phoneNumberText = getByText('1234567890');
  
      expect(nameText).toBeDefined();
      expect(phoneNumberText).toBeDefined();
    });
  
    test('navigates to BookingDestinationScreen when "Book Seat" button is pressed', async () => {
      const { getByText } = render(<Home navigation={{ navigate: mockNavigate }} route={{ params: { person } }} />);
  
      const bookSeatButton = getByText('Book Seat');
      fireEvent.press(bookSeatButton);
  
      expect(mockNavigate).toHaveBeenCalledWith('BookingDestinationScreen', { person });
    });
  
    test('navigates to BookingPendingScreen when "My Booking" button is pressed', async () => {
      const { getByText } = render(<Home navigation={{ navigate: mockNavigate }} route={{ params: { person } }} />);
  
      const myBookingButton = getByText('My Booking');
      fireEvent.press(myBookingButton);
  
      expect(mockNavigate).toHaveBeenCalledWith('BookingPendingScreen', { person });
    });
  
    test('navigates to PurchasedTicketScreen when "My Ticket" button is pressed', async () => {
      const { getByText } = render(<Home navigation={{ navigate: mockNavigate }} route={{ params: { person } }} />);
  
      const myTicketButton = getByText('My Ticket');
      fireEvent.press(myTicketButton);
  
      expect(mockNavigate).toHaveBeenCalledWith('PurchasedTicketScreen', { person });
    });
  
    test('navigates to ComplaintScreen when "Complain" button is pressed', async () => {
      const { getByText } = render(<Home navigation={{ navigate: mockNavigate }} route={{ params: { person } }} />);
  
      const complainButton = getByText('Complain');
      fireEvent.press(complainButton);
  
      expect(mockNavigate).toHaveBeenCalledWith('ComplaintScreen', { person });
    });
  
    test('calls LoginStateHandler with "Logout" when the logout button is pressed', async () => {
      const { getByText } = render(<Home navigation={{ navigate: mockNavigate }} route={{ params: { person } }} />);
  
      const logoutButton = getByText('Logout');
      fireEvent.press(logoutButton);
  
      expect(mockLoginStateHandler).toHaveBeenCalledWith('Logout');
    });
  });