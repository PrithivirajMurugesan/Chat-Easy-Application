import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
  useRef,
} from "react";
import Header from "@/components/header/header";
import { getLinkPreview } from "link-preview-js";
import Style from "./index.module.css";
import { formatMessageDate, formatTimestamp } from "../../../utils/formateDate";
import { User, Message } from "../../../utils/interface";
import Image from "next/image";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useSocket } from "../../../utils/socketContext";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import Circular24HourTimer from "@/components/timmer/timmer";
import {
  AddIcon,
  AddNotes,
  AssignedIcon,
  BackIcon,
  BookmarkedIcon,
  ClearChats,
  CloseChats,
  CloseIcon,
  DeleteChips,
  DeleteIcon,
  DeleteNotes,
  DissapearingMessage,
  EditIcon,
  EmojiIcon,
  ExitIcon,
  FileIcon,
  LogOut,
  MuteNotifications,
  NewGroup,
  NotesProfileIcon,
  OpenIcon,
  ProfileIcon,
  ResolvedIcon,
  SaveNotes,
  SearchIcon,
  SelectChats,
  SelectedMessages,
  SendIcon,
  SettingsIcon,
  StarredIcon,
  StarredMessage,
  TagsIcon,
  TimmerIcon,
  UnassignedIcon,
  UserProfileIcon,
} from "../../../utils/icons";
import SideNav from "@/components/side-nav/sidenav";

