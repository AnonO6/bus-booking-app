import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react-native';


import BookingDestination from '../../Screen/Booking/BookingDestination';

describe('BookingDestination component', () => {
    const mockNavigation = { navigate: jest.fn(), setOptions: jest.fn() };
    const mockRootReference = {
      child: jest.fn(() => ({
        once: jest.fn(() => ({
          then: jest.fn(() => Promise.resolve()),
        })),
      })),
    };
    const routeParams = { person: { PhoneNumber: '1234567890' } };
  
    test('renders without crashing', () => {
      render(<BookingDestination navigation={mockNavigation} route={{ params: routeParams }} />);
    });
  
    test('displays destination and arrival pickers', async () => {
      const { getByText } = render(<BookingDestination navigation={mockNavigation} route={{ params: routeParams }} />);
  
      const arrivalText = getByText('Arrival');
      const destinationText = getByText('Destination');
  
      expect(arrivalText).toBeDefined();
      expect(destinationText).toBeDefined();
    });
  
    test('navigates to BookingBusesScreen when "Find Bus" button is pressed', async () => {
      const { getByText } = render(<BookingDestination navigation={mockNavigation} route={{ params: routeParams }} />);
  
      const findBusButton = getByText('Find Bus');
      fireEvent.press(findBusButton);
  
      expect(mockNavigation.navigate).toHaveBeenCalledWith('BookingBusesScreen', expect.any(Object));
    });
  
    test('navigates to BookingBusesScreen with correct parameters when "Find Bus" button is pressed', async () => {
      const { getByText } = render(<BookingDestination navigation={mockNavigation} route={{ params: routeParams }} />);
  
      const findBusButton = getByText('Find Bus');
      fireEvent.press(findBusButton);
  
      expect(mockNavigation.navigate).toHaveBeenCalledWith('BookingBusesScreen', {
        ArrivalSelected: expect.any(String),
        DestinationSelected: expect.any(String),
        DateData: expect.any(String),
        person: routeParams.person,
        DateSchedule1: expect.any(Array),
      });
    });
  });
