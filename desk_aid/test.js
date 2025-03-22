
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor, getByLabelText } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';

// Page Imports
import Home from './src/app/api/pages/page.js';
//import Guide from './src/app/GuidePage/page.js';
import Resources from './src/app/api/pages/ResourcesPage/page.js';
import Help from './src/app/api/pages/HelpPage/page.js';
import SignIn from './src/app/api/pages/SignInPage/page.js';
import EditSelect from './src/app/api/pages/EditSelectPage/page.js';
import EditResources from './src/app/api/pages/EditResources/page.js';
import EditCategories from './src/app/api/pages/EditCategories/page.js';

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


// Resources Page Tests
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

// Help Page Test
describe('Help page', () => {
  it('Renders help page', async () => {
    const { getByText } = render(<Help />);
    await waitFor(() => expect(getByText('As a new district office staff person, we understand that you may not know how to process various constituent requests or what resources are available for the constituent. The Constituent Services Desk Aid aims to help you through the initial learning curve by giving you step-by-step instructions for many of the most common services including PennDOT, Property Tax/ Rent Rebate, senior benefits, LIHEAP, and welfare questions.')).toBeInTheDocument());
  });



});

// Sign in Page Tests
describe('Sign in page', () => {
  it('Renders sign in form', () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('Calls sign in function', () => {
    const signInMock = jest.fn();
    const { getByPlaceholderText, getByText, getByTestId } = render(<SignIn signIn={signInMock} />);
    const usernameInput = getByTestId('username');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Submit');
    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    axios.post.mockResolvedValue({ data: { success: true } });
    fireEvent.click(submitButton);
    waitFor(() => expect(signInMock).toHaveBeenCalledTimes(1));
  });
});

// Edit Select Page Tests
describe('Edit Select page', () => {
  it('Renders edit select page', () => {
    const { getByText } = render(<EditSelect />);
    expect(getByText('Edit Resources')).toBeInTheDocument();
    expect(getByText('Edit Guide Categories')).toBeInTheDocument();
    expect(getByText('Edit Guides')).toBeInTheDocument();
  });
});

// Edit Resources Page Tests
describe('Edit Resources page', () => {
  it('Renders edit resources page', () => {
    const { getByText } = render(<EditResources />);
    expect(getByText('Edit Resources')).toBeInTheDocument();
  });

  it('Renders add resource button', () => {
    const { getByText } = render(<EditResources />);
    expect(getByText('+ Add a Resource')).toBeInTheDocument();
  });

  it('Renders resources', async () => {
    const resources = [
      { name: 'Resource 1' },
      { name: 'Resource 2' },
      { name: 'Resource 3' },
    ];

    axios.get.mockResolvedValue({ data: resources });

    const { getByText } = render(<EditResources />);
    await waitFor(() => expect(getByText('Resource 1')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Resource 2')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Resource 3')).toBeInTheDocument());
  });

  it('Opens modal when add resource button is clicked', async () => {
    const { getByText, getByRole } = render(<EditResources />);
    const addButton = getByText('+ Add a Resource');
    fireEvent.click(addButton);
    expect(getByRole('dialog')).toBeInTheDocument();
  });

  it('Closes modal when close button is clicked', async () => {
    const { getByText, getByRole } = render(<EditResources />);
    const addButton = getByText('+ Add a Resource');
    fireEvent.click(addButton);
    const closeButton = getByRole('button', { name: 'X' });
    fireEvent.click(closeButton);
  });

  it('Calls addResource function when add resource form is submitted', () => {
    const addResourceMock = jest.fn();
    const { getByText, getByRole } = render(<EditResources addResource={addResourceMock} />);
    const addButton = getByText('+ Add a Resource');
    fireEvent.click(addButton);
    const form = getByRole('form');
    fireEvent.submit(form);
    waitFor(() => expect(addResourceMock).toHaveBeenCalledTimes(1));
  });

  it('Calls editResource function when edit resource form is submitted', async () => {
    const editResourceMock = jest.fn();
    const resources = [
      { id: 1, name: 'Resource 1', description: 'Description' },
    ];

    axios.get.mockResolvedValue({ data: resources });
    
    const { getByText, getByRole } = render(<EditResources editResource={editResourceMock} />);
    const resourceButton = await waitFor(() => getByRole('button', { name: 'Resource 1' }));
    fireEvent.click(resourceButton);
    const form = getByRole('form');
    fireEvent.submit(form);
    waitFor(() => expect(editResourceMock).toHaveBeenCalledTimes(1));
  });

  it('Calls deleteResource function when delete resource button is clicked', async () => {
    const deleteResourceMock = jest.fn();
    const resources = [
      { name: 'Resource 1'},
    ];

    axios.get.mockResolvedValue({ data: resources });    

    const { getByRole } = render(<EditResources />);
    const deleteButton = getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);
    waitFor(() => expect(deleteResourceMock).toHaveBeenCalledTimes(1));
  });
});