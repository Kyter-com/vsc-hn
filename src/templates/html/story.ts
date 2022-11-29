// Types
import type { HNStory } from "../../types/story";

const storyHTML = (story: HNStory) => {
  return `
  <article>
    <a href="${story.url}">${story.title}</a>
    <p class="hnuser">${story.score} points by ${story.by} at ${new Date(
    story.time * 1000
  ).toLocaleTimeString(undefined, {
    timeStyle: "short",
  })}</p>
    <a href="https://news.ycombinator.com/item?id=${story.id}">${
    story.descendants
  } comments</a>
  </article>`;
};

export default storyHTML;
