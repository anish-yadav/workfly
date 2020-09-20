import { formatDistanceToNow, isThisSecond } from "date-fns";
/* eslint-disable max-len */
import React, { Component, PureComponent } from "react";
import { Task } from "src/generated/graphql";
import { Box, Text } from "../../components";

export interface TabModel {
  name: string;
  anchor: number;
}

interface TaskCardProp {
  title: string;
  description: string;
  createdAt: string;
  id: number;
}

export class TaskCard extends Component<TaskCardProp> {
  
  render() {
    const { id, description, createdAt } = this.props;



    return (
      <Box
        height={150}
        maxHeight={150}
        padding="l"
        marginVertical="m"
        borderRadius={20}
        backgroundColor="greyCard"
      >
        <Text variant="header1">{id}</Text>
        <Text variant="body">
          {description
            .substr(0, 100)
            .replace(/<[^>]*>?/gm, " ")
            .replace("&nbsp", " ")}
        </Text>
        <Text variant="body1">
          {formatDistanceToNow(new Date(parseInt(createdAt)))} ago
        </Text>
      </Box>
    );
  }
}
