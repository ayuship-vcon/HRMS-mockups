// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// test('button is disabled when disabled prop is true', () => {
//   const { getByTestId } = render(<Button label="Click me" disabled={true} />);
//   const buttonElement = getByTestId('button');

//   expect(buttonElement).toBeDisabled();
// });
// jest.mock('axios');

// test('fetches data when button is clicked', async () => {
//   axios.get.mockResolvedValue({ data: 'Mocked data' });

//   const { getByText, getByTestId } = render(<Button label="Click me" />);
//   const buttonElement = getByText('Click me');
//   const dataElement = getByTestId('data');

//   fireEvent.click(buttonElement);

//   await waitFor(() => {
//     expect(dataElement.textContent).toBe('Data: Mocked data');
//   });
// });