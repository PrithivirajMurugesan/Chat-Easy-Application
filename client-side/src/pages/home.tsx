import { useRouter } from 'next/router';
import Style  from './app/index.module.css';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/app'); // Navigate to the target page
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className={Style.preview_section}>
             <img src="watsap-preview.png" alt="pre-watsapp"></img>
          <p className={Style.preview_paragraph}>A replica of the popular messaging platform now available!</p>
          <button className="mt-3 bg-[#008069] text-[#fff] text-[15px] px-[24px] py-[10px] rounded-[24px]" onClick={handleClick}>Get into the chats</button>
          <p className={Style.security_msg}>Your personal messages are end-to-end encrypted</p>
     </div>
    </div>
  );
}
