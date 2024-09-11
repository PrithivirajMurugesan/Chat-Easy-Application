export interface Message {
  content?: string;
  timestamp: string;
  type: "sent" | "received";
  userId?: string;
  fileUrl?: string;
  fileName?: string;
  preview?: {
    url: string;
    title: string;
    description: string;
    image: string;
  };
}

export interface User {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  mail_id: string;
  profileimg: string;
}

export interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  fill?: string;
}
