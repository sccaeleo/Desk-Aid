
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';

// Page Imports
import Home from './src/app/page.js';
//import GuideList from './src/app/GuideListPage/page.js';
//import Guide from './src/app/GuidePage/page.js';
import Resources from './src/app/ResourcesPage/page.js';
//import Help from './src/app/HelpPage/page.js';
//import SignIn from './src/app/SignInPage/page.js';

jest.mock('axios');

// Home Page Tests
describe('Home page', () => {
  axios.get.mockResolvedValue({
    data: [
      { name: 'Category 1' },
      { name: 'Category 2' },
      { name: 'Category 3' },
    ],
  });
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

describe('Resources page', () => {
  it('Renders resources', async () => {
    const resources = [
      { name: 'Resource 1' },
      { name: 'Resource 2' },
      { name: 'Resource 3' },
    ];

    axios.get.mockResolvedValue({ data: resources });

    const { getByText } = render(<Resources />);
    await waitFor(() => expect(getByText('Resource 1')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Resource 2')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Resource 3')).toBeInTheDocument());
  });

});