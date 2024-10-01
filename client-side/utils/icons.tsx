import { useState } from "react";
import { IconProps } from "./interface";

export const BackIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#111B12",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className || "size-5"}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
      clipRule="evenodd"
    />
  </svg>
);

export const ProfileIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#fff",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);

export const UserProfileIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656f",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 26"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);

export const NotesProfileIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#111B12",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
      clipRule="evenodd"
    />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#111B12",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    fill={fill}
    className={className}
    onClick={onClick}
    style={style}
  >
    <path
      fillRule="evenodd"
      d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM10.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM10.5 18a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
      clipRule="evenodd"
    />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#111B12",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    onClick={onClick}
    style={style}
  >
    <path
      fillRule="evenodd"
      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656F",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

export const NewGroup: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656F",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
      clipRule="evenodd"
    />
    <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
  </svg>
);

export const StarredMessage: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656F",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
      clipRule="evenodd"
    />
  </svg>
);

export const SelectChats: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656F",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 0 0-.266.112L8.78 21.53A.75.75 0 0 1 7.5 21v-3.955a48.842 48.842 0 0 1-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
      clipRule="evenodd"
    />
  </svg>
);

export const LogOut: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656F",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

export const AddNotes: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656F",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export const SelectedMessages: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656F",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
    <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
  </svg>
);

export const CloseChats: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656F",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
    <path
      fillRule="evenodd"
      d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

export const MuteNotifications: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656F",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.57 16.476c-.223.082-.448.161-.674.238L7.319 4.137A6.75 6.75 0 0 1 18.75 9v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206Z" />
    <path
      fillRule="evenodd"
      d="M5.25 9c0-.184.007-.366.022-.546l10.384 10.384a3.751 3.751 0 0 1-7.396-1.119 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
      clipRule="evenodd"
    />
  </svg>
);

export const DissapearingMessage: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656F",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export const ClearChats: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656F",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
      clipRule="evenodd"
    />
  </svg>
);

export const ExitIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656F",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
      clipRule="evenodd"
    />
  </svg>
);

export const TagsIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#d5ddeb",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
      clipRule="evenodd"
    />
  </svg>
);

export const DeleteChips: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#9ca3af",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
      clipRule="evenodd"
    />
  </svg>
);

export const AddIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#fff",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
      clipRule="evenodd"
    />
  </svg>
);

export const EditIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#111B12",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 26"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
  </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#111B12",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 26"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
      clipRule="evenodd"
    />
  </svg>
);

export const SaveNotes: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#fff",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
      clipRule="evenodd"
    />
  </svg>
);

export const DeleteNotes: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#fff",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

export const FileIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656f",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
      clipRule="evenodd"
    />
  </svg>
);

export const EmojiIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656f",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z"
      clipRule="evenodd"
    />
  </svg>
);

export const SendIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "#54656f",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />{" "}
  </svg>
);

// Svg For Side Nav

