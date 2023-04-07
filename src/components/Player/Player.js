/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { BsHeart, BsThreeDots, BsFillSkipStartFill, BsFillSkipEndFill, BsFillPlayFill, BsPauseFill, BsMusicNoteList } from 'react-icons/bs';
import { RiRepeatOneFill } from 'react-icons/ri';
import { RxShuffle } from 'react-icons/rx';
import { CiRepeat } from 'react-icons/ci';
import { SlVolumeOff, SlVolume2 } from 'react-icons/sl';
import moment from 'moment';
import { toast } from 'react-toastify';

import { Button } from '../Button';
import * as apis from '~/apis';
import * as actions from '~/redux/actions';
import { LoadingSong } from '~/components/Icons';

var intervalId;
function Player({ setShowSidebar }) {
    const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
    const [infoSong, setInfoSong] = useState(null);
    const [audio, setAudio] = useState(new Audio());
    const [curSecond, setCurSecond] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState(false);
    const [isLoadedSong, setIsLoadedSong] = useState(true);
    const [volume, setVolume] = useState(100);
    const [isHoverVolume, setIsHoverVolume] = useState(false);
    const dispatch = useDispatch();
    const thumbRef = useRef();
    const trackRef = useRef();
    const volumeRef = useRef();

    useEffect(() => {
        setIsLoadedSong(false);
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([apis.apisGetDetailSong(curSongId), apis.apisGetSong(curSongId)]);
            if (res1.data.err === 0) {
                setInfoSong(res1.data.data);
                dispatch(actions.setCurSongData(res1.data.data));
            }
            setIsLoadedSong(true);
            if (res2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(res2.data.data['128']));
            } else {
                audio.pause();
                setAudio(new Audio());
                dispatch(actions.play(false));
                toast.warn(res2.data.msg);
                setCurSecond(0);
                thumbRef.current.style.cssText = `right: 100%`;
            }
        };

        fetchDetailSong();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curSongId]);

    useEffect(() => {
        intervalId && clearInterval(intervalId);
        audio.pause();
        audio.load();
        if (isPlaying && thumbRef.current) {
            audio.play();
            intervalId = setInterval(() => {
                let percent = Math.round((audio.currentTime * 10000) / infoSong?.duration) / 100;
                thumbRef.current.style.cssText = `right: ${100 - percent}%`;
                setCurSecond(Math.round(audio.currentTime));
            }, 200);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audio]);

    useEffect(() => {
        const handleEnded = () => {
            if (isShuffle) {
                handleShuffleSong();
            } else if (repeatMode) {
                repeatMode === 1 ? handleRepeatOne() : handleNextSong();
            } else {
                audio.pause();
                dispatch(actions.play(false));
            }
        };
        audio.addEventListener('ended', handleEnded);
        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
        // eslint-disable-next-line
    }, [audio, isShuffle, repeatMode]);

    useEffect(() => {
        if (volumeRef.current) {
            volumeRef.current.style.cssText = `right: ${100 - volume}%`;
        }
    }, [volume]);

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

    const handleNextSong = () => {
        if (songs) {
            let currentSongIndex;
            songs?.forEach((item, index) => {
                if (item?.encodeId === curSongId) currentSongIndex = index;
                dispatch(actions.setCurSongId(songs[currentSongIndex + 1]?.encodeId));
                dispatch(actions.play(true));
            });
        }
    };
    const handlePrevSong = () => {
        if (songs) {
            let currentSongIndex;
            songs?.forEach((item, index) => {
                if (item?.encodeId === curSongId) currentSongIndex = index;
                dispatch(actions.setCurSongId(songs[currentSongIndex - 1]?.encodeId));
                dispatch(actions.play(true));
            });
        }
    };

    const handleShuffleSong = () => {
        let randomSongIndex = Math.round(Math.random() * songs.length) - 1;
        dispatch(actions.setCurSongId(songs[randomSongIndex]?.encodeId));
        dispatch(actions.play(true));
    };
    const handleRepeatOne = () => {
        audio.play();
    };
    const handleVolume = (e) => {
        setVolume(e.target.value);
        audio.volume = e.target.value / 100;
    };
    return (
        <div className="flex h-full px-5 bg-main-400 ">
            <div className="flex items-center w-[30%] gap-[10px]">
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
                {/* Xử lý CSS padding và margin */}
                <div className="flex gap-4">
                    <Button
                        onClick={() => setIsShuffle((prev) => !prev)}
                        className={`p-[3px] mx-[7px] cursor-pointer ${isShuffle && 'text-main-500'}`}
                    >
                        <RxShuffle size={24} />
                    </Button>
                    <Button
                        onClick={handlePrevSong}
                        className={`${!songs ? 'p-[3px] mx-[7px] text-gray-500 cursor-default' : 'p-[3px] mx-[7px] cursor-pointer'}`}
                    >
                        <BsFillSkipStartFill size={24} />
                    </Button>
                    <Button
                        className="p-1 mx-[7px] cursor-pointer border border-gray-700 rounded-full hover:text-main-500 hover:border-main-500"
                        onClick={handleTogglePlay}
                    >
                        {!isLoadedSong ? <LoadingSong /> : isPlaying ? <BsPauseFill size={30} /> : <BsFillPlayFill size={30} />}
                    </Button>
                    <Button
                        onClick={handleNextSong}
                        className={`${!songs ? 'p-[3px] mx-[7px] text-gray-500 cursor-default' : 'p-[3px] mx-[7px] cursor-pointer'}`}
                    >
                        <BsFillSkipEndFill size={24} />
                    </Button>
                    <Button
                        onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
                        className={`p-[3px] mx-[7px] cursor-pointer ${repeatMode && 'text-main-500'}`}
                    >
                        {repeatMode === 1 ? <RiRepeatOneFill size={24} /> : <CiRepeat size={24} />}
                    </Button>
                </div>
                <div className="flex w-full justify-center items-center gap-4 text-xs font-medium">
                    <span className="text-gray-400">{moment.utc(curSecond * 1000).format('mm:ss')}</span>
                    <div
                        className="relative w-3/4 h-[3px] hover:h-[8px] rounded-l-full rounded-r-full bg-[#0000001a] cursor-pointer"
                        onClick={handleProgressBar}
                        ref={trackRef}
                    >
                        <div ref={thumbRef} className="absolute top-0 bottom-0 left-0 rounded-l-full rounded-r-full bg-[#0e8080]"></div>
                    </div>
                    <span className="">{moment.utc(infoSong?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className="w-[30%] flex justify-end items-center">
                <div className="flex gap-2 items-center" onMouseEnter={() => setIsHoverVolume(true)} onMouseLeave={() => setIsHoverVolume(false)}>
                    <span>{+volume === 0 ? <SlVolumeOff /> : <SlVolume2 />}</span>

                    <div className={`w-[130px] h-1 bg-white rounded-l-full rounded-r-full ${isHoverVolume ? 'hidden' : 'relative'} `}>
                        <div ref={volumeRef} className="absolute left-0 bottom-0 top-0 bg-main-500"></div>
                    </div>
                    <input
                        type="range"
                        step={1}
                        min={0}
                        max={100}
                        value={volume}
                        onChange={handleVolume}
                        className={` w-[130px] ${isHoverVolume ? 'inline' : 'hidden'}`}
                    />
                </div>
                <span className="w-[1px] h-[33px] mx-5 bg-[#0000000d]"></span>
                <span
                    onClick={() => setShowSidebar((prev) => !prev)}
                    className="flex items-center bg-[#ffffff1a] rounded px-2 border-transparent h-[30px] cursor-pointer"
                >
                    <BsMusicNoteList />
                </span>
            </div>
        </div>
    );
}

export default Player;
