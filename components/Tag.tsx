import React from "react";
import Link from "next/link";

import { Chip } from "@material-ui/core";

const Tag = ({ tag }) => {
  return (
    <Link href={`/video/[tag]`} as={`/video/${tag}`}>
      <Chip
        style={{
          marginRight: "0.5rem",
        }}
        color="primary"
        label={tag}
        clickable={true}
      />
    </Link>
  );
};

export default Tag;
