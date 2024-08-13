import React, { useState, FormEvent, ChangeEvent, useEffect, useRef, } from "react";
import { getLinkPreview } from "link-preview-js";
import Style from "./index.module.css";
import { formatMessageDate, formatTimestamp } from "../../utils/formateDate";
import Image from "next/image";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useSocket } from "../../utils/socketContext";
import { v4 as uuidv4 } from "uuid";

interface Message {
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

const Home: React.FC = () => {
  const socket = useSocket(); // socket.io
  const [message, setMessage] = useState<string>(""); // messages
  const [sentMessages, setSentMessages] = useState<Message[]>([]); // sending messages
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false); // emoji showing
  const userId = uuidv4(); // set uniquie userId
  const textareaRef = useRef<HTMLTextAreaElement>(null); // texarea refference
  const [isDivVisible, setIsDivVisible] = useState(false); // Left profile div visible
  const [isHovered, setIsHovered] = useState(false); // left profile settings icon hovered
  const mainDivRef = useRef<HTMLDivElement>(null); // left profile settings main div showing
  const messagesEndRef = useRef<HTMLDivElement>(null); // messages show bottom
  const [isPopupOpen, setPopupOpen] = useState(false); // grouping popup opened
  const [showSuggestions, setShowSuggestions] = useState(false); // show suggestions to action
  const [suggestions, setSuggestions] = useState([""]); // sets suggestions for the action
  const [triggerSymbol, setTriggerSymbol] = useState(""); // suggestions symbol triggering

  // Store the messages from the socket.io server starts

