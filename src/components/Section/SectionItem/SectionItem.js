import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { BsHeart, BsPlayFill, BsThreeDots } from 'react-icons/bs';

function SectionItem({ data, thumbnailM, link, title, artistsNames, sortDescription }) {
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(false);
    const imageRef = useRef();

    const handleHover = () => {
        setIsHover(true);
        imageRef.current.classList.add('animate-scale-up-image');
        imageRef.current.classList.remove('animate-scale-down-image');
    };
    const handleLeave = () => {
        setIsHover(false);
        imageRef.current.classList.remove('animate-scale-up-image');
        imageRef.current.classList.add('animate-scale-down-image');
    };
    return (
        <div
            className="flex flex-col w-1/5 flex-auto cursor-pointer"
            onClick={() => {
                navigate(link.split('.')[0], { state: { playAlbum: false } });
            }}
        >
            <div
                className="w-full relative overflow-hidden rounded-lg"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
            >
                {isHover && (
                    <div className="absolute top-0 right-0 bottom-0 z-40 left-0 bg-overlay-30 text-white flex items-center justify-center gap-6 rounded-lg">
                        <span>
                            <BsHeart size={20} />
                        </span>
                        <span>
                            <BsPlayFill
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(link.split('.')[0], { state: { playAlbum: true } });
                                }}
                                className="p-2 border border-white rounded-full"
                                size={50}
                            />
                        </span>
                        <span>
                            <BsThreeDots size={20} />
                        </span>
                    </div>
                )}
                <img ref={imageRef} src={thumbnailM} alt="avatar" className="w-full h-auto rounded-lg" />
            </div>
            <div className="mt-3 text-sm">
                <h4 className="mb-1 font-bold hover:text-main-500 cursor-pointer">
                    {title?.length >= 37 ? `${title?.slice(0, 35)}...` : title}
                </h4>
                <h3 className="font-normal text-gray-500">
                    {data?.sectionId === 'h100' ? (
                        <span>{artistsNames}</span>
                    ) : sortDescription?.length >= 40 ? (
                        `${sortDescription?.slice(0, 40)}...`
                    ) : (
                        sortDescription
                    )}
                </h3>
            </div>
        </div>
    );
}

export default SectionItem;
