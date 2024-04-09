'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BackToTop() {

  const [ showButton , setShowButton ] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 200;
      setShowButton(scrollY > threshold ? true : false);
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }


  return (
    <div className={`fixed bottom-10 right-10 ${showButton ? 'visible': 'hidden'}`}>
      <button className={`material-symbols-outlined  bg-gray-600 p-2 text-white rounded-2xl `}
      onClick={scrollToTop}
      style={{fontSize: '3rem'}}>keyboard_arrow_up</button>  
    </div>
  )
}
