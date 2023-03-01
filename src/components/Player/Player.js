import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import {
    BsHeart,
    BsThreeDots,
    BsFillSkipStartFill,
    BsFillSkipEndFill,
    BsFillPlayFill,
    BsPauseFill,
} from 'react-icons/bs';
import { RxShuffle } from 'react-icons/rx';
import { CiRepeat } from 'react-icons/ci';

import * as apis from '~/apis';
import { Button } from '../Button';
import * as actions from '~/redux/actions';

function Player() {
    const audioEls = useRef(new Audio());
    const { curSongId, isPlaying } = useSelector((state) => state.music);
    const [infoSong, setInfoSong] = useState(null);
    const [source, setSource] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([apis.apisGetDetailSong(curSongId), apis.apisGetSong(curSongId)]);
            if (res1.data.err === 0) {
                setInfoSong(res1.data.data);
            }
            if (res2.data.err === 0) {
                setSource(res2.data.data['128']);
            }
        };

        fetchDetailSong();
    }, [curSongId]);

    useEffect(() => {
        audioEls.current.pause();
        audioEls.current.src = source;
        audioEls.current.load();
        if (isPlaying) audioEls.current.play();
    }, [curSongId, source]);

    const handleTogglePlay = () => {
        if (isPlaying) {
            audioEls.current.pause();
            dispatch(actions.play(false));
        } else {
            audioEls.current.play();
            dispatch(actions.play(true));
        }
    };
    return (
        <div className="flex h-full px-5 bg-main-400 ">
            <div className="flex items-center w-[30%] border border-red-300 gap-[10px]">
                <img src={infoSong?.thumbnail} alt="" className="w-16 h-16 object-cover" />
                <div>
                    <div className="text-sm font-medium mb-[1px] text-[#32323d]">
                        <span>{infoSong?.title}</span>
                    </div>
                    <h3 className="text-xs text-[#696969]">{infoSong?.artistsNames}</h3>
                </div>
                <div className="flex items-center">
                    <Button className="p-[3px] flex w-8 h-8 justify-center items-center">
                        <BsHeart size={16} />
                    </Button>
                    <Button className="p-[3px] flex w-8 h-8 justify-center items-center">
                        <BsThreeDots size={16} />
                    </Button>
                </div>
            </div>
            <div className="flex flex-col w-[40%] items-center justify-center">
                <div className="flex gap-4">
                    <Button className="p-[3px] mx-[7px] cursor-pointer">
                        <RxShuffle size={24} />
                    </Button>
                    <Button className="p-[3px] mx-[7px] cursor-pointer">
                        <BsFillSkipStartFill size={24} />
                    </Button>
                    <Button
                        className="p-1 mx-[7px] cursor-pointer border border-gray-700 rounded-full hover:text-main-500 hover:border-main-500"
                        onClick={handleTogglePlay}
                    >
                        {isPlaying ? <BsPauseFill size={30} /> : <BsFillPlayFill size={30} />}
                    </Button>
                    <Button className="p-[3px] mx-[7px] cursor-pointer">
                        <BsFillSkipEndFill size={24} />
                    </Button>
                    <Button className="p-[3px] mx-[7px] cursor-pointer">
                        <CiRepeat size={24} />
                    </Button>
                </div>
                <div>Progess Bar</div>
            </div>
            <div className="w-[30%] border border-red-300">Volume</div>
        </div>
    );
}

export default Player;
