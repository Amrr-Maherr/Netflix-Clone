"use client"
import Image from 'next/image'
import Logo from "../../Assets/images/Netflix_Logo_RGB.png"
export default function index() {
  return (
      <Image src={Logo} alt='Logo_image' width={120} height={120} quality={100} priority={true} />
  )
}
