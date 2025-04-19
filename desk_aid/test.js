
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor, getByLabelText } from '@testing-library/react';
import axios from 'axios';
import request from 'supertest';
import '@testing-library/jest-dom';

// Page Imports
import Home from './src/app/page.js';
//import Guide from './src/app/GuidePage/page.js';
import Resources from './src/app/ResourcesPage/page.js';
import Help from './src/app/HelpPage/page.js';
import SignIn from './src/app/SignInPage/page.js';
import EditSelect from './src/app/EditSelectPage/page.js';
import EditResources from './src/app/EditResources/page.js';
import EditCategories from './src/app/EditCategories/page.js';

import server from './src/app/api/server.js';
import db from './src/app/api/database.js';

jest.mock('axios');

// Tests for the server
describe('Server Tests', () => {

  beforeEach(async () => {
    await db.run('BEGIN TRANSACTION');
  });
  
  afterEach(async () => {
    await db.run('ROLLBACK');
  });
  
  it('Checks if the server is up', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
  })

  it('Sign in failure', async () => {
    const response = await request(server).post('/api/signin').send({ username: 'invalid', password: 'invalid' });
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid username or password');
  });

  it('Sign in success', async () => {
    const response = await request(server).post('/api/signin').send({ username: 'admin', password: 'adpass' });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('Reads resource', async () => {
    const response = await request(server).get('/api/resources');
    expect(response.status).toBe(200);
  });

  it('Creates resource', async () => {
    const response = await request(server).post('/api/resources').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');

    const response2 = await request(server).post('/api/resources').send({ name: "Test res", description: "Test desc" });
    //expect(response2.status).toBe(200);
    expect(response2.body).toHaveProperty('id');
  });

  it('Updates resource', async () => {
    const id = 1;
    const response = await request(server).put(`/api/resources/${id}`).send({ name: 'Test res', description: 'Test desc' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  it('Deletes resource', async () => {
    const id = 1;
    const response = await request(server).delete(`/api/resources/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Reads category', async () => {
    const response = await request(server).get('/api/categories');
    expect(response.status).toBe(200);
  });

  it('Creates category', async () => {
    const response = await request(server).post('/api/categories').send({ name: 'Test cat' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Updates category', async () => {
    const id = 1;
    const response = await request(server).put(`/api/categories/${id}`).send({ name: 'Test cat'});
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  it('Deletes category', async () => {
    const id = 1;
    const response = await request(server).delete(`/api/categories/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Gets guides', async () => {
    const response = await request(server).get('/api/guides');
    expect(response.status).toBe(200); 
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[1]).toHaveProperty('name');
  })

  it('Gets one guide' , async () => {
    const id = 1;
    const response = await request(server).get(`/api/guides/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
  })

  it('Searches for a guide', async () => {
    const response = await request(server).get('/api/guides?search=test');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[1]).toHaveProperty('name');
  })

  it('Creates guide', async () => {
    const response = await request(server).post('/api/guides').send({ name: 'Test guide' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Updates guide', async () => {
    const id = 1;
    const response = await request(server).put(`/api/guides/${id}`).send({ name: 'Test guide' });
    expect(response.status).toBe(200);
  });

  it('Deletes guide', async () => {
    const id = 1;
    const response = await request(server).delete(`/api/guides/${id}`);
    expect(response.status).toBe(200);
  });

  it('Gets steps', async () => {
    const response = await request(server).get(`/api/steps/${1}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[1]).toHaveProperty('name');
    expect(response.body[2]).toHaveProperty('description');
  })

  it('Adds a step', async () => {
    const response = await request(server).post('/api/steps').send({ name: 'Test step', description: 'Test desc', guideID: 1, parentStepID: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('guideID');
    expect(response.body).toHaveProperty('parentStepID');
  }); 

  it('Updates a step', async () => {
    const id = 1;
    const response = await request(server).put(`/api/steps/${id}`).send({ name: 'Test step', description: 'Test desc'});
    expect(response.status).toBe(200);
  });

  it('Deletes a step', async () => {
    const id = 1;
    const response = await request(server).delete(`/api/steps/${id}`);
    expect(response.status).toBe(200);
  });

  it('Gets step links', async () => {
    const response = await request(server).get(`/api/stepLinks/${1}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('current_step_ID');
    expect(response.body[1]).toHaveProperty('child_step_ID');
    expect(response.body[2]).toHaveProperty('guideID');
  })

  it('Gets the categories guides links', async () => {
    const response = await request(server).get(`/api/categories_tables/`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('categoryID');
    expect(response.body[1]).toHaveProperty('guideID');
  })

  it('Adds a category guide link', async () => {
    const response = await request(server).post('/api/categories_tables').send({ categoryID: 1, guideID: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deletes a category guide link', async () => {
    const id = 1;
    const response = await request(server).delete(`/api/categories_tables/`).query({guideID: 1 });
    expect(response.status).toBe(200);
  });
});

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
    expect(getByText('Add a Resource')).toBeInTheDocument();
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
    const addButton = getByText('Add a Resource');
    fireEvent.click(addButton);
    expect(getByRole('dialog')).toBeInTheDocument();
  });

  it('Closes modal when close button is clicked', async () => {
    const { getByText, getByRole } = render(<EditResources />);
    const addButton = getByText('Add a Resource');
    fireEvent.click(addButton);
    const closeButton = getByRole('button', { name: 'X' });
    fireEvent.click(closeButton);
  });

  it('Calls addResource function when add resource form is submitted', () => {
    const addResourceMock = jest.fn();
    const { getByText, getByRole } = render(<EditResources addResource={addResourceMock} />);
    const addButton = getByText('Add a Resource');
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

    const { getByRole, getByTestId } = render(<EditResources />);
    const resourceButton = await waitFor(() => getByRole('button', { name: 'Resource 1' }));
    fireEvent.click(resourceButton);
    const deleteButton = await waitFor(() => getByTestId('trash'));
    fireEvent.click(deleteButton);
    const deleteButton2 = await waitFor(() => getByRole('button', { name: 'Delete' }));
    fireEvent.click(deleteButton2);
    waitFor(() => expect(deleteResourceMock).toHaveBeenCalledTimes(1));
  });
});

describe('Edit Guide Categories page', () => {
  it('Renders edit guide categories page', () => {
    const { getByText } = render(<EditCategories />);
    expect(getByText('Edit Guide Categories')).toBeInTheDocument();
  });

  it('Renders categories', async () => {
    const resources = [
      { name: 'Cat 1' },
      { name: 'Cat 2' },
      { name: 'Cat 3' },
    ];

    axios.get.mockResolvedValue({ data: resources });

    const { getByText } = render(<EditCategories />);
    await waitFor(() => expect(getByText('Cat 1')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Cat 2')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Cat 3')).toBeInTheDocument());
  });

  it('Opens modal when add category button is clicked', async () => {
    const { getByText, getByRole } = render(<EditCategories />);
    const addButton = getByText('Add a Category');
    fireEvent.click(addButton);
    expect(getByRole('dialog')).toBeInTheDocument();
  });

  it('Closes modal when close button is clicked', async () => {
    const { getByText, getByRole } = render(<EditCategories />);
    const addButton = getByText('Add a Category');
    fireEvent.click(addButton);
    const closeButton = getByRole('button', { name: 'X' });
    fireEvent.click(closeButton);
  });
});

