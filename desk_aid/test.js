
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';



import Home from './src/app/page.js';
//import GuideList from './src/app/GuideListPage/page.js';
//import Guide from './src/app/GuidePage/page.js';
//import Resources from './src/app/ResourcesPage/page.js';
//import Help from './src/app/HelpPage/page.js';
//import SignIn from './src/app/SignInPage/page.js';

// Home Page Tests
describe('Home page', () => {

  it('Displays title', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Constituent Service Desk Aid')).toBeInTheDocument();
  });

  it('Renders search bar', () => {
    const { getByPlaceholderText } = render(<Home />);
    expect(getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('Calls search function', () => {
    const searchMock = jest.fn();
    const { getByText, getByPlaceholderText } = render(<Home search={searchMock} />);
    const searchInput = getByPlaceholderText('Search');
    const submitButton = getByText('Search');
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    fireEvent.click(submitButton);
    waitFor(() => expect(searchMock).toHaveBeenCalledTimes(1));
  });
});