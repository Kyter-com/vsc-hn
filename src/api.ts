import axios from "axios";

// Types
import type { HNStory } from "./types/story";

const getTopStoriesData = async (): Promise<HNStory[]> => {
  const ids = await axios.get(
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  );
  const promises = [];
  for (let i = 0; i < 30; i += 1) {
    const story = axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${ids.data[i]}.json`
    );
    promises.push(story);
  }
  const data = await Promise.all(promises);
  return data.map((story) => story.data);
};

export { getTopStoriesData };
