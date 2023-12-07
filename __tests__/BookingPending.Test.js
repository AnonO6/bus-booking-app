import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react-native';


import BookingPending from '../../Screen/Booking/BookingPending';

describe('BookingPending component', () => {
    const mockNavigation = { setOptions: jest.fn() };
    const mockRootReference = {
      child: jest.fn(() => ({
        once: jest.fn(() => ({
          then: jest.fn(() => Promise.resolve()),
        })),
      })),
    };
    const routeParams = { params: { person: { PhoneNumber: '1234567890' } } };
  
    test('renders without crashing', () => {
      render(<BookingPending navigation={mockNavigation} route={routeParams} />);
    });
  
    test('displays loading screen while fetching data', async () => {
      const { getByTestId } = render(<BookingPending navigation={mockNavigation} route={routeParams} />);
      const loadingScreen = getByTestId('loading-screen');
      expect(loadingScreen).toBeDefined();
    });
  
    test('displays tickets once data is fetched', async () => {
      const { getByText } = render(<BookingPending navigation={mockNavigation} route={routeParams} />);
      await waitFor(() => {
        expect(getByText('Purchase Now')).toBeDefined();
      });
    });
  
    test('navigates to TicketDetailScreen when "Purchase Now" button is pressed', async () => {
      const { getByText } = render(<BookingPending navigation={mockNavigation} route={routeParams} />);
      await waitFor(() => {
        const purchaseNowButton = getByText('Purchase Now');
        fireEvent.press(purchaseNowButton);
        expect(mockNavigation.navigate).toHaveBeenCalledWith('TicketDetailScreen', expect.any(Object));
      });
    });
  
    test('navigates to TicketDetailScreen with correct parameters when "Purchase Now" button is pressed', async () => {
      const { getByText } = render(<BookingPending navigation={mockNavigation} route={routeParams} />);
      await waitFor(() => {
        const purchaseNowButton = getByText('Purchase Now');
        fireEvent.press(purchaseNowButton);
        expect(mockNavigation.navigate).toHaveBeenCalledWith('TicketDetailScreen', {
          Bus: expect.any(Object),
          person: expect.any(Object),
        });
      });
    });
  });
