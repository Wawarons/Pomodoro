'use client'
import React, { useEffect, useRef } from 'react'

interface ClickOutsideProps {
    onOutsideClick: (event: MouseEvent) => void,
    children: React.ReactNode
}

const ClickOutside: React.FC<ClickOutsideProps> = ({ onOutsideClick, children }) => {

    const divRef = useRef<HTMLDivElement>(null);

    /**
 * Handle mouse click outside element and set up the new task's title
 * @param event MouseEvent
 */
    const isClickOutside = async (event: MouseEvent) => {
        if (divRef && !(divRef.current?.contains(event.target as Node))){
            onOutsideClick(event);
        }
        
    }

    useEffect(() => {
        document.addEventListener("click", isClickOutside);

        return () => {
            document.removeEventListener("click", isClickOutside);
        }

    }, [])

    return (
        <div ref={divRef}>
            {children}
        </div>
    )
}

export default ClickOutside;