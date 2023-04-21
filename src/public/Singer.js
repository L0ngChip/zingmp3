import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsFillPlayFill } from 'react-icons/bs';
import { RiUserAddLine } from 'react-icons/ri';

import { apisGetArtist } from '~/apis';
import { ListItem } from '~/components/ListSong/ListItem';
import { Button } from '~/components/Button';
import { SectionItem } from '~/components/Section/SectionItem';
import { Artist } from '~/components/Artist';
function Singer() {
    const singer = useParams();
    const [singerData, setSingerData] = useState();
    const [difBackground, setDifBackground] = useState();
    const ref = useRef();
    useEffect(() => {
        const fetch = async () => {
            const res = await apisGetArtist(singer?.singer);
            if (res.data.err === 0) {
                setSingerData(res?.data?.data);
            }
        };
        singer && fetch();
    }, [singer]);
    // console.log(singerData);
    useEffect(() => {
        if (singerData?.cover === 'https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/default_cover.png') {
            setDifBackground(singerData?.cover);
        }
    }, [singerData]);
    // console.log(difBackground);
    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, [singer]);
    const handleNumber = (number) => {
        if (number > 1000) {
            return (number / 1000).toFixed(3);
        } else {
            return number;
        }
    };
    // console.log(singerData);
    return (
        <div className="flex gap-10 flex-col w-full relative">
            {difBackground ? (
                <div ref={ref} className="h-[300px] flex relative">
                    <div className="flex w-full justify-center items-center blur-[30px] bg-white">
                        <img src={singerData?.thumbnailM} alt="background" className="h-[250px] object-none" />
                    </div>
                    <div className="absolute h-full bg-[rgba(206,217,217,0.8)] top-0 right-0 bottom-0 left-0 ">
                        <div className="absolute px-[59px] mb-4 h-[140px] right-0 bottom-0 left-0 flex gap-8">
                            <div className="w-[140px] h-[140px]">
                                <img src={singerData?.thumbnail} alt="avatar" className="object-contain rounded-full" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex h-[72px] gap-3 mt-1">
                                    <h3 className="text-6xl font-bold">{singerData?.name}</h3>
                                    <span className="flex w-[52px] h-[52px] items-center justify-center m-1 rounded-full bg-main-500 text-white opacity-80 hover:opacity-100 cursor-pointer">
                                        <BsFillPlayFill className="ml-[5px]" size={32} />
                                    </span>
                                </div>
                                <div className="flex gap-6 mt-[10px] items-center">
                                    <span className="text-sm">{handleNumber(singerData?.totalFollow) + ' quan tâm'}</span>
                                    <Button
                                        leftIcon={<RiUserAddLine />}
                                        className="flex items-center gap-1 px-[19px] py-[2px] border border-gray-400 bg-transparent text-xs font-normal rounded-full cursor-pointer"
                                    >
                                        QUAN TÂM
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div ref={ref} className="w-full relative">
                    <img src={singerData?.cover} alt="background" className="" />
                    <div className="absolute px-[59px] pb-4 h-[116px] right-0 bottom-0 left-0">
                        <div className="flex gap-3 pb-5 mt-[-10px] items-center text-white">
                            <h3 className="text-6xl font-bold">{singerData?.name}</h3>
                            <span className="flex items-center justify-center border p-1 rounded-full bg-white text-main-500 hover:bg-main-500 hover:text-white cursor-pointer">
                                <BsFillPlayFill className="ml-[5px]" size={32} />
                            </span>
                        </div>
                        <div className="flex gap-6 mt-[10px] items-center">
                            <span className="text-white">{handleNumber(singerData?.totalFollow) + ' quan tâm'}</span>
                            <Button
                                leftIcon={<RiUserAddLine />}
                                className="flex items-center gap-1 px-[19px] py-[2px] border border-gray-200 bg-[rgba(0,0,0,0.2)] text-white text-xs font-normal rounded-full cursor-pointer"
                            >
                                QUAN TÂM
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col px-[59px] w-full">
                <h3 className="mb-5 text-lg font-bold">Single & EP</h3>
                <div className="w-full flex flex-wrap justify-between ">
                    {singerData?.sections
                        ?.find((item, index) => item?.sectionId === 'aSongs')
                        ?.items?.filter((item, index) => index <= 5)
                        ?.map((item, index) => (
                            <div key={item.encodeId} className={`flex-auto w-[45%] ${index % 2 !== 0 ? 'pl-[14px]' : 'pr-[14px]'}`}>
                                <ListItem songData={item} isHideAlbum isHideTitle />
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex flex-col px-[59px] w-full">
                <h3 className="mb-5 text-lg font-bold">Playlist/Album</h3>
                <div className="w-full flex gap-3">
                    {singerData?.sections
                        ?.find((item, index) => item?.sectionId === 'aSingle')
                        ?.items?.filter((item, index) => index <= 4)
                        ?.map((item) => (
                            <SectionItem
                                key={item?.encodeId}
                                thumbnailM={item?.thumbnailM}
                                link={item?.link}
                                title={item?.title}
                                releaseDateText={item?.releaseDateText}
                            />
                        ))}
                </div>
            </div>
            <div className="flex flex-col px-[59px] w-full">
                <h3 className="mb-5 text-lg font-bold">Bạn Có Thể Thích</h3>
                <div
                    className="w-full flex items-start
                 gap-5"
                >
                    {singerData?.sections
                        ?.find((item, index) => item?.sectionId === 'aReArtist')
                        ?.items?.filter((item, index) => index <= 4)
                        ?.map((item) => (
                            <Artist
                                key={item?.id}
                                thumbnailM={item?.thumbnailM}
                                artistName={item?.name}
                                totalFollow={item?.totalFollow}
                                link={item?.link}
                            />
                        ))}
                </div>
            </div>
            <div className="flex flex-col px-[59px] w-full">
                <h3 className="mb-5 text-lg font-bold">Bạn Có Thể Thích</h3>
                <div className="w-full flex mb-5 text-sm gap-8">
                    <div className="w-2/5">
                        <img src={singerData?.thumbnailM} alt="thumbnailM" className="object-contain rounded-md" />
                    </div>
                    <div className="flex flex-col w-2/5">
                        <span className="mb-12 text-gray-600 opacity-70">{singerData?.biography}</span>
                        <div className="flex flex-col">
                            <span className="mb-1 text-xl font-bold">{handleNumber(singerData?.totalFollow)}</span>
                            <span className="text-gray-600 opacity-70">Người quan tâm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Singer;
