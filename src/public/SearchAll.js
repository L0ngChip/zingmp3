import { useSelector } from 'react-redux';
import { handleNumber } from '~/utils/fn';

import { SongItem } from '~/components/NewRelease/SongItem';
import { ListItem } from '~/components/ListSong/ListItem';
import { SectionItem } from '~/components/Section/SectionItem';
import { Artist } from '~/components/Artist';
function SearchAll() {
    const { searchData } = useSelector((state) => state.music);
    // console.log(searchData);
    return (
        <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col px-[59px] w-full">
                <h3 className="mb-5 text-lg font-bold">Nổi Bật</h3>
                <div className="flex gap-8">
                    {searchData?.top && (
                        <div className="p-[10px] flex flex-1 text-xs text-text-secondary font-normal bg-main-200 rounded-md items-center cursor-pointer">
                            <img
                                className={`mr-[10px] w-[84px] h-[84px] object-cover ${
                                    searchData?.top?.objectType === 'artist' ? 'rounded-full' : 'rounded-md'
                                }`}
                                src={searchData?.top?.thumbnail}
                                alt="avatar"
                            />
                            <div className="flex flex-col ml-[6px]">
                                <span className="mb-[6px]">{searchData?.top?.objectType === 'artist' ? 'Nghệ sĩ' : ''}</span>
                                <span className="text-sm font-bold text-main-text">{searchData?.top?.name || searchData?.top?.title}</span>
                                <span className="mt-[2px]">{handleNumber(searchData?.artists[0]?.totalFollow) + ' quan tâm'}</span>
                            </div>
                        </div>
                    )}
                    {searchData?.songs
                        ?.filter((item, index) => [...Array(2).keys()]?.some((i) => i === index))
                        ?.map((item) => (
                            <div key={item.encodeId} className="flex-1">
                                <SongItem
                                    thumbnail={item?.thumbnail}
                                    title={item?.title}
                                    artistsNames={item?.artistsNames}
                                    sid={item.encodeId}
                                    style="bg-main-200"
                                    size="w-[84px] h-[84px]"
                                />
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex flex-col px-[59px] w-full">
                <h3 className="mb-5 text-lg font-bold">Bài Hát</h3>
                <div className="w-full flex flex-wrap justify-between ">
                    {searchData?.songs
                        ?.filter((item, index) => index <= 5)
                        ?.map((item, index) => (
                            <div key={item.encodeId} className={`flex-auto w-[45%] ${index % 2 !== 0 ? 'pl-[14px]' : 'pr-[14px]'}`}>
                                <ListItem songData={item} isHideAlbum />
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex flex-col px-[59px] w-full">
                <h3 className="mb-5 text-lg font-bold">Playlist/Album</h3>
                <div className="w-full flex gap-3">
                    {searchData?.playlists
                        ?.filter((item, index) => index <= 4)
                        ?.map((item) => (
                            <SectionItem
                                key={item?.encodeId}
                                thumbnailM={item?.thumbnailM}
                                link={item?.link}
                                title={item?.title}
                                sortDescription={item?.artistsNames}
                            />
                        ))}
                </div>
            </div>
            <div className="flex flex-col px-[59px] w-full">
                <h3 className="mb-5 text-lg font-bold">Nghệ Sĩ/OA</h3>
                <div
                    className="w-full flex items-start
                 gap-5"
                >
                    {searchData?.artists
                        ?.filter((item, index) => index <= 4)
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
        </div>
    );
}

export default SearchAll;
