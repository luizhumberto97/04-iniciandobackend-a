class AppError {
  public readonly message: string;

  public readonly statusCode: number; // 401, 404

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

// Vamos utilizar eles nos services e no middleware
export default AppError;
