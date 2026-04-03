const ErrorUtils = (error) => {
  if (!error) return null;

  // Network error
  if (error.request && !error.response) {
    return "Network error occurred. Please check your connection.";
  }

  //  Server response exists
  if (error.response?.data) {
    const data = error.response.data;

    //  Zod validation errors
    if (Array.isArray(data.errors)) {
      return data.errors.map((err) => err.message).join(", ");
    }

    //   API patterns
    if (data.message) {
      return data.message;
    }

    if (data.error) {
      return data.error;
    }

    // ✅ fallback (stringify object safely)
    return JSON.stringify(data);
  }

  // ✅ General JS error
  if (error.message) {
    return error.message;
  }

  return "Something went wrong. Try again.";
};

export default ErrorUtils;