/**
 * Error is a component that displays an error message.
 * @param {Object} params - The parameters.
 * @param {JSX.Element} params.children - The children of the component.
 * @returns {JSX.Element} - The error component.
 */
export default function Error({ children }) {
  return <p className="mt-2 text-danger">{children}</p>;
}
