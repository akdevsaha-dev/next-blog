import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
  <div className="h-screen bg-[#0e0e0e] w-full flex">
    <div className=" h-full w-full z-0 ">
   <div className="w-[300px] h-[300px] bg-[#a19b9b] relative rounded-[100%] -top-[30px] -left-20 blur-[130px] opacity-50"></div>
   <div className="w-[200px] h-[200px] bg-[#e8e4e4] relative justify-end  rounded-[100%] -top-[40%] -right-[83%] blur-[130px] opacity-50"></div>
   <div className="w-[300px] h-[300px] bg-[#959292] relative justify-end  rounded-[100%] -top-[30%] -right-[40%] blur-[130px] opacity-50 "></div>
   <div className="w-full h-[10vh] bg-transparent absolute top-0 border-b-[#3a3838] border-b-[1px] flex justify-center  items-center gap-[100px] ">
    <div>BLOG</div>
    <div><Link href={"/signup"}>CREATE ACCOUNT</Link></div>
    <div>SIGN IN </div>
    <div>ABOUT US</div>
  </div>
  </div>
  </div>
  );
}
