import templateHTML from "../templates/html";
import templateJS from "../templates/js";

// Types
import type { HNStory } from "../types/story";

const templateByType = (
  type: string,
  stories: HNStory[],
  storyType: string
) => {
  if (type === "HTML") {
    return templateHTML({
      stories,
      storyType,
    });
  } else if (type === "JavaScript") {
    return templateJS({
      stories,
      storyType,
    });
  } else {
    return "";
  }
};

export default templateByType;