export const HomeIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill,
  stroke,
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={fill}
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 15V12.5M8.39166 2.35004L2.61666 6.97504C1.96666 7.4917 1.55 8.58337 1.69166 9.40004L2.8 16.0334C3 17.2167 4.13333 18.175 5.33333 18.175H14.6667C15.8583 18.175 17 17.2084 17.2 16.0334L18.3083 9.40004C18.4417 8.58337 18.025 7.4917 17.3833 6.97504L11.6083 2.35837C10.7167 1.6417 9.275 1.6417 8.39166 2.35004Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CoversationIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill,
  stroke,
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={fill}
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3334 5.20817V9.45817C18.3334 10.5165 17.9834 11.4082 17.3584 12.0248C16.7417 12.6498 15.85 12.9998 14.7917 12.9998V14.5082C14.7917 15.0748 14.1584 15.4165 13.6917 15.0998L12.8834 14.5665C12.9584 14.3082 12.9917 14.0248 12.9917 13.7248V10.3332C12.9917 8.63317 11.8584 7.49984 10.1584 7.49984H4.50002C4.38335 7.49984 4.27502 7.50817 4.16669 7.5165V5.20817C4.16669 3.08317 5.58335 1.6665 7.70835 1.6665H14.7917C16.9167 1.6665 18.3334 3.08317 18.3334 5.20817Z"
        stroke="#48535B"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9917 10.3333V13.725C12.9917 14.025 12.9584 14.3083 12.8834 14.5667C12.575 15.7917 11.5584 16.5583 10.1584 16.5583H7.89169L5.37502 18.2333C5.29066 18.2911 5.19207 18.3246 5.08999 18.3302C4.98791 18.3359 4.88623 18.3134 4.79602 18.2653C4.70582 18.2172 4.63052 18.1453 4.57833 18.0574C4.52615 17.9694 4.49906 17.8689 4.50002 17.7667V16.5583C3.65002 16.5583 2.94169 16.275 2.45002 15.7833C1.95002 15.2833 1.66669 14.575 1.66669 13.725V10.3333C1.66669 8.75 2.65002 7.65833 4.16669 7.51667C4.27502 7.50833 4.38335 7.5 4.50002 7.5H10.1584C11.8584 7.5 12.9917 8.63333 12.9917 10.3333Z"
        stroke="#48535B"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CrmIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill,
  stroke,
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={fill}
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6667 6.66667H15.8334M12.5001 10H15.8334M14.1667 13.3333H15.8334M14.1667 17.5H5.83341C2.50008 17.5 1.66675 16.6667 1.66675 13.3333V6.66667C1.66675 3.33333 2.50008 2.5 5.83341 2.5H14.1667C17.5001 2.5 18.3334 3.33333 18.3334 6.66667V13.3333C18.3334 16.6667 17.5001 17.5 14.1667 17.5Z"
        stroke="#48535B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0001 13.6083C9.94399 13.0233 9.68497 12.4764 9.26793 12.0624C8.85088 11.6484 8.30211 11.3934 7.71675 11.3416C7.29555 11.2999 6.87128 11.2999 6.45008 11.3416C5.8653 11.395 5.3174 11.6505 4.90066 12.0642C4.48392 12.4779 4.2244 13.0239 4.16675 13.6083M7.08341 9.40827C7.48345 9.40827 7.8671 9.24935 8.14997 8.96649C8.43284 8.68362 8.59175 8.29997 8.59175 7.89993C8.59175 7.4999 8.43284 7.11625 8.14997 6.83338C7.8671 6.55052 7.48345 6.3916 7.08341 6.3916C6.68338 6.3916 6.29973 6.55052 6.01686 6.83338C5.73399 7.11625 5.57508 7.4999 5.57508 7.89993C5.57508 8.29997 5.73399 8.68362 6.01686 8.96649C6.29973 9.24935 6.68338 9.40827 7.08341 9.40827Z"
        stroke="#48535B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BroadCastIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill,
  stroke,
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={fill}
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.50008 18.3332H12.5001C15.0001 18.3332 15.8334 17.4998 15.8334 14.9998V4.99984C15.8334 2.49984 15.0001 1.6665 12.5001 1.6665H7.50008C5.00008 1.6665 4.16675 2.49984 4.16675 4.99984V14.9998C4.16675 17.4998 5.00008 18.3332 7.50008 18.3332Z"
        stroke="#48535B"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 15C10.663 15 11.2989 14.7366 11.7678 14.2678C12.2366 13.7989 12.5 13.163 12.5 12.5C12.5 11.837 12.2366 11.2011 11.7678 10.7322C11.2989 10.2634 10.663 10 10 10C9.33696 10 8.70107 10.2634 8.23223 10.7322C7.76339 11.2011 7.5 11.837 7.5 12.5C7.5 13.163 7.76339 13.7989 8.23223 14.2678C8.70107 14.7366 9.33696 15 10 15ZM10 7.5C10.3315 7.5 10.6495 7.3683 10.8839 7.13388C11.1183 6.89946 11.25 6.58152 11.25 6.25C11.25 5.91848 11.1183 5.60054 10.8839 5.36612C10.6495 5.1317 10.3315 5 10 5C9.66848 5 9.35054 5.1317 9.11612 5.36612C8.8817 5.60054 8.75 5.91848 8.75 6.25C8.75 6.58152 8.8817 6.89946 9.11612 7.13388C9.35054 7.3683 9.66848 7.5 10 7.5Z"
        stroke="#48535B"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SequenceIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill,
  stroke,
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={fill}
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.16675 7.49984V13.3332M4.16675 13.3332C4.82979 13.3332 5.46567 13.5966 5.93452 14.0654C6.40336 14.5342 6.66675 15.1701 6.66675 15.8332C6.66675 16.4962 6.40336 17.1321 5.93452 17.6009C5.46567 18.0698 4.82979 18.3332 4.16675 18.3332C3.50371 18.3332 2.86782 18.0698 2.39898 17.6009C1.93014 17.1321 1.66675 16.4962 1.66675 15.8332C1.66675 15.1701 1.93014 14.5342 2.39898 14.0654C2.86782 13.5966 3.50371 13.3332 4.16675 13.3332ZM4.37508 7.08317C5.09338 7.08317 5.78225 6.79783 6.29016 6.28992C6.79807 5.78201 7.08341 5.09313 7.08341 4.37484C7.08341 3.65654 6.79807 2.96767 6.29016 2.45976C5.78225 1.95185 5.09338 1.6665 4.37508 1.6665C3.65679 1.6665 2.96791 1.95185 2.46 2.45976C1.95209 2.96767 1.66675 3.65654 1.66675 4.37484C1.66675 5.09313 1.95209 5.78201 2.46 6.28992C2.96791 6.79783 3.65679 7.08317 4.37508 7.08317ZM15.8334 18.3332C16.4965 18.3332 17.1323 18.0698 17.6012 17.6009C18.07 17.1321 18.3334 16.4962 18.3334 15.8332C18.3334 15.1701 18.07 14.5342 17.6012 14.0654C17.1323 13.5966 16.4965 13.3332 15.8334 13.3332C15.1704 13.3332 14.5345 13.5966 14.0656 14.0654C13.5968 14.5342 13.3334 15.1701 13.3334 15.8332C13.3334 16.4962 13.5968 17.1321 14.0656 17.6009C14.5345 18.0698 15.1704 18.3332 15.8334 18.3332Z"
        stroke="#48535B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.2749 7.5C4.46326 8.22686 4.88818 8.87035 5.48266 9.32904C6.07714 9.78772 6.80737 10.0355 7.55824 10.0333L10.4166 10.025C11.4537 10.022 12.4661 10.3422 13.3129 10.9411C14.1597 11.5399 14.7989 12.3878 15.1416 13.3667"
        stroke="#48535B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FlowIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill,
  stroke,
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={fill}
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.66675 10.9167L3.75008 9.66667C5.03341 8.9 6.63341 8.9 7.91675 9.66667C9.20008 10.4333 10.8001 10.4333 12.0834 9.66667C13.3667 8.9 14.9667 8.9 16.2501 9.66667L18.3334 10.9167M1.66675 3.25L3.75008 4.5C5.03341 5.26667 6.63341 5.26667 7.91675 4.5C9.20008 3.73333 10.8001 3.73333 12.0834 4.5C13.3667 5.26667 14.9667 5.26667 16.2501 4.5L18.3334 3.25M1.66675 16.75L3.75008 15.5C5.03341 14.7333 6.63341 14.7333 7.91675 15.5C9.20008 16.2667 10.8001 16.2667 12.0834 15.5C13.3667 14.7333 14.9667 14.7333 16.2501 15.5L18.3334 16.75"
        stroke="#48535B"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SettingIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill,
  stroke,
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={fill}
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.7501 7.68434C15.2417 7.68434 14.6251 6.61767 15.3751 5.30934C15.8084 4.55101 15.5501 3.58434 14.7917 3.15101L13.3501 2.326C12.6917 1.93434 11.8417 2.16767 11.4501 2.82601L11.3584 2.98434C10.6084 4.29267 9.37508 4.29267 8.61675 2.98434L8.52508 2.82601C8.43525 2.66849 8.31499 2.53041 8.17129 2.41981C8.0276 2.30921 7.86334 2.22829 7.68808 2.18176C7.51282 2.13523 7.33006 2.12402 7.15043 2.14878C6.97079 2.17355 6.79788 2.23379 6.64175 2.326L5.20008 3.15101C4.44175 3.58434 4.18341 4.55934 4.61675 5.31767C5.37508 6.61767 4.75841 7.68434 3.25008 7.68434C2.38341 7.68434 1.66675 8.39267 1.66675 9.26767V10.7343C1.66675 11.601 2.37508 12.3177 3.25008 12.3177C4.75841 12.3177 5.37508 13.3843 4.61675 14.6927C4.18341 15.451 4.44175 16.4177 5.20008 16.851L6.64175 17.676C7.30008 18.0677 8.15008 17.8343 8.54175 17.176L8.63341 17.0177C9.38341 15.7093 10.6167 15.7093 11.3751 17.0177L11.4667 17.176C11.8584 17.8343 12.7084 18.0677 13.3667 17.676L14.8084 16.851C15.5667 16.4177 15.8251 15.4427 15.3917 14.6927C14.6334 13.3843 15.2501 12.3177 16.7584 12.3177C17.6251 12.3177 18.3417 11.6093 18.3417 10.7343V9.26767C18.3374 8.84766 18.168 8.44621 17.8702 8.14998C17.5724 7.85375 17.1701 7.6865 16.7501 7.68434ZM10.0001 12.7093C8.50841 12.7093 7.29175 11.4927 7.29175 10.001C7.29175 8.50934 8.50841 7.29267 10.0001 7.29267C11.4917 7.29267 12.7084 8.50934 12.7084 10.001C12.7084 11.4927 11.4917 12.7093 10.0001 12.7093Z"
        stroke="#48535B"
      />
    </svg>
  );
};

