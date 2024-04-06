// Define a class named ApiError that extends the built-in Error class.
class ApiError extends Error {
  // Define the constructor method for the ApiError class.
  // It takes four parameters: statusCode, message, errors, and statck,
  // with default values provided for message, errors, and statck parameters.
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    statck = ""
  ) {
    // Call the constructor of the Error class with the provided message.
    super(message);
    // Initialize the statusCode property of the ApiError instance with the provided statusCode.
    this.statusCode = statusCode;
    // Initialize the errors property of the ApiError instance with the provided errors,
    // or an empty array if no errors are provided.
    this.errors = errors;
    // Initialize the data property of the ApiError instance as null.
    // It is common to include data in error responses, but it's left as null here.
    this.data = null;
    // Initialize the message property of the ApiError instance with the provided message.
    this.message = message;
    // Initialize the success property of the ApiError instance as false,
    // indicating that this represents an error response.
    this.success = false;

    // Check if a custom stack trace (statck) is provided.
    if (statck) {
      // If provided, set the stack property of the ApiError instance to the custom stack.
      this.stack = statck;
    } else {
      // If not provided, capture the stack trace using Error.captureStackTrace().
      // This is useful for properly logging where the error occurred in the code.
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export the ApiError class, making it accessible to other modules.
export { ApiError };
