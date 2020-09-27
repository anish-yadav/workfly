import React from "react";
import Feather from 'react-native-vector-icons/Feather'
import theme from "./theme";

export const ICON_MAP  = {
    'italic': ({ tintColor }:any) => (
      <Feather style={{ paddingHorizontal: theme.spacing.s}} name="italic" color={tintColor} size={24} />
    ),
    'link': ({ tintColor }:any) => (
      <Feather  style={{ paddingHorizontal: theme.spacing.s}} name="link" color={tintColor} size={24} />
    ),
    'bold': ({ tintColor }:any) => (
      <Feather style={{ paddingHorizontal: theme.spacing.s}} name="bold" color={tintColor} size={24} />
    ),
    'unorderedList': ({ tintColor }:any) => (
      <Feather style={{ paddingHorizontal: theme.spacing.s}} name="list" color={tintColor} size={24} />
    ),
    'image': ({ tintColor }:any) => (
      <Feather style={{ paddingHorizontal: theme.spacing.s}} name="image" color={tintColor} size={24} />
    ),
    
  };


