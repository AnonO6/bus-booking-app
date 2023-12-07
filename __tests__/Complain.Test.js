import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react-native';

import Complain from '../../Screen/Complain/Complain';


describe('Complain component', () => {
    const mockNavigation = { setOptions: jest.fn(), navigate: jest.fn() };
    const mockRootReference = {
      child: jest.fn(() => ({
        once: jest.fn(() => ({
          then: jest.fn(() => Promise.resolve()),
        })),
        set: jest.fn(() => Promise.resolve()),
      })),
    };
    const routeParams = { params: { person: { PhoneNumber: '1234567890' } } };
  
    test('renders without crashing', () => {
      render(<Complain navigation={mockNavigation} route={routeParams} />);
    });
  
    test('displays loading screen while fetching data', async () => {
      const { getByTestId } = render(<Complain navigation={mockNavigation} route={routeParams} />);
      const loadingScreen = getByTestId('loading-screen');
      expect(loadingScreen).toBeDefined();
    });
  
    test('displays error message when text input is less than 10 characters', async () => {
      const { getByText, getByPlaceholderText, getByTestId } = render(
        <Complain navigation={mockNavigation} route={routeParams} />
      );
  
      fireEvent.changeText(getByPlaceholderText('Enter The message'), 'Short');
      fireEvent.press(getByText('Submit'));
  
      await waitFor(() => {
        const errorMessage = getByText('Please Enter the digit greater then or equal to 10');
        expect(errorMessage).toBeDefined();
        expect(mockRootReference.child).not.toHaveBeenCalled();
        expect(mockRootReference.child().once).not.toHaveBeenCalled();
        expect(mockRootReference.child().set).not.toHaveBeenCalled();
        expect(mockNavigation.navigate).not.toHaveBeenCalled();
        expect(getByTestId('loading-screen')).toBeNull();
      });
    });
  
    test('submits the complain when text input is valid', async () => {
      const { getByText, getByPlaceholderText, getByTestId } = render(
        <Complain navigation={mockNavigation} route={routeParams} />
      );
  
      fireEvent.changeText(
        getByPlaceholderText('Enter The message'),
        'This is a valid complaint.'
      );
      fireEvent.press(getByText('Submit'));
  
      await waitFor(() => {
        expect(mockRootReference.child).toHaveBeenCalledWith('Suggestion');
        expect(mockRootReference.child().once).toHaveBeenCalled();
        expect(mockRootReference.child().set).toHaveBeenCalled();
        expect(mockNavigation.navigate).toHaveBeenCalledWith('HomeScreen');
        expect(getByTestId('loading-screen')).toBeNull();
      });
    });
  });

  