const Home: React.FC = () => {
  const socket = useSocket(); // socket.io
  const [message, setMessage] = useState<string>(""); // messages

  const [sentMessages, setSentMessages] = useState<Record<string, Message[]>>(
    {}
  ); // sending messages

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false); // emoji showing
  const userId = uuidv4() + ""; // set uniquie userId
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Notes texarea refference
  const mainTextAreaRef = useRef<HTMLTextAreaElement>(null); // main text area refference
  const [isDivVisible, setIsDivVisible] = useState(false); // Left profile div visible
  const [isHovered, setIsHovered] = useState(false); // left profile settings icon hovered
  const mainDivRef = useRef<HTMLDivElement>(null); // left profile settings main div showing
  const messagesEndRef = useRef<HTMLDivElement>(null); // messages show bottom
  const [isPopupOpen, setPopupOpen] = useState(false); // grouping popup opened
  const [showSuggestions, setShowSuggestions] = useState(false); // show suggestions to action
  const [suggestions, setSuggestions] = useState([""]); // sets suggestions for the action
  const [triggerSymbol, setTriggerSymbol] = useState(""); // suggestions symbol triggering

  const [isDivSettings, setIsDivSettings] = useState(false); // right profile div visible
  const [isRightHovered, setIsRightHovered] = useState(false); // right profile settings icon hovered
  const [isRightPopupOpen, setRightPopupOpen] = useState(false); // grouping right popup opened
  const mainRightDivRef = useRef<HTMLDivElement>(null); // right profile settings main div showing

  const [selectedUser, setSelectedUser] = useState<User | null>(null); // selecting user from the array
  const [selectedUserId, setSelectedUserId] = useState(null); // set users id for selectedUser

  const [isMobile, setIsMobile] = useState(false); // state to manage mobile view
  const [isFocused, setIsFocused] = useState(false);

  const [inputValue, setInputValue] = useState<string>("");
  const [userTags, setUserTags] = useState<{ [key: string]: string[] }>({});

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "" && selectedUser) {
      setUserTags((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), inputValue],
      }));
      setInputValue("");
    }
  };

  const handleDelete = (index: number) => {
    if (selectedUser) {
      setUserTags((prev) => ({
        ...prev,
        [selectedUser.id]: prev[selectedUser.id].filter((_, i) => i !== index),
      }));
    }
  };

  // tags input focus in starts
  const handleFocus = () => {
    setIsFocused(true);
  };
  // tags input focus in ends

  // tags input focus out starts
  const handleBlur = () => {
    setIsFocused(false);
  };
  // tags input focus out ends

  // managing mobile view starts
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize(); // Set initial value

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // managing mobile view ends

  // handling user click starts

  const handleUserClick = (user: any) => {
    setSelectedUserId(user.id);
    setSelectedUser(user); // Load user-specific messages here if needed
    setFilteredUsers(users);
    setSearchTerm("");

    // Get the div by ID and set display to none
    const isMobile = window.innerWidth <= 480;
    const userDiv = document.getElementById("chatContainer");
    const messageContainerDiv = document.getElementById("messageContainer");
    const notesSection = document.getElementById("notesSection");

    if (userDiv && isMobile) {
      userDiv.style.display = "none";
      if (messageContainerDiv) {
        messageContainerDiv.style.display = "block";
      }
      if (notesSection) {
        notesSection.style.display = "none";
      }
    }
  };

  // handling user click starts

  // Message sending and recieving from the client starts

  const sendMessage = async (e: FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (socket && message.trim() && selectedUser) {
      const messageData: Message = {
        userId: selectedUser.id + "",
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

      // Update messages state with the new message for the selected user

      setSentMessages((prevMessages) => ({
        ...{
          ...prevMessages,
          ...{
            [selectedUser.id]: [
              ...(prevMessages[selectedUser.id] || []),
              messageData,
            ],
          },
        },
      }));

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

    // Update messages state with the new message for the selected user
    setSentMessages((prevMessages) => ({
      ...prevMessages,
      [selectedUser?.id as any]: [
        ...(prevMessages[selectedUser?.id as any] || []),
        newMessage,
      ],
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      sendFileMessage(selectedFile); // Send the file message when a file is selected
      e.target.value = ""; // Reset file input to allow re-selection of the same file
    }
    if (mainTextAreaRef.current) {
      mainTextAreaRef.current.focus();
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
    if (mainTextAreaRef.current) {
      mainTextAreaRef.current.focus();
    }
  };

  // Sets the suggestion for typing symbols ends

  // Show the day of the messages starts

  const shouldShowDate = (messages: Message[], index: number) => {
    if (!messages[index]) return false;

    // If it's the first message, show the date
    if (index === 0) return true;

    const currentDate = new Date(messages[index].timestamp).toDateString();
    const previousDate = new Date(messages[index - 1].timestamp).toDateString();

    // Show the date if the current message's date is different from the previous message's date
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
      if (mainTextAreaRef.current) {
        mainTextAreaRef.current.focus();
      }
    }
  };

  // Choose Emoji picker ends

  // Users Contact Array Starts
  const users = [
    {
      id: 1,
      name: "Dwight Mitchel",
      lastMessage: "last messages",
      time: "2.27 PM",
      mail_id: "one@gmail.com",
      profileimg: "assets/userone.png",
    },
    {
      id: 2,
      name: "John Kennedy",
      lastMessage: "last messages",
      time: "3.15 PM",
      mail_id: "two@gmail.com",
      profileimg: "assets/usertwo.png",
    },
    {
      id: 3,
      name: "Henri Berquel",
      lastMessage: "last messages",
      time: "4.05 PM",
      mail_id: "three@gmail.com",
      profileimg: "assets/userthree.png",
    },
    {
      id: 4,
      name: "+91 55426 79465",
      lastMessage: "last messages",
      time: "5.11 PM",
      mail_id: "four@gmail.com",
      profileimg: "assets/userfour.png",
    },
    {
      id: 5,
      name: "Michael Johnson",
      lastMessage: "last messages",
      time: "7.27 AM",
      mail_id: "five@gmail.com",
      profileimg: "assets/userfive.png",
    },
    {
      id: 6,
      name: "Emily Carter",
      lastMessage: "last messages",
      time: "9.15 AM",
      mail_id: "six@gmail.com",
      profileimg: "assets/usersix.png",
    },
    {
      id: 7,
      name: "+91 55426 79465",
      lastMessage: "last messages",
      time: "12.01 PM",
      mail_id: "seven@gmail.com",
      profileimg: "assets/userseven.png",
    },
    // Add more users as needed
  ];

  // Users Contact Array Ends

  // Toogle the clicking more options on left starts

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

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setIsDivVisible(false);
    setIsHovered(false);
  };

  // Toogle the clicking more options on left ends

  // Toogle the clicking more options on right starts

  const toggleRightDivVisibility = () => {
    setIsDivSettings((prev) => !prev);
    setIsRightHovered((prev) => !prev);
  };

  const handleClickOutsideRight = (event: MouseEvent) => {
    if (
      mainRightDivRef.current &&
      !mainRightDivRef.current.contains(event.target as Node)
    ) {
      setIsDivSettings(false);
      setIsRightHovered(false);
    }
  };

  useEffect(() => {
    if (isDivSettings) {
      // Add event listener to document
      document.addEventListener("mousedown", handleClickOutsideRight);
    } else {
      // Remove event listener from document
      document.removeEventListener("mousedown", handleClickOutsideRight);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideRight);
    };
  }, [isDivSettings]);

  const handleRightClosePopup = () => {
    setRightPopupOpen(false);
    setIsDivSettings(false);
    setIsRightHovered(false);
  };

  // Toogle the clicking more options on right ends

  // Filtered the users lists starts

  // const [selectedOption, setSelectedOption] = useState(''); // Default value
  // const [inputValues, setInputValues] = useState(''); // For the input text

  // const handleSelectChange = (e : any) => {
  //   setSelectedOption(e.target.value);
  // };

  // const handleInputChanges = (e : any) => {
  //   setInputValues(e.target.value);
  // };

  // const handleClear = () => {
  //   setInputValues('');
  //   setSelectedOption("");
  // };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);

    // Filter users based on search term
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Filtered the users lists ends

  // Messages received from the server starts

  useEffect(() => {
    if (socket) {
      // Handle incoming messages
      socket.on("message", (data: Message) => {
        console.log("Message received from server:", data);
        const newMessage: Message = {
          ...data,
          type: data.userId === userId ? "sent" : "received",
          timestamp: new Date().toISOString(),
        };

        // Update messages state with the received message for the corresponding user
        setSentMessages((prevMessages) => {
          console.log(data);
          const dataa: any = {
            ...prevMessages,
            [data.userId as any]: [
              ...(prevMessages[data.userId as any] || []),
              newMessage,
            ],
          };
          return dataa;
        });
      });

      // Cleanup socket listeners
      return () => {
        if (socket) {
          socket.off("message");
        }
      };
    }
  }, [socket]);

  // Messages received from the server ends

  // when selecting the user to focus textarea starts

  useEffect(() => {
    if (selectedUser) {
      mainTextAreaRef.current?.focus(); // Focus the textarea when a user is selected
    }
    if (selectedUser && isMobile) {
      const backToChatsSection = document.querySelector(
        ".p-splitter-horizontal"
      );
      (backToChatsSection as HTMLElement).style.display = "flex";
      mainTextAreaRef.current?.focus(); // Focus the textarea when a user is selected
    }
  }, [selectedUser]);

  // when selecting the user to focus textarea starts

  // scroll the last messages to bottom starts

  useEffect(() => {
    // Scroll to the latest message when sentMessages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sentMessages]);

  // scroll the last messages to bottom ends

  // if the isdivvisible it will manage the closing state starts

  useEffect(() => {
    if (isDivVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function for event listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDivVisible]);

  // if the isdivvisible it will manage the closing state ends

  // Back to Home page starts and Close Chats starts
  const router = useRouter();

  const backToHomePage = () => {
    const isMobile = window.innerWidth <= 480;
    const userDiv1 = document.getElementById("messageContainer");
    const userDiv = document.getElementById("chatContainer");
    const backToChatsSection = document.querySelector(".p-splitter-horizontal");

    if (isMobile && backToChatsSection) {
      (backToChatsSection as HTMLElement).style.display = "none";
    }

    if (userDiv1 && isMobile) {
      userDiv1.style.display = "none";
      if (userDiv) {
        userDiv.style.display = "block";
      }
    }
  };

  const mainBackToHomePage = () => {
    router.push("/home"); // Navigate to the Home page
  };

  const logOutToHome = () => {
    router.push("/home"); // Navigate to the Home page
  };

  const backToChats = () => {
    // setSelectedUser(null);
    // setMessage('');
    // setRightPopupOpen(false);
    // setIsDivSettings(false);
    // setIsRightHovered(false);
    router.push("/home"); // Navigate to the Home page
  };

  // Back to Home page starts and Close Chats starts

  // Side Bar Scripts Starts

  // Toogle the notesarea starts

  const toogleNotesArea = () => {
    const textArea = document.getElementById("notesTextarea");
    const saveDeleteBtn = document.getElementById("saveDelete");
    if (textArea && saveDeleteBtn) {
      textArea.style.display = "block";
      saveDeleteBtn.style.display = "flex";
    }
    textareaRef.current?.focus();
  };

  // Toogle the notesarea ends

  // Toogle the deletenotesarea starts

  const deleteNotesArea = () => {
    const textArea = document.getElementById(
      "notesTextarea"
    ) as HTMLTextAreaElement;
    const textAreaValue = document.getElementById(
      "textareaNotes"
    ) as HTMLTextAreaElement;

    const saveDeleteBtn = document.getElementById("saveDelete");
    const deleteNotes = document.getElementById("deleteNotes");

    if (textArea && saveDeleteBtn && deleteNotes) {
      textArea.style.display = "none";
      saveDeleteBtn.style.display = "none";
    }
    textAreaValue.value = "";
    setNoteValue("");
    setHasInput(false); // Reset the shadow state
  };

  // Toogle the deletenotesarea ends

  const [notesValue, setNotesValue] = useState<
    { note: string; userId: string; id: string }[]
  >([]);
  const [hasInput, setHasInput] = useState<boolean>(false); // State to track if textarea has input
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track which note is being edited
  const [noteValue, setNoteValue] = useState<string>(""); // Current value of the note being added or edited

  const getNotesValues = () => {
    if (editIndex !== null) {
      // Edit mode: update the existing note
      setNotesValue((prevNotes) =>
        prevNotes.map((note, index) => {
          if (index === editIndex) {
            return noteValue === ""
              ? note
              : {
                  note: noteValue,
                  userId: selectedUser?.id + "",
                  id: uuidv4(),
                };
          }
          return note;
        })
      );
      setEditIndex(null); // Exit edit mode
    } else {
      if (noteValue !== "") {
        // Add a new note
        setNotesValue((prevNotes) => [
          ...prevNotes,
          { note: noteValue, userId: selectedUser?.id + "", id: uuidv4() },
        ]);
      }
    }
    const textAreaValue = document.getElementById(
      "textareaNotes"
    ) as HTMLTextAreaElement;
    const getTextAreaValue = textAreaValue.value;
    if (getTextAreaValue === "") {
      setNotesValue([]); // Clear the textarea
      setHasInput(false); // Reset the shadow state
    }

    textareaRef.current?.focus();
    setNoteValue(""); // Clear the textarea
    setHasInput(false); // Reset the shadow state

    // const textAreaValues = document.getElementById(
    //   "textareaNotes"
    // ) as HTMLTextAreaElement;

    // const saveDeleteBtn = document.getElementById("saveDelete");

    // if(textAreaValues && saveDeleteBtn){
    //   textAreaValues.style.display = 'none';
    //   saveDeleteBtn.style.display = 'none';
    // }
  };

  // Function to handle textarea input
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setNoteValue(value); // Update the note value in the state
    setHasInput(value.length > 0); // Add shadow if there's input
  };

  // Function to handle deleting a specific note
  const deleteNote = (id: string) => {
    // Filter out the note at the specified index
    setNotesValue((prevNotes) => prevNotes.filter((data) => data.id !== id));
  };

  // Function to handle editing a specific note
  const editNote = (note: any) => {
    const textArea = document.getElementById(
      "notesTextarea"
    ) as HTMLTextAreaElement;
    const textAreaValue = document.getElementById(
      "textareaNotes"
    ) as HTMLTextAreaElement;

    const saveDeleteBtn = document.getElementById("saveDelete");
    const deleteNotes = document.getElementById("deleteNotes");

    if (textArea && saveDeleteBtn && deleteNotes) {
      textArea.style.display = "block";
      saveDeleteBtn.style.display = "flex";
    }
    textareaRef.current?.focus();
    const index = notesValue.findIndex((v) => v?.id == note?.id);
    setNoteValue(notesValue[index].note); // Populate the textarea with the note's current value
    setEditIndex(index); // Set the edit index to track which note is being edited
    setHasInput(true); // Apply shadow since textarea will have content
  };

  const toogleNotesSection = () => {
    const notesForMobile = document.getElementById("notesSection");
    const mobileMessageContainer = document.getElementById(
      "mobileMessageContainer"
    );
    const sideBar = document.getElementById("mobileSideBar");
    if (isMobile && notesForMobile && mobileMessageContainer && sideBar) {
      notesForMobile.style.display = "block";
      mobileMessageContainer.style.display = "none";
      notesForMobile.style.height = "calc(100vh - 0px)";
      sideBar.style.height = "calc(100vh - 0px)";
    }
  };

  const closeNotesSection = () => {
    const notesForMobile = document.getElementById("notesSection");
    const mobileMessageContainer = document.getElementById(
      "mobileMessageContainer"
    );
    const sideBar = document.getElementById("mobileSideBar");
    if (isMobile && notesForMobile && mobileMessageContainer && sideBar) {
      notesForMobile.style.display = "none";
      mobileMessageContainer.style.display = "block";
    }
  };

  // Side Bar Scripts Ends

  useEffect(() => {
    const handleCtrlK = (e: any) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault(); // Prevent browser default search action
        if (mainTextAreaRef.current) {
          mainTextAreaRef.current.focus(); // Focus on the textarea
        }
      }
    };

    // Add the event listener to the document for the keydown event
    window.addEventListener("keydown", handleCtrlK);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleCtrlK);
    };
  }, []);

  // active the selected chat section starts

  const [activeOption, setActiveOption] = useState<string | null>("unassigned");

  // Function to handle option click and set the active option
  const handleOptionClick = (option: string) => {
    setActiveOption(option);
  };

  // active the selected chat section ends

  // add tag click function
  const tagtextref = useRef<HTMLInputElement>(null); // tag text refference

  const handleAddTagClick = () => {
    setIsFocused(!isFocused);
    if (!isFocused) {
      // If the div becomes visible, focus the input
      setTimeout(() => {
        tagtextref.current?.focus();
      }, 0); // Timeout ensures that the div is rendered before focusing
    }
  };

  // Side Area Section starts

  const [contactOpen, setContactOpen] = useState(false);

  const handleContactToggle = () => {
    setContactOpen(!contactOpen);
  };

  const [companyOpen, setCompanyOpen] = useState(false);

  const handleCompanyToggle = () => {
    setCompanyOpen(!companyOpen);
  };

  const [selectedCompany, setSelectedCompany] = useState(null);
  const companies = [
    { name: "Niram", code: "NM" },
    { name: "Pixel", code: "PL" },
    { name: "Pickmyad", code: "PA" },
    { name: "Amwhiz", code: "AW" },
  ];

  const [basicOpen, setBasicOpen] = useState(false);

  const handleBasicToggle = () => {
    setBasicOpen(!basicOpen);
  };

  const [selectedBasic, setSelectedBasic] = useState(null);
  const basic = [
    { name: "Niram", code: "NM" },
    { name: "Pixel", code: "PL" },
    { name: "Pickmyad", code: "PA" },
    { name: "Amwhiz", code: "AW" },
  ];

  // Side Area Section ends

  // Date and time for the each notes

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Get the current date
    const today = new Date();

    // Get day, month, and year
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "long" }); // e.g., 'May'
    const year = today.getFullYear();

    // Function to get the day suffix (st, nd, rd, th)
    const getDaySuffix = (day: any) => {
      if (day > 3 && day < 21) return "th"; // All numbers between 4 and 20 have 'th'
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    // Format the date
    const formattedDate = `${day}${getDaySuffix(day)} ${month} ${year}`;

    // Set the date to the state
    setCurrentDate(formattedDate);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Back to Home page and Close Chats ends

  // expandable the side nav starts

  // State to manage expansion
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expansion state
  const handleToggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  // expandable the side nav ends

  // bookmarked Icon

  const [isBookMarked, setIsBookMarked] = useState<number[]>([]);

  const handleBookMarked = (userId: number) => {
    if (isBookMarked.includes(userId)) {
      // Remove bookmark if already clicked
      setIsBookMarked(isBookMarked.filter((id) => id !== userId));
    } else {
      // Add bookmark
      setIsBookMarked([...isBookMarked, userId]);
    }
  };

  // input focused expanded

  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleClear = () => {
    setIsInputFocused(false);
  };

  return (
    <div>
      <Header onToggleExpand={handleToggleExpand} />
      <div className={Style.main_container}>
        <SideNav isExpanded={isExpanded} />
        <div className={Style.chat_container} id="chatContainer">
          {/* <div className={Style.profile_settings}>
            <div className={Style.left_profile_settings}>
              <div className={Style.main_back_arrow}>
                <BackIcon
                  onClick={mainBackToHomePage}
                  style={{ marginTop: "6px", marginLeft: "6px" }}
                />
              </div>
            
              <div className={Style.user_logo}>
              <img src="amwhiz_Logo.svg" alt="company_Logo" />
              </div>
            </div>
            <SettingsIcon
              className={`group_settings size-8 cursor-pointer mt-[5px] ${
                isHovered ? "bg-[#fff] rounded-[50px] pt-[4px] pl-[4px]" : ""
              }`}
              onClick={toggleDivVisibility}
            />
            <div
              className={`${Style.popup_overlay} ${
                isPopupOpen ? Style.popup_slide : ""
              }`}
            >
              <div className={Style.popup_close}>
                <button onClick={handleClosePopup}>
                  <CloseIcon className="close_group size-7" />
                </button>
                <p>Add group members</p>
              </div>
              <div className={Style.popup_search}>
                <SearchIcon className="group_search size-4" />
                <input type="text" placeholder="Search name or number" />
              </div>
              <hr />
              <div
                className={Style.popup_content}
                onClick={(e) => e.stopPropagation()}
              >
                <h1>No Contacts found</h1>
              </div>
            </div>

            <div
              ref={mainDivRef}
              className={`${Style.main_div} ${
                isDivVisible && isHovered ? Style.show : ""
              }`}
            >
              <div className={Style.inner_div}>
                <ul className="flex flex-col mt-1 mb-1">
                  <li
                    className="text-[#111B12] flex gap-3 cursor-pointer"
                    onClick={handleOpenPopup}
                  >
                    <NewGroup className="new_group size-6" />
                    New Group
                  </li>

                  <li className="text-[#111B12] flex gap-3 cursor-pointer">
                    <StarredMessage className="starred_message size-6" />
                    Starred messages
                  </li>

                  <li className="text-[#111B12] flex gap-3 cursor-pointer">
                    <SelectChats className="select_chats size-6" />
                    Select chats
                  </li>

                  <li
                    className="text-[#111B12] flex gap-3 cursor-pointer"
                    onClick={logOutToHome}
                  >
                    <LogOut className="log_out size-6" />
                    Log out
                  </li>
                </ul>
              </div>
            </div>
          </div>  */}
          {/* <div className={Style.search_filter}>
            <IconField iconPosition="right">
              <div className={`${Style.search}`}>
                <InputIcon className="pi pi-search text-[#111B12]"> </InputIcon>
                <InputText
                  v-model="value1"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search"
                />
              </div>
            </IconField>
            <div className={Style.chat_variety}>
              <div className={Style.all}>All</div>
              <div className={Style.unread}>Unread</div>
              <div className={Style.groups}>Groups</div>
            </div>

            <hr />
          </div> */}
          <div className={Style.search_top}>
            <div className={Style.search_items}>
              <div
                className={`${Style.search_user} ${
                  isInputFocused ? Style.focused_div : ""
                }`}
              >
                <div className={`${Style.search_in} `}>
                  {isInputFocused && (
                    <select
                      // value={selectedOption}
                      // onChange={handleSelectChange}
                      className="bg-transparent outline-none pr-2 mr-2 text-[#000]"
                    >
                      <option value="Contact">Contact</option>
                      <option value="Messages">Messages</option>
                    </select>
                  )}
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    className={Style.search_input}
                    onChange={handleSearch}
                    onFocus={() => {
                      setIsInputFocused(true);
                    }}
                    // onBlur={() => {setIsInputFocused(false)}}
                  />
                  {isInputFocused ? (
                    <button className=" text-[#000]" onClick={handleClear}>
                      ✖
                    </button>
                  ) : (
                    <img
                      src="assets/magnify.svg"
                      alt="magnify"
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </div>
              </div>

              {/* <div className="flex items-center border border-gray-400 rounded-full px-3 py-[7px] max-w-[275px] shadow-md focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="bg-transparent outline-none pr-2 mr-2 text-[#000]"
      >
        <option value="Contact">Contact</option>
        <option value="Messages">Messages</option>
      </select>
      <input
        type="text"
        className="flex-grow px-2 outline-none text-[#000] w-full text-[13px]"
        value={`${inputValues}`}
        onChange={handleInputChanges}
        placeholder="Search"
      />
      {selectedOption ? (
        <button onClick={handleClear} className="ml-2 text-[#000]">
          ✖
        </button>
      ) : (
        <img
                    src="assets/magnify.svg"
                    alt="magnify"
                    style={{ cursor: "pointer" }}
                  />
      )} 
    </div> */}

              <div className={Style.search_more}>
                <div className={Style.add_search}>
                  <img src="assets/Add Btn.svg" alt="add_btn" />
                </div>
                <div className={Style.filter_search}>
                  <img src="assets/filter.svg" alt="filter" />
                </div>
              </div>
            </div>
          </div>

          <div className={Style.options}>
            <div className={Style.options_more}>
              <div
                className={`${Style.individual_options} ${
                  activeOption === "unassigned" ? Style.active_option : ""
                }`}
                onClick={() => handleOptionClick("unassigned")}
              >
                <UnassignedIcon />
              </div>
              <div
                className={`${Style.individual_options} ${
                  activeOption === "assigned" ? Style.active_option : ""
                }`}
                onClick={() => handleOptionClick("assigned")}
              >
                <AssignedIcon />
              </div>
              <div
                className={`${Style.individual_options} ${
                  activeOption === "starred" ? Style.active_option : ""
                }`}
                onClick={() => handleOptionClick("starred")}
              >
                <StarredIcon />
              </div>
              <div
                className={`${Style.individual_options} ${
                  activeOption === "open" ? Style.active_option : ""
                }`}
                onClick={() => handleOptionClick("open")}
              >
                <OpenIcon />
              </div>
              <div
                className={`${Style.individual_options} ${
                  activeOption === "resolved" ? Style.active_option : ""
                }`}
                onClick={() => handleOptionClick("resolved")}
              >
                <ResolvedIcon />
              </div>
              <div
                className={`${Style.individual_options} ${
                  activeOption === "timmer" ? Style.active_option : ""
                }`}
                onClick={() => handleOptionClick("timmer")}
              >
                <TimmerIcon />
              </div>
            </div>
          </div>

          <div className={Style.chats_container}>
            <div className={Style.all_chats_container}>
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`${Style.individual_chat} ${
                    selectedUser?.id === user.id ? Style.active_chat : ""
                  }
                  `}
                  onClick={() => handleUserClick(user)}
                >
                  <div className={Style.main_chat_profile}>
                    <div className={Style.chat_profile}>
                      <img src={user.profileimg} alt={user.name} />
                      {/* <UserProfileIcon className="all_user_list size-16 cursor-pointer" /> */}
                    </div>
                    <div className={Style.chat_header}>
                      <div className={Style.users_name}>
                        <p>{user.name}</p>
                      </div>
                      {/* <div className={Style.users_mail_id}>
                      <p>{user.mail_id}</p>
                    </div> */}
                      <div className={Style.user_msg}>
                        <p>{user.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                  <div className={Style.time_slots}>
                    <p>{user.time}</p>
                    <BookmarkedIcon
                      className={`${Style.bookmarked_icon} ${
                        isBookMarked.includes(user.id) ? Style.bookmarked : ""
                      }`}
                      fill={isBookMarked.includes(user.id) ? "yellow" : "none"} // Set fill based on state
                      stroke={
                        isBookMarked.includes(user.id) ? "#c8b100" : "#48535B"
                      } // Set stroke based on state
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the user click event
                        handleBookMarked(user.id);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {selectedUser ? (
          <Splitter style={{ width: "calc(100% - 24.5%)" }}>
            <SplitterPanel
              className={`${Style.message_section} ${
                isMobile ? Style.mobile_message_container : ""
              }`}
              size={70}
              minSize={55}
              id={`${isMobile ? "mobileMessageContainer" : "desktopMessage"}`}
            >
              <div className={Style.message_container} id="messageContainer">
                <div className={Style.profile_settings}>
                  <div className={Style.profile_left}>
                    <div className={Style.message_profile}>
                      <div className={Style.back_arrow}>
                        <BackIcon
                          onClick={backToHomePage}
                          style={{ marginTop: "6px", marginLeft: "6px" }}
                        />
                      </div>
                      {/* <ProfileIcon
                        fill="#fff"
                        className="individual_user_profile size-14 cursor-pointer mt-[-5px]"
                      /> */}
                      <div>
                        <Circular24HourTimer />
                      </div>
                      <div className={Style.individual_profile}>
                        <img
                          src={selectedUser.profileimg}
                          alt={selectedUser.name}
                        />
                      </div>
                      <div className={Style.profile_name}>
                        <p className={Style.user_name}>{selectedUser?.name}</p>
                        {/* <span className={Style.seen_details}>
                          last seen at <span>{selectedUser?.time}</span>
                        </span> */}
                        <div className={Style.individual_user_top_charts}>
                          <div className={Style.sub_user_top_charts}>
                            <img
                              src="assets/whatsapp-icon.svg"
                              alt="whatsapp icon"
                            />
                            <span className={Style.sub_user_names}>
                              Primary Number
                            </span>
                          </div>
                          <div className={Style.sub_user_top_charts}>
                            <img src="assets/tag_icon.svg" alt="tag icon" />
                            <span className={Style.sub_user_names}>
                              Add Tag
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={Style.profile_right}>
                    <button className={Style.profile_right_topbtn}>
                      <div className="flex gap-[2px]">
                        <img src="assets/user-icon.svg" alt="user icon" />
                        <span className={Style.profile_right_topbtn_text}>
                          Assign
                        </span>
                      </div>
                      <img src="assets/down-arrow.svg" alt="down arrow" />
                    </button>
                    <div>
                      <img
                        src="assets/remainder.svg"
                        alt="remainder icon"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <SearchIcon className="individual_search size-5 cursor-pointer" />
                    <SettingsIcon
                      className={`individual_user_settings size-8 cursor-pointer mt-[5px] ${
                        isRightHovered
                          ? "bg-[#fff] rounded-[50px] pt-[4px] pl-[4px]"
                          : ""
                      }`}
                      // onClick={toggleRightDivVisibility}
                    />

                    {/* Right popup slide div */}
                    {/* <div
                      ref={mainRightDivRef}
                      className={`${Style.rightMain_div} ${
                        isDivSettings ? Style.right_popup : ""
                      }`}
                    >
                      <div className={Style.rightInner_div}>
                        <ul className="flex flex-col mt-1 mb-1">
                          {isMobile ? (
                            <li
                              className="text-[#111B12] flex gap-3 cursor-pointer"
                              onClick={toogleNotesSection}
                            >
                              <AddNotes className="add_notes size-6" />
                              Add Notes
                            </li>
                          ) : (
                            ""
                          )}

                          <li className="text-[#111B12] flex gap-3 cursor-pointer">
                            <SelectedMessages className="selected_messages size-6" />
                            Selected messages
                          </li>

                          <li
                            className="text-[#111B12] flex gap-3 cursor-pointer"
                            onClick={backToChats}
                          >
                            <CloseChats className="close_chats size-6" />
                            Close chats
                          </li>

                          <li className="text-[#111B12] flex gap-3 cursor-pointer">
                            <MuteNotifications className="mute_notifications size-6" />
                            Mute notifications
                          </li>

                          <li className="text-[#111B12] flex gap-3 cursor-pointer">
                            <DissapearingMessage className="dissapearing_messages size-6" />
                            Disappearing messages
                          </li>

                          <li className="text-[#111B12] flex gap-3 cursor-pointer">
                            <ClearChats className="clear_chats size-6" />
                            Clear chats
                          </li>

                          <li
                            className="text-[#111B12] flex gap-3 cursor-pointer"
                            onClick={handleRightClosePopup}
                          >
                            <ExitIcon className="exit_icon size-6" />
                            Exit
                          </li>
                        </ul>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className={Style.main_chat_section}>
                  <div className={Style.chat_area}>
                    <ul className={Style.list_group}>
                      {(sentMessages[selectedUser.id] || []).map(
                        (message, index) => (
                          <React.Fragment key={index}>
                            {shouldShowDate(
                              sentMessages[selectedUser.id] as any,
                              index
                            ) && (
                              <div className={Style.date_divider}>
                                <span className={Style.message_date}>
                                  {formatMessageDate(message.timestamp)}
                                </span>
                              </div>
                            )}
                            <li
                              className={`${Style.messages} ${
                                message.type === "sent"
                                  ? Style.sent
                                  : Style.received
                              }`}
                            >
                              {message.preview ? (
                                <a
                                  href={message.preview.url} // Assuming URL is in content
                                  target="_self"
                                  rel="noopener noreferrer"
                                  className={Style.file_link}
                                >
                                  <div className={Style.preview_container}>
                                    <div>
                                      <a
                                        href={message.preview.url}
                                        className={Style.previewURL}
                                      >
                                        {message.preview.url}
                                      </a>
                                    </div>
                                    <img
                                      src={message.preview.image}
                                      alt="preview"
                                      className={Style.preview_image}
                                    />
                                    <div className={Style.preview_text}>
                                      <h3 className={Style.preview_title}>
                                        {message.preview.title}
                                      </h3>
                                      <p className={Style.preview_description}>
                                        {message.preview.description}
                                      </p>
                                      <span className={Style.timestamp}>
                                        {formatTimestamp(message.timestamp)}
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              ) : message.fileUrl ? (
                                <a
                                  href={message.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={Style.file_link}
                                >
                                  <img
                                    src={
                                      isValidImageUrl(message?.fileName || "")
                                        ? message.fileUrl
                                        : "google-docs.png"
                                    }
                                    alt="file preview"
                                    className={Style.file_preview}
                                  />
                                  <span className="text-[12px]">
                                    {message.fileName}
                                  </span>
                                  <span className={Style.timestamp}>
                                    {formatTimestamp(message.timestamp)}
                                  </span>
                                </a>
                              ) : (
                                <div className={Style.message_content}>
                                  <pre className="text-wrap">
                                    <span className={Style.content}>
                                      {message.content}
                                    </span>
                                    <span className={Style.timestamp}>
                                      {formatTimestamp(message.timestamp)}
                                    </span>
                                  </pre>
                                </div>
                              )}
                            </li>
                          </React.Fragment>
                        )
                      )}
                      <div ref={messagesEndRef} />
                    </ul>
                  </div>
                  <div className={Style.form_element}>
                    <form onSubmit={sendMessage} className={Style.form_group}>
                      <button className={Style.controls_btn}>
                        <img src="assets/control.svg" alt="control icon" />
                        <img src="assets/letter.svg" alt="letter icon" />
                      </button>
                      <textarea
                        value={message}
                        ref={mainTextAreaRef}
                        onChange={handleMessageChange}
                        placeholder="to type here ..."
                        className={Style.main_textarea}
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
                      <div className={Style.form_items}>
                        <button
                          className={Style.emoji_stickers}
                          type="button"
                          onClick={() => setShowEmojiPicker((prev) => !prev)}
                        >
                          <EmojiIcon className="emoji_icon size-7" />
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
                          {/* <FileIcon className="file_icon size-7" /> */}
                          <img
                            src="assets/add file.svg"
                            alt="add file button"
                          />
                        </button>

                        {showSuggestions && (
                          <ul className={Style.show_suggestions}>
                            {suggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                className={Style.suggestions}
                                style={{
                                  padding: "5px",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleSuggestionClick(suggestion)
                                }
                              >
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                        <button type="submit" className={Style.submit_button}>
                          {/* <SendIcon className="send_icon size-7" /> */}
                          <img
                            src="assets/submit_btn.svg"
                            alt="submit button"
                          />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </SplitterPanel>
            <SplitterPanel
              className={`${Style.notes_section} ${
                isMobile ? Style.hide_notes : "block"
              }`}
              id="notesSection"
              size={30}
              minSize={28}
            >
              {selectedUser && (
                <div
                  className={Style.side_bar}
                  id={`${isMobile ? "mobileSideBar" : "deskSideBar"}`}
                >
                  <div className={Style.side_bar_user_details}>
                    <div className={Style.side_bar_header}>
                      <div
                        className={Style.notes_back_arrow}
                        id={`${
                          isMobile
                            ? "mobileBackToChatArea"
                            : "deskBackToChatArea"
                        }`}
                        onClick={closeNotesSection}
                      >
                        <BackIcon
                          style={{ marginTop: "6px", marginLeft: "6px" }}
                        />
                      </div>
                      <div className={Style.side_bar_profile}>
                        <img
                          src={selectedUser.profileimg}
                          alt={selectedUser.name}
                        />
                        {/* <NotesProfileIcon className="notes_profile size-7" /> */}
                      </div>
                      <div className={Style.user_side}>
                        <div className={Style.side_bar_user_name}>
                          <p>{selectedUser.name}</p>
                        </div>
                        <div className={Style.side_bar_user_status}>
                          <div className={Style.side_bar_user_status_content}>
                            <img
                              src="assets/moderate.svg"
                              alt="moderate icon"
                            />
                            <span className={Style.side_bar_user_status_text}>
                              Moderate
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className={Style.side_bar_message_apps}>
                      <div className={Style.whatsapp_div}>
                        <img
                          className={Style.whatsapp_icon}
                          src="whatsapp.png"
                          alt="whatsapp_image"
                        />
                      </div>
                      <div className={Style.comments_div}>
                        <img
                          className={Style.comments_icon}
                          src="comments.png"
                          alt="comments_image"
                        />
                      </div>
                    </div> */}
                  </div>
                  {/* Contact Details */}

                  <div className={Style.side_bar_lists}>
                    <div className={Style.all_list_sidebar}>
                      <div className={Style.contact_info}>
                        <div
                          className={Style.contact_details}
                          onClick={handleContactToggle}
                        >
                          <div className={Style.contact_items}>
                            <img
                              src="assets/contact icon.svg"
                              alt="contact_icon"
                            />
                            <p className={Style.contact_head}>
                              Contact Details
                            </p>
                          </div>
                          {contactOpen ? (
                            <div className={Style.contact_up_arrow}>
                              <img src="assets/up-arrow.svg" alt="arrow up" />
                            </div>
                          ) : (
                            <div className={Style.contact_down_arrow}>
                              <img
                                src="assets/arrow-down.svg"
                                alt="arrow down"
                              />
                            </div>
                          )}
                        </div>
                        <div
                          className={`${Style.contact_sub_items} ${
                            contactOpen
                              ? Style.open_contact
                              : Style.close_contact
                          }`}
                        >
                          <div className={Style.phone_number}>
                            <div className={Style.phone_details}>
                              <p className={Style.phone_head}>Phone Number</p>
                              <p className={Style.phone_boady}>
                                +91 95686 57116
                              </p>
                            </div>
                            <div className={Style.phone_edit}>
                              <img
                                src="assets/phone_edit.svg"
                                alt="edit icon"
                              />
                            </div>
                          </div>
                          <div className={Style.mail_id_contact}>
                            <div className={Style.mail_id_details}>
                              <p className={Style.mail_head}>Email ID</p>
                              <p className={Style.mail_boady}>
                                dwight@drown.com
                              </p>
                            </div>
                          </div>
                          <div className={Style.contact_owner}>
                            <div className={Style.owner_details}>
                              <p className={Style.owner_head}>Owner</p>
                              <p className={Style.owner_boady}>-</p>
                            </div>
                          </div>

                          <div className={Style.contact_tags}>
                            <div className={Style.tags_details}>
                              <p className={Style.tags_head}>Contact Tags</p>
                              <button
                                className={Style.tags_head_btn}
                                id="addTag"
                                onClick={handleAddTagClick}
                              >
                                <img src="assets/add tag.svg" alt="add icon" />
                                <p className={Style.tags_head_btn_text}>
                                  Add Tag
                                </p>
                              </button>
                            </div>
                          </div>
                          {isFocused && (
                            <div
                              className={`${Style.tags_selection} ${
                                isFocused ? Style.focused : ""
                              }`}
                            >
                              <div className={Style.tags_icon}>
                                <TagsIcon className="tags_icon size-5" />
                                <input
                                  type="text"
                                  value={inputValue}
                                  ref={tagtextref}
                                  onChange={handleTagChange}
                                  onKeyDown={handleKeyPress}
                                  placeholder="Add a tag"
                                  onFocus={handleFocus}
                                  onBlur={handleBlur}
                                />
                              </div>
                            </div>
                          )}
                          <div className={Style.user_tags_main}>
                            <ul className={Style.user_tags_sub}>
                              {selectedUser &&
                                userTags[selectedUser.id]?.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      className={Style.tags_list_item}
                                    >
                                      {item}
                                      <button
                                        onClick={() => handleDelete(index)}
                                        className={Style.delete_chips_btn}
                                      >
                                        <DeleteChips className="delete_chips size-5" />
                                      </button>
                                    </li>
                                  )
                                )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className={Style.company_info}>
                        <div
                          className={Style.company_details}
                          onClick={handleCompanyToggle}
                        >
                          <div className={Style.company_items}>
                            <img
                              src="assets/company icon.svg"
                              alt="company_icon"
                            />
                            <p className={Style.company_head}>
                              Company Details
                            </p>
                          </div>
                          {companyOpen ? (
                            <div className={Style.company_up_arrow}>
                              <img src="assets/up-arrow.svg" alt="arrow up" />
                            </div>
                          ) : (
                            <div className={Style.company_down_arrow}>
                              <img
                                src="assets/arrow-down.svg"
                                alt="arrow down"
                              />
                            </div>
                          )}
                        </div>
                        <div
                          className={`${Style.company_sub_items} ${
                            companyOpen
                              ? Style.open_company
                              : Style.close_company
                          }`}
                        >
                          <div>
                            <Dropdown
                              value={selectedCompany}
                              onChange={(e) => setSelectedCompany(e.value)}
                              options={companies}
                              optionLabel="name"
                              editable
                              placeholder="Select a Company"
                              className={Style.company_dropdown}
                            />
                          </div>
                        </div>
                      </div>

                      <div className={Style.company_info}>
                        <div
                          className={Style.company_details}
                          onClick={handleBasicToggle}
                        >
                          <div className={Style.company_items}>
                            <img
                              src="assets/basic info.svg"
                              alt="company_icon"
                            />
                            <p className={Style.company_head}>
                              Basic Information
                            </p>
                          </div>
                          {basicOpen ? (
                            <div className={Style.company_up_arrow}>
                              <img src="assets/up-arrow.svg" alt="arrow up" />
                            </div>
                          ) : (
                            <div className={Style.company_down_arrow}>
                              <img
                                src="assets/arrow-down.svg"
                                alt="arrow down"
                              />
                            </div>
                          )}
                        </div>
                        <div
                          className={`${Style.company_sub_items} ${
                            basicOpen ? Style.open_company : Style.close_company
                          }`}
                        >
                          <div>
                            <Dropdown
                              value={selectedBasic}
                              onChange={(e) => setSelectedBasic(e.value)}
                              options={basic}
                              optionLabel="name"
                              editable
                              placeholder="Select Information"
                              className={Style.company_dropdown}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className={Style.side_bar_tags}>
                    <div className={Style.tags_header}>
                      <p>Tags</p>
                    </div>
                    <div
                      className={`${Style.tags_selection} ${
                        isFocused ? Style.focused : ""
                      }`}
                    >
                      <div className={Style.tags_icon}>
                        <TagsIcon className="tags_icon size-5" />
                        <input
                          type="text"
                          value={inputValue}
                          onChange={handleTagChange}
                          onKeyDown={handleKeyPress}
                          placeholder="Add a tag"
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ul className="flex gap-3 flex-wrap">
                        {selectedUser &&
                          userTags[selectedUser.id]?.map((item, index) => (
                            <li key={index} className={Style.tags_list_item}>
                              {item}
                              <button
                                onClick={() => handleDelete(index)}
                                className="ml-[7px] text-gray-400"
                              >
                                <DeleteChips className="delete_chips size-5" />
                              </button>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div> */}

                  <div className={Style.side_bar_notes}>
                    <div className={Style.notes_header}>
                      <div className={Style.notes_header_title}>
                        <img src="assets/notes_icon.svg" alt="notes icon" />
                        <p>Notes</p>
                      </div>
                      <div
                        className={Style.add_button_notes}
                        id="addButtonNotes"
                        onClick={toogleNotesArea}
                      >
                        <button className={Style.add_button_notes_btn}>
                          {/* <AddIcon className="add_icon size-5" /> */}
                          <img
                            src="assets/add_notes_icon.svg"
                            alt="add notes icon"
                          />
                          <p className={Style.add_button_notes_text}>
                            Add Notes
                          </p>
                        </button>
                      </div>
                    </div>
                    {/* <div className={Style.notes_paragraph}>
                      <p>
                        Notes help you to keep track of your conversation with
                        your team
                      </p>
                    </div> */}
                    {notesValue.length > 0 && (
                      <div className={Style.get_notes_value}>
                        {/* <p className="font-bold">Saved Notes :</p> */}
                        <ol className={Style.saved_notes}>
                          {notesValue
                            .filter(
                              (note) => note.userId == selectedUser.id + ""
                            )
                            .map(
                              (note, index) => (
                                <>
                                  <li
                                    key={index}
                                    className={Style.notes_list}
                                    style={{
                                      listStyle: "auto",
                                      backgroundImage: `url('notes_bg.svg')`,
                                    }}
                                  >
                                    <pre className="text-wrap">{note.note}</pre>
                                    {/* need to set index means use {index + 1} .{note.note} */}
                                    <div className={Style.edit_delete}>
                                      <div className="flex gap-1 items-center">
                                        <img
                                          src={selectedUser.profileimg}
                                          alt="selected user profile"
                                          style={{ maxWidth: "18px" }}
                                        />
                                        <p className={Style.edit_delete_text}>
                                          PrithiviRaj
                                        </p>
                                      </div>
                                      <div className="flex gap-2 items-center">
                                        <div
                                          className={Style.edit_list}
                                          title="Edit"
                                          onClick={() => editNote(note)}
                                        >
                                          {/* <EditIcon className="edit_icon size-4" /> */}
                                          <img
                                            src="assets/edit icon.svg"
                                            alt="edit icon"
                                          />
                                        </div>
                                        <div
                                          className={Style.delete_list}
                                          onClick={() => deleteNote(note.id)}
                                          title="Delete"
                                        >
                                          {/* <DeleteIcon className="delete_icon size-4 pl-[2px]" /> */}
                                          <img
                                            src="assets/delete icon.svg"
                                            alt="delete icon"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <p className={Style.current_date}>
                                    {currentDate}
                                  </p>
                                </>
                              ) // Display each note as a list item
                            )}
                        </ol>
                      </div>
                    )}
                    <div className={Style.notes_textarea} id="notesTextarea">
                      <textarea
                        className={`${Style.textarea_notes} ${
                          hasInput ? Style.textarea_shadow : ""
                        }`}
                        id="textareaNotes"
                        placeholder="Enter note here"
                        value={noteValue} // Bind the value to the textarea
                        onChange={handleInputChange}
                        ref={textareaRef}
                      ></textarea>
                    </div>
                    <div className={Style.save_delete} id="saveDelete">
                      <button
                        className={Style.save_btn}
                        onClick={getNotesValues}
                        title="Save"
                      >
                        <SaveNotes className="save_notes size-6" />
                      </button>
                      <button
                        className={Style.delete_btn}
                        id="deleteNotes"
                        onClick={deleteNotesArea}
                        title="Close"
                      >
                        <DeleteNotes className="delete_notes size-6" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </SplitterPanel>
          </Splitter>
        ) : (
          <div className={Style.initial_chats_section}>
            <div className={Style.preview_section_chats}>
              <img src="watsap-preview.png" alt="pre-watsapp"></img>
              <p className={Style.preview_paragraph}>
                A replica of the popular messaging platform now available!
              </p>
              <p className={Style.security_msg}>
                Your personal messages are end-to-end encrypted
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
