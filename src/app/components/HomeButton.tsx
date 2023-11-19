import React from 'react'
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from 'next/link';


const HomeButton = () => {
  return (
    <div className='back_to_home'>
        <Link href="/">
            <BiLeftArrowAlt/>
        </Link>
    </div>
  )
}

export default HomeButton;
