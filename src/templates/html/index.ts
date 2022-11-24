import storyHTML from "./story";

import type { HNStory } from "../../types/story";

const templateHTML = ({ stories }: { stories: HNStory[] }) => {
  console.log(stories);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VSC-HN - Top Stories</title>
</head>
<body>${stories
    .map((story) => {
      return storyHTML(story);
    })
    .join("")}
</body>
</html>`;
};

export default templateHTML;
