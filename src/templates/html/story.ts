import { HNStory } from "../../types/story";

const storyHTML = (story: HNStory) => {
  console.log("Story", story);
  return `
  <article>
    <a href="${story.url}">${story.title}</a>
    <p class="hnuser">${story.score} points by ${story.by} at ${new Date(
    story.time
  ).toLocaleString(undefined, {
    timeStyle: "short",
  })}</p>
  </article>`;
};

export default storyHTML;
