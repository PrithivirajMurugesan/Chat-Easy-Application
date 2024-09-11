import { useRouter } from "next/router";
import Style from "./app/index.module.css";
import { Button } from "primereact/button";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/app"); // Navigate to the target page
    }, 2000);
  };

  // const handleClick = () => {
  // };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className={Style.preview_section}>
        <img src="watsap-preview.png" alt="pre-watsapp"></img>
        <p className={Style.preview_paragraph}>
          A replica of the popular messaging platform now available!
        </p>
        <Button
          label="Get into the chats"
          className="mt-3 bg-[#008069] text-[#fff] text-[15px] px-[24px] py-[10px] rounded-[24px]"
          loading={loading}
          onClick={load}
        />
        <p className={Style.security_msg}>
          Your personal messages are end-to-end encrypted
        </p>
      </div>
    </div>
  );
}