// chats container icons

export const UnassignedIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "none",
}) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill={fill}
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.75739 2.19023L14.1824 4.15523C15.4574 4.71773 15.4574 5.64773 14.1824 6.21023L9.75739 8.17523C9.25489 8.40023 8.42989 8.40023 7.92739 8.17523L3.50239 6.21023C2.22739 5.64773 2.22739 4.71773 3.50239 4.15523L7.92739 2.19023C8.42989 1.96523 9.25489 1.96523 9.75739 2.19023Z"
        stroke="#48535B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.25 8.25C2.25 8.88 2.7225 9.6075 3.3 9.8625L8.3925 12.1275C8.7825 12.3 9.225 12.3 9.6075 12.1275L14.7 9.8625C15.2775 9.6075 15.75 8.88 15.75 8.25"
        stroke="#48535B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.25 12C2.25 12.6975 2.6625 13.3275 3.3 13.6125L8.3925 15.8775C8.7825 16.05 9.225 16.05 9.6075 15.8775L14.7 13.6125C15.3375 13.3275 15.75 12.6975 15.75 12"
        stroke="#48535B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AssignedIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "none",
}) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill={fill}
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.9426 17C15.9426 14.0975 13.0551 11.75 9.50012 11.75C5.94512 11.75 3.05762 14.0975 3.05762 17M9.50012 9.5C10.4947 9.5 11.4485 9.10491 12.1518 8.40165C12.855 7.69839 13.2501 6.74456 13.2501 5.75C13.2501 4.75544 12.855 3.80161 12.1518 3.09835C11.4485 2.39509 10.4947 2 9.50012 2C8.50556 2 7.55173 2.39509 6.84847 3.09835C6.14521 3.80161 5.75012 4.75544 5.75012 5.75C5.75012 6.74456 6.14521 7.69839 6.84847 8.40165C7.55173 9.10491 8.50556 9.5 9.50012 9.5Z"
        stroke="#48535B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const StarredIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "none",
}) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill={fill}
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.7974 3.13248L12.1174 5.77248C12.2974 6.13998 12.7774 6.49248 13.1824 6.55998L15.5749 6.95748C17.1049 7.21248 17.4649 8.32248 16.3624 9.41748L14.5024 11.2775C14.1874 11.5925 14.0149 12.2 14.1124 12.635L14.6449 14.9375C15.0649 16.76 14.0974 17.465 12.4849 16.5125L10.2424 15.185C9.83743 14.945 9.16993 14.945 8.75743 15.185L6.51493 16.5125C4.90993 17.465 3.93493 16.7525 4.35493 14.9375L4.88743 12.635C4.98493 12.2 4.81243 11.5925 4.49743 11.2775L2.63743 9.41748C1.54243 8.32248 1.89493 7.21248 3.42493 6.95748L5.81743 6.55998C6.21493 6.49248 6.69493 6.13998 6.87493 5.77248L8.19493 3.13248C8.91493 1.69998 10.0849 1.69998 10.7974 3.13248Z"
        stroke="#48535B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const OpenIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "none",
}) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill={fill}
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.875 14.75H6.5C3.5 14.75 2 14 2 10.25V6.5C2 3.5 3.5 2 6.5 2H12.5C15.5 2 17 3.5 17 6.5V10.25C17 13.25 15.5 14.75 12.5 14.75H12.125C11.8925 14.75 11.6675 14.8625 11.525 15.05L10.4 16.55C9.905 17.21 9.095 17.21 8.6 16.55L7.475 15.05C7.355 14.885 7.0775 14.75 6.875 14.75Z"
        stroke="#48535B"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4971 8.75H12.5046M9.49634 8.75H9.50384M6.49634 8.75H6.50234"
        stroke="#48535B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ResolvedIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "none",
}) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill={fill}
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_666_347)">
        <path
          d="M17 10V10.25C17 13.25 15.5 14.75 12.5 14.75H12.125C11.8925 14.75 11.6675 14.8625 11.525 15.05L10.4 16.55C9.905 17.21 9.095 17.21 8.6 16.55L7.475 15.05C7.355 14.885 7.0775 14.75 6.875 14.75H6.5C3.5 14.75 2 14 2 10.25V6.5C2 3.5 3.5 2 6.5 2H7"
          stroke="#48535B"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 5C17 5.75 16.79 6.46 16.42 7.06C16.0675 7.65249 15.5667 8.14296 14.967 8.48313C14.3674 8.8233 13.6894 9.00143 13 9C12.3106 9.00143 11.6326 8.8233 11.033 8.48313C10.4333 8.14296 9.93254 7.65249 9.58001 7.06C9.19935 6.44042 8.99853 5.72717 9.00001 5C9.00001 2.79 10.79 1 13 1C15.21 1 17 2.79 17 5Z"
          stroke="#48535B"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.4409 5.00002L12.4309 5.99002L14.5609 4.02002"
          stroke="#48535B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_666_347">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const TimmerIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = "none",
}) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill={fill}
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 6.5V10.25M9.5 17C5.8775 17 2.9375 14.06 2.9375 10.4375C2.9375 6.815 5.8775 3.875 9.5 3.875C13.1225 3.875 16.0625 6.815 16.0625 10.4375"
        stroke="#48535B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.25 2H11.75M11.675 14.375V13.505C11.675 12.4325 12.44 11.99 13.37 12.53L14.12 12.965L14.87 13.4C15.8 13.94 15.8 14.8175 14.87 15.3575L14.12 15.7925L13.37 16.2275C12.44 16.7675 11.675 16.325 11.675 15.2525V14.375Z"
        stroke="#48535B"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BookmarkedIcon: React.FC<IconProps> = ({
  className,
  style,
  onClick,
  fill = 'none',
  stroke = '#48535B',
}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={fill}
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_353_3002)">
        <path
          d="M9.15327 2.34001L10.3266 4.68668C10.4866 5.01334 10.9133 5.32668 11.2733 5.38668L13.3999 5.74001C14.7599 5.96668 15.0799 6.95334 14.0999 7.92668L12.4466 9.58001C12.1666 9.86001 12.0133 10.4 12.0999 10.7867L12.5733 12.8333C12.9466 14.4533 12.0866 15.08 10.6533 14.2333L8.65994 13.0533C8.29994 12.84 7.70661 12.84 7.33994 13.0533L5.34661 14.2333C3.91994 15.08 3.05327 14.4467 3.42661 12.8333L3.89994 10.7867C3.98661 10.4 3.83327 9.86001 3.55327 9.58001L1.89994 7.92668C0.926606 6.95334 1.23994 5.96668 2.59994 5.74001L4.72661 5.38668C5.07994 5.32668 5.50661 5.01334 5.66661 4.68668L6.83994 2.34001C7.47994 1.06668 8.51994 1.06668 9.15327 2.34001Z"
          stroke={stroke}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_353_3002">
          <rect width="16" height="16" fill="red" />
        </clipPath>
      </defs>
    </svg>
  );
};
