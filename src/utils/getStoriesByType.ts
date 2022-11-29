import {
  getAskStoriesData,
  getNewStoriesData,
  getTopStoriesData,
} from "../api";

const getStoriesByType = async (type: string) => {
  if (type === "Top") {
    return await getTopStoriesData();
  } else if (type === "New") {
    return await getNewStoriesData();
  } else if (type === "Ask") {
    return getAskStoriesData();
  } else {
    // Default to top stories
    return await getTopStoriesData();
  }
};

export default getStoriesByType;
