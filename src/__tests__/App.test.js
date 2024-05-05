import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this line to extend Jest expect functionality
import App from './App';

describe('App component', () => {
  test('renders the heading "Place an Order"', () => {
    render(<App />);
    const heading = screen.getByText('Place an Order');
    expect(heading).toBeInTheDocument();
  });

  test('initially displays the default pizza size as "small" and no pepperoni checked', () => {
    render(<App />);
    const pizzaSelection = screen.getByText('Your selection: small cheese');
    expect(pizzaSelection).toBeInTheDocument();
    const pepperoniCheckbox = screen.getByLabelText('Add pepperoni');
    expect(pepperoniCheckbox).not.toBeChecked();
  });

  test('updates pizza size and pepperoni selection upon user interaction', () => {
    render(<App />);
    const sizeSelect = screen.getByLabelText('Select size:');
    fireEvent.change(sizeSelect, { target: { value: 'medium' } });
    expect(sizeSelect.value).toBe('medium');
    const pepperoniCheckbox = screen.getByLabelText('Add pepperoni');
    fireEvent.click(pepperoniCheckbox);
    expect(pepperoniCheckbox).toBeChecked();
    const pizzaSelection = screen.getByText('Your selection: medium pepperoni');
    expect(pizzaSelection).toBeInTheDocument();
  });

  test('updates contact info upon user input', () => {
    render(<App />);
    const emailInput = screen.getByPlaceholderText('email address');
    fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
    expect(emailInput.value).toBe('example@example.com');
  });

  test('submits order and displays confirmation message upon form submission', () => {
    render(<App />);
    const submitButton = screen.getByText('Submit Order');
    fireEvent.click(submitButton);
    const confirmationMessage = screen.getByText('Thanks for your order!');
    expect(confirmationMessage).toBeInTheDocument();
  });
});