  useEffect(() => {
    if (socket) {
      socket.on("message", (data: Message) => {
        console.log("Message received from server:", data);
        const newMessage: Message = {
          ...data,
          type: data.userId === userId ? "sent" : "received",
          timestamp: new Date().toISOString(),
        };
        setSentMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [socket]);

  // Store the messages from the socket.io server ends

  // Message sending and recieving from the client starts

  const sendMessage = async (e: FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (socket && message.trim()) {
      const messageData: Message = {
        userId,
        content: message,
        timestamp: new Date().toISOString(),
        type: "sent",
      };
      // Check if message contains a URL
      const urlPattern = /https?:\/\/[^\s]+/g;
      const urls = message.match(urlPattern);
      if (urls && urls.length > 0) {
        const preview = await fetchPreview(urls[0]); // Fetch preview for the first URL
        messageData.preview = {
          url: preview.url || urls[0], // Use the fetched url or the original if missing
          title: preview.title,
          description: preview.description || "",
          image: preview.image,
        };
        messageData.content = message.replace(urls[0], ""); // Remove URL from message content
      }
      setSentMessages([...sentMessages, { ...messageData, type: "sent" }]);
      socket.emit("message", messageData);
      setMessage("");
    }
  };

  // Message sending and recieving from the client ends

  // Fetch the meta data's from the url using getLinkPreview starts

  const fetchPreview = async (url: string) => {
    try {
      const preview = await getLinkPreview(url);

      // Check if the preview object has the properties you need
      const hasTitle = "title" in preview;
      const hasDescription = "description" in preview;
      const hasImages = "images" in preview && Array.isArray(preview.images);

      const previewURL = preview.url;
      console.log("Preview object:", preview, preview.url);
      return {
        url: previewURL || "",
        title: hasTitle ? preview.title : "",
        description: hasDescription ? preview.description : "",
        image: hasImages && preview.images.length > 0 ? preview.images[0] : "",
      };
    } catch (error) {
      console.error("Error fetching link preview:", error);
      return { title: "", description: "", image: "" };
    }
  };

  // Fetch the meta data's from the url using getLinkPreview ends

  // Shows the messages at last without mannual scrolling starts

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sentMessages]);

  // Shows the messages at last without mannual scrolling ends

  // Sends the Files from the local machine starts

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

  // Sends the Files from the local machine ends

  // Sets the input field element from the changes starts

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setMessage(text);

    const lastChar = text.slice(-1);
    if (lastChar === "/" || lastChar === "@") {
      setTriggerSymbol(lastChar);
      // Trigger action based on symbol
      setShowSuggestions(true);
      if (lastChar === "/") {
        setSuggestions(["/command1", "/command2"]);
      } else if (lastChar === "@") {
        setSuggestions(["@user1", "@user2"]);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  // Sets the input field element from the changes ends

  // Sets the suggestion for typing symbols starts

  const handleSuggestionClick = (suggestion: any) => {
    const lastIndex = message.lastIndexOf(triggerSymbol);
    const newMessage = message.slice(0, lastIndex) + suggestion;
    setMessage(newMessage);
    setShowSuggestions(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Sets the suggestion for typing symbols ends

  // Show the day of the messages starts

  const shouldShowDate = (messages: Message[], index: number) => {
    if (index === 0) return true;
    const currentDate = new Date(messages[index].timestamp).toDateString();
    const previousDate = new Date(messages[index - 1].timestamp).toDateString();
    return currentDate !== previousDate;
  };

  // Show the day of the messages ends

  // Check the image exe using REGX starts

  const isValidImageUrl = (url: string): boolean => {
    const response = new RegExp(
      /\.(jpg|jpeg|png|gif|webp|bmp|tiff|svg)$/i
    ).test(url);
    return response;
  };

  // Check the image exe using REGX ends

  // Choose Emoji picker starts

  const handleEmojiClick = (
    emojiObject: EmojiClickData,
    event: React.MouseEvent
  ) => {
    if (emojiObject && emojiObject.emoji) {
      setMessage((prevInput) => prevInput + emojiObject.emoji);
      setShowEmojiPicker(false);

      // Ensure the textarea is focused
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  // Choose Emoji picker ends

  // Toogle the clicking more options starts

  const toggleDivVisibility = () => {
    setIsDivVisible((prev) => !prev);
    setIsHovered((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mainDivRef.current &&
      !mainDivRef.current.contains(event.target as Node)
    ) {
      setIsDivVisible(false);
      setIsHovered(false);
    }
  };

  useEffect(() => {
    if (isDivVisible) {
      // Add event listener to document
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener from document
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDivVisible]);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setIsDivVisible(false);
    setIsHovered(false);
  };

  // Toogle the clicking more options ends

  return (
    <div>
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
              viewBox="0 0 30 30"
              fill="#111B21"
              className={`size-10 cursor-pointer mt-[5px] ${
                isHovered ? "bg-[#fff] rounded-[50px] pt-[6px] pl-[6px]" : ""
              }`}
              onClick={toggleDivVisibility}
            >
              <path
                fillRule="evenodd"
                d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM10.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM10.5 18a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                clipRule="evenodd"
              />
            </svg>
            {isDivVisible && (
              <div ref={mainDivRef} className={Style.main_div}>
                <div className={Style.inner_div}>
                  {isPopupOpen && (
                    <div className={Style.popup_overlay}>
                      <div className={Style.popup_close}>
                        <button onClick={handleClosePopup}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-7"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <p>Add group members</p>
                      </div>
                      <div className={Style.popup_search}>
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
                        <input
                          type="text"
                          placeholder="Search name or number"
                        />
                      </div>
                      <hr />
                      <div
                        className={Style.popup_content}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Your popup content goes here */}
                        <h1>No Contacts found</h1>
                      </div>
                    </div>
                  )}
                  <ul className="flex flex-col mt-1 mb-1">
                    <li
                      className="text-[#111B12] flex gap-3 cursor-pointer"
                      onClick={handleOpenPopup}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                          clipRule="evenodd"
                        />
                        <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                      </svg>
                      New Group
                    </li>

                    <li className="text-[#111B12] flex gap-3 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Starred messages
                    </li>

                    <li className="text-[#111B12] flex gap-3 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 0 0-.266.112L8.78 21.53A.75.75 0 0 1 7.5 21v-3.955a48.842 48.842 0 0 1-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Select chats
                    </li>

                    <li className="text-[#111B12] flex gap-3 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Log out
                    </li>
                  </ul>
                </div>
              </div>
            )}
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
                    style={{ marginTop: "6px", marginLeft: "6px" }}
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
              {sentMessages.map((msg: any, index: any) => (
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
                        href={msg.preview.url} // Assuming URL is in content
                        target="_self"
                        rel="noopener noreferrer"
                        className={Style.file_link}
                      >
                        <div className={Style.preview_container}>
                          <div>
                            <a
                              href={msg.preview.url}
                              className={Style.previewURL}
                            >
                              {msg.preview.url}
                            </a>
                          </div>
                          <img
                            src={msg.preview.image}
                            alt="preview"
                            className={Style.preview_image}
                          />
                          <div className={Style.preview_text}>
                            <h3 className={Style.preview_title}>
                              {msg.preview.title}
                            </h3>
                            <p className={Style.preview_description}>
                              {msg.preview.description}
                            </p>
                            <span className={Style.timestamp}>
                              {formatTimestamp(msg.timestamp)}
                            </span>
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
                        <span className={Style.timestamp}>
                          {formatTimestamp(msg.timestamp)}
                        </span>
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
              ))}
              <div ref={messagesEndRef} />
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
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              >
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
                  <EmojiPicker
                    onEmojiClick={(emojiObject, event) =>
                      handleEmojiClick(emojiObject, event as any)
                    }
                  />
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
                  if (e.key === "Enter") {
                    if (!e.shiftKey) {
                      e.preventDefault(); // Prevent new line on Enter
                      sendMessage(e); // Handle submit or any action
                    }
                  }
                }}
              />
              {showSuggestions && (
                <ul
                  style={{
                    position: "absolute",
                    top: "-70px",
                    left: "0",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: "60%",
                    marginTop: "5px",
                    zIndex: 1000,
                    color: "#111B12",
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      style={{
                        padding: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
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
