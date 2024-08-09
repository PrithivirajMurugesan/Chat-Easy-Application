import React, { useState, FormEvent, ChangeEvent, useEffect, useRef } from "react";
import { getLinkPreview } from 'link-preview-js';
import Style from "./index.module.css";
import { formatMessageDate, formatTimestamp } from "../../utils/formateDate";
import Image from "next/image";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useSocket } from "../../utils/socketContext";
import { v4 as uuidv4 } from 'uuid';

interface Message {
  content?: string;
  timestamp: string;
  type: "sent" | "received";
  userId?: string;
  fileUrl?: string;
  fileName?: string;
  preview?: {
    title: string;
    description: string;
    image: string;
  };
}

const Home: React.FC = () => {
  const socket = useSocket();
  const [message, setMessage] = useState<string>("");
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [isSender, setIsSender] = useState<boolean>(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const userId = uuidv4();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (socket) {
      socket.on('message', (data : Message) => {
        console.log('Message received from server:', data);
        const newMessage: Message = {
          ...data,
          type: data.userId === userId ? 'sent' : 'received',
          timestamp: new Date().toISOString(),
        };
        setSentMessages((prevMessages) => [...prevMessages, newMessage])
      });
    }
  }, [socket]);

  const sendMessage = async (e: FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (socket && message.trim()) {
      const messageData : Message = {
        userId, content: message, timestamp: new Date().toISOString(),
        type: "sent"
      };

      console.log(messageData,"messageeeeeeeeeeeee")
      // Check if message contains a URL
      const urlPattern = /https?:\/\/[^\s]+/g;
      const urls = message.match(urlPattern);
      if (urls && urls.length > 0) {
        const preview = await fetchPreview(urls[0]); // Fetch preview for the first URL
        messageData.preview = preview;
        messageData.content = message.replace(urls[0], ''); // Remove URL from message content
      }

      setSentMessages([...sentMessages, { ...messageData, type: 'sent' }]);
      socket.emit('message', messageData);
      setMessage("");
    }
  };

  const fetchPreview = async (url: string) => {
    try {
      const preview = await getLinkPreview(url);
       console.log('Preview object:', preview);
      return {
        title: preview.title || '',
        description: preview.description || '',
        image: preview.images[0] || ''
      };
    } catch (error) {
      console.error('Error fetching link preview:', error);
      return { title: '', description: '', image: '' };
    }
  };

  const sendFileMessage = (selectedFile: File) => {
    const fileUrl = URL.createObjectURL(selectedFile);
    const newMessage: Message = {
      content: "",
      timestamp: new Date().toISOString(),
      type: "sent",
      fileUrl: fileUrl,
      fileName: selectedFile.name,
    };
    setSentMessages([...sentMessages, newMessage]);
    // setIsSender(!isSender); // Toggle the sender state
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setMessage(text);
  };


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      sendFileMessage(selectedFile); // Send the file message when a file is selected
      e.target.value = ""; // Reset file input to allow re-selection of the same file
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput")?.click();
  };

  const shouldShowDate = (messages: Message[], index: number) => {
    if (index === 0) return true;
    const currentDate = new Date(messages[index].timestamp).toDateString();
    const previousDate = new Date(messages[index - 1].timestamp).toDateString();
    return currentDate !== previousDate;
  };

  const isValidImageUrl = (url: string): boolean => {
    const response = new RegExp(
      /\.(jpg|jpeg|png|gif|webp|bmp|tiff|svg)$/i
    ).test(url);
    return response;
  };

  const handleEmojiClick = (emojiObject: EmojiClickData, event: React.MouseEvent) => {

    if (emojiObject && emojiObject.emoji) {
    setMessage(prevInput => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);

     // Ensure the textarea is focused
     if (textareaRef.current) {
      textareaRef.current.focus();
    }
    }
    
  };

  return (
    <div>
      {/* <a href="https://meetings.hubspot.com/vijay-durai" target="_blank">
        <div className={Style.offer_banner}>
          <button className={Style.offer}>
            Beta Offer : Please Click here to claim your free credits worth of
            upto $1000
          </button>
        </div>
      </a> */}
      <div className={Style.main_container}>
        <div className={Style.chat_container}>
          <div className={Style.profile_settings}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="#fff"
              className="size-14 cursor-pointer mt-[15px]"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 28 28"
              fill="#111B21"
              className="size-8 cursor-pointer mt-[5px]"
            >
              <path
                fillRule="evenodd"
                d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM10.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM10.5 18a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className={Style.search}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#111B12"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="text" placeholder="Search" />
          </div>
          <hr />
        </div>
        <div className={Style.message_container}>
          <div className={Style.profile_settings}>
            <div className={Style.profile_left}>
              <div className={Style.message_profile}>
                <div className={Style.back_arrow}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#111B12"
                  className="size-5"
                  style={{marginTop : "6px", marginLeft : "6px"}}
                >
                  <path
                    fillRule="evenodd"
                    d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="#fff"
                  className="size-14 cursor-pointer mt-[-5px]"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className={Style.profile_name}>
                  <p className={Style.user_name}>User Name</p>
                  <span className={Style.seen_details}>
                    last seen at 12.12 pm
                  </span>
                </div>
              </div>
            </div>
            <div className={Style.profile_right}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#111B12"
                className="size-5 cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#111B21"
                className="size-8 cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM10.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM10.5 18a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className={Style.chat_area}>
            <ul className={Style.list_group}>
              {sentMessages.map((msg, index) => (
                <React.Fragment key={index}>
                  {shouldShowDate(sentMessages, index) && (
                    <div className={Style.date_divider}>
                      <span className={Style.message_date}>
                        {formatMessageDate(msg.timestamp)}
                      </span>
                    </div>
                  )}

                  <li
                    className={`${Style.messages} ${
                      msg.type === "sent" ? Style.sent : Style.received
                    }`}
                  >
                    {msg.preview ? (
                  <a
                    href={msg.content} // Assuming URL is in content
                    target="_blank"
                    rel="noopener noreferrer"
                    className={Style.file_link}
                  >
                    <div className={Style.preview_container}>
                      <img
                        src={msg.preview.image}
                        alt="preview"
                        className={Style.preview_image}
                      />
                      <div className={Style.preview_text}>
                        <h3 className={Style.preview_title}>{msg.preview.title}</h3>
                        <p className={Style.preview_description}>{msg.preview.description}</p>
                      </div>
                    </div>
                  </a>
                ) : msg.fileUrl ? (
                      <a
                        href={msg.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={Style.file_link}
                      >
                        <img
                          src={
                            isValidImageUrl(msg?.fileName || "")
                              ? msg.fileUrl
                              : "google-docs.png"
                          }
                          alt="file preview"
                          className={Style.file_preview}
                          style={{
                            width: "250px",
                            height: "200px",
                            marginTop: "10px",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                        <span className="text-[12px]">{msg.fileName}</span>
                      </a>
                    ) : (
                      <div className={Style.message_content}>
                        <span className={Style.content}>{msg.content}</span>
                        <span className={Style.timestamp}>
                          {formatTimestamp(msg.timestamp)}
                        </span>
                      </div>
                    )}
                  </li>
                </React.Fragment>
              )
              )
              }
            </ul>
          </div>
          <div className={Style.form_element}>
            <form onSubmit={sendMessage} className="flex gap-[14px] p-3">
              <button
                className={Style.add_file}
                type="button"
                onClick={triggerFileInput}
              >
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#54656f"
                  className="size-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button 
              className={Style.emoji_stickers}
               type="button" 
               onClick={() => setShowEmojiPicker(prev => !prev)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#54656f"
                  className="size-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {showEmojiPicker && (
          <div className={Style.emoji_picker}>
             <EmojiPicker onEmojiClick={(emojiObject, event) => handleEmojiClick(emojiObject, event as any)} />
          </div>
        )}

<textarea

          value={message}
          ref={textareaRef}
          onChange={handleMessageChange}
          placeholder="Type your message"
          style={{
            padding: "10px",
            width: "60%",
            outline: "none",
            color: "#3b4a54",
            border: "none",
            backgroundColor: "#fff",
            borderRadius: "8px",
            resize: "none", // Optional: prevent resizing
          }}
          rows={1} // Initial number of visible rows
          onKeyDown={(e) => {
            if (e.key === 'Enter'){
              if (!e.shiftKey) {
              e.preventDefault(); // Prevent new line on Enter
              sendMessage(e);// Handle submit or any action

              } 
            }
          }}
        />








              <button type="submit" style={{ padding: "10px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#54656f"
                  className="size-6"
                >
                  {" "}
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />{" "}
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Home;
