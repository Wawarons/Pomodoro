import React from 'react';
import Link from 'next/link';
import { BiLeftArrowAlt } from "react-icons/bi";


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
