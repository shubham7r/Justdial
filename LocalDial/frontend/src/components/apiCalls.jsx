import axios from "axios";
import { API_PROUDCT_URL, LOGIN_URL, REGISTER_URL, RESET_PASSWORD_URL,API_URL,API_PROUDCTID_URL } from "../endPoint";

// Axios instance with timeout and default headers
const axiosInstance = axios.create({
  timeout: 5000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Register User API Call
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(REGISTER_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};

// Login User API Call
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post(LOGIN_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};

// Reset Password API Call
export const resetPassword = async (resetData) => {
  try {
    const response = await axiosInstance.post(RESET_PASSWORD_URL, resetData);
    return response.data;
  } catch (error) {
    console.error("Error during password reset:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Password reset failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};

//API Call for the services(post)
export const addServices = async(formData) =>{
  try {
    const response = await axiosInstance.post(API_PROUDCT_URL, formData);
    return response.data;
  } catch (error) {
    console.error("Error during service uploding:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "service upload failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};

//API Call for the services(get )
export const fetchServices = async () => {
  try {
    const response = await axiosInstance.get(API_PROUDCT_URL); // Use variable, not string
    console.log("API Response:", response.data);
    return response.data.businesses || response.data; // Adjust based on API response
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch services");
  }
};
//image uploading
export const handleFileUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post(API_IMAGE_UPLOAD_URL, formData);
    console.log("Uploaded file URL:", response.data.url);
    return response.data.url; // Use this URL to display the image or save in the database
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("File upload failed");
  }
};

// API Call for fetching a single business by ID
export const getBusinessById = async (id) => {
  try {
    const response = await axiosInstance.get(API_PROUDCTID_URL,id);
    return response.data.business; // Return the business object from the response
  } catch (error) {
    console.error("Error fetching business details:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch business details");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};

export const fetchBusinessDetails = async () => {
  try {
    const data = await getBusinessById(id);
    console.log("API Response:", data); // Log the response
    setBusinessDetails(data);
  } catch (err) {
    setError("Error fetching business details");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

export const fetchGeminiResponse = async (prompt) => {
  try {
      const response = await axios.post("http://localhost:4000/api/gemini", { prompt });

      // Log full API response
      console.log("Full API Response:", response.data);

      // Ensure candidates exist before accessing [0]
      if (!response.data.candidates || response.data.candidates.length === 0) {
          console.error("No candidates found in API response");
          return "Error: No response from Gemini";
      }

      return response.data.candidates[0].output; // Access safely
  } catch (error) {
      console.error("Error fetching Gemini response:", error.response?.data || error.message);
      return "Error: Unable to get response";
  }
};



axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

