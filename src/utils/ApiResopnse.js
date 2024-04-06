// Define a class named ApiResponse.
class ApiResponse {
  // Define the constructor method for the ApiResponse class.
  // It takes three parameters: statusCode, data, and message,
  // with a default value of "Success" for the message parameter.
  constructor(statusCode, data, message = "Success") {
    // Initialize the statusCode property of the ApiResponse instance with the provided statusCode.
    this.statusCode = statusCode;
    // Initialize the data property of the ApiResponse instance with the provided data.
    this.data = data;
    // Initialize the message property of the ApiResponse instance with the provided message,
    // or with the default value of "Success" if no message is provided.
    this.message = message;
    // Initialize the success property of the ApiResponse instance.
    // It is set to true if the statusCode is less than 400, indicating a successful response,
    // and false otherwise.
    this.success = statusCode < 400;
  }
}

// Export the ApiResponse class, making it accessible to other modules.
export { ApiResponse };
