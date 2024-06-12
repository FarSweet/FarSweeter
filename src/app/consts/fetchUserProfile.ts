import axios from 'axios'; // Use axios

// Define the NeynarResponse type
type NeynarResponse = {
  [key: string]: {
    pfp_url: string;
    display_name: string;
    username: string;
  }[];
};

// Directly setting the API key for testing purposes
const apiKey = process.env.NEXT_PUBLIC_NEYNAR_API || "";
const url = "https://api.neynar.com/v2/farcaster/user/bulk-by-address";

export async function fetchUserProfile(address: string) {
  const options = {
    headers: {
      accept: "application/json",
      api_key: apiKey,
    },
  };

  console.log("Request options:", options);

  try {
    const response = await axios.get(`${url}?addresses=${address}&viewer_fid=3`, options);
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (response.status === 401) {
      throw new Error("Unauthorized: Invalid API key or insufficient permissions");
    }

    const data: NeynarResponse = response.data as NeynarResponse;
    console.log("Response data:", data);

    // Check if the address key exists and has an array with at least one element
    if (data[address.toLowerCase()] && data[address.toLowerCase()].length > 0) {
      const userProfile = data[address.toLowerCase()][0];
      console.log("User profile found:", userProfile);
      return {
        pfp_url: userProfile.pfp_url,
        display_name: userProfile.display_name,
        username: userProfile.username,
      };
    } else {
      console.error("User profile data not found for address:", address);
      console.error("Data structure received:", data);
      throw new Error("User profile data not found");
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}
