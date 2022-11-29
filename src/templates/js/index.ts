import storyJS from "./story";

import type { HNStory } from "../../types/story";

const templateJS = ({
  stories,
  storyType,
}: {
  stories: HNStory[];
  storyType: string;
}) => {
  return `const vscHN = ({ title, url, by, postedAt, numComments, commentsLink }) => {
  const title = "VSC-HN: ${storyType} Stories";
  const lastUpdated = new Date().toLocaleString() // ${new Date().toLocaleString()}
};
${stories
  .map((story) => {
    return storyJS(story);
  })
  .join("")}
`;
};

export default templateJS;
