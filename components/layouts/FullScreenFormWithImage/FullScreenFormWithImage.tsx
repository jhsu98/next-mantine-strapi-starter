import React, { ReactNode } from "react";
import { Paper } from "@mantine/core";
import classes from "./FullScreenFormWithImage.module.css";

interface FullScreenFormWithImageProps {
  children?: ReactNode;
  content?: ReactNode;
}

export function FullScreenFormWithImage({
  children,
  content,
}: FullScreenFormWithImageProps) {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30} my="auto">
        {children || content}
      </Paper>
    </div>
  );
}
