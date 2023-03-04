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
import moment from 'moment';
import { toast } from 'react-toastify';

import * as apis from '~/apis';
import { Button } from '../Button';
import * as actions from '~/redux/actions';

var intervalId;
function Player() {
    const { curSongId, isPlaying } = useSelector((state) => state.music);
    const [infoSong, setInfoSong] = useState(null);
    const [audio, setAudio] = useState(new Audio());
    const [curSecond, setCurSecond] = useState(0);
    const dispatch = useDispatch();
    const thumbRef = useRef();
    const trackRef = useRef();

    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([apis.apisGetDetailSong(curSongId), apis.apisGetSong(curSongId)]);
            if (res1.data.err === 0) {
                setInfoSong(res1.data.data);
            }
            if (res2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(res2.data.data['128']));
            } else {
                setAudio(new Audio());
                dispatch(actions.play(false));
                toast.warn(res2.data.msg);
                setCurSecond(0);
                thumbRef.current.style.cssText = `right: 100%`;
            }
        };

        fetchDetailSong();
    }, [curSongId]);

    useEffect(() => {
        intervalId && clearInterval(intervalId);
        audio.pause();
        audio.load();
        if (isPlaying) {
            audio.play();
            intervalId = setInterval(() => {
                let percent = Math.round((audio.currentTime * 10000) / infoSong?.duration) / 100;
                thumbRef.current.style.cssText = `right: ${100 - percent}%`;
                setCurSecond(Math.round(audio.currentTime));
            }, 200);
        }
    }, [audio]);

    const handleTogglePlay = () => {
        if (isPlaying) {
            audio.pause();
            dispatch(actions.play(false));
        } else {
            audio.play();
            dispatch(actions.play(true));
        }
    };

    const handleProgressBar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect();
        const percent = Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) / 100;
        audio.currentTime = (percent * infoSong.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSecond(Math.round((percent * infoSong.duration) / 100));
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
            <div className="flex flex-col w-[40%] items-center justify-center gap-4">
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
                <div className="flex w-full justify-center items-center gap-4 text-xs font-medium">
                    <span className="text-gray-400">{moment.utc(curSecond * 1000).format('mm:ss')}</span>
                    <div
                        className="relative w-3/4 h-[3px] hover:h-[8px] rounded-l-full rounded-r-full bg-[#0000001a]"
                        onClick={handleProgressBar}
                        ref={trackRef}
                    >
                        <div
                            ref={thumbRef}
                            className="absolute top-0 bottom-0 left-0 rounded-l-full rounded-r-full bg-[#0e8080]"
                        ></div>
                    </div>
                    <span className="">{moment.utc(infoSong?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className="w-[30%] border border-red-300">Volume</div>
        </div>
    );
}

export default Player;
