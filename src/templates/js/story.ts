// Types
import type { HNStory } from "../../types/story";

const storyJS = (story: HNStory) => {
  return `
vscHN({
  title: "${story.title}",
  url: "${story.url}",
  by: "${story.by}",
  postedAt: "${new Date(story.time * 1000).toLocaleTimeString(undefined, {
    timeStyle: "short",
  })}",
  numComments: ${story.descendants},
  commentsLink: "https://news.ycombinator.com/item?id=${story.id}"
});
`;
};

export default storyJS;
