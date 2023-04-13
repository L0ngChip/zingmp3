import { handleNumber } from '~/utils/fn';
import { useRef, useState } from 'react';

import { Button } from '~/components/Button';
import { RiUserAddLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Artist({ thumbnailM, artistName, totalFollow, link }) {
    const [isHover, setIsHover] = useState(false);
    const imageRef = useRef();

    const handleHover = () => {
        setIsHover(true);
        imageRef.current.classList.add('animate-scale-up-image');
        imageRef.current.classList.remove('animate-scale-down-image');
    };

    const handleLeave = () => {
        setIsHover(false);
        imageRef.current.classList.add('animate-scale-down-image');
        imageRef.current.classList.remove('animate-scale-up-image');
    };

    return (
        <div className="w-1/5 flex flex-col">
            <Link to={link}>
                <div className="relative overflow-hidden rounded-full" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                    <img ref={imageRef} className="object-contain rounded-full" src={thumbnailM} alt="avatar" />
                    {isHover && <div className="absolute top-0 right-0 bottom-0 left-0 bg-overlay-30 rounded-full"></div>}
                </div>
            </Link>
            <div className="flex flex-col mt-[15px] justify-center items-center">
                <Link to={link}>
                    <span className="mb-1 text-sm font-medium hover:underline hover:text-main-500">{artistName}</span>
                </Link>
                <span className="text-xs font-normal opacity-70">{handleNumber(totalFollow) + ' quan tâm'}</span>
            </div>
            <div className="flex justify-center items-center mt-[15px] mb-5">
                <Button
                    leftIcon={<RiUserAddLine />}
                    className="flex items-center gap-1 px-[19px] py-[2px] border bg-main-500 text-white text-xs font-normal rounded-full"
                >
                    QUAN TÂM
                </Button>
            </div>
        </div>
    );
}

export default Artist;
