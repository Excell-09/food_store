import React from "react";

export default function TagsHome({CheckableTag,selectedTags,handleChange,tags}) {
  return (
    <div className="py-2">
      <span className="font-bold pe-2">Tags: </span>
      {tags.map((tag) => (
        <CheckableTag key={tag} checked={selectedTags.includes(tag)} onChange={(checked) => handleChange(tag, checked)}>
          {tag}
        </CheckableTag>
      ))}
    </div>
  );
}
