import { BsFillPlayFill } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';

import { apisGetChartHome } from '~/apis';
import images from '~/assets';
import { NavLink, useParams } from 'react-router-dom';
import { RankList } from '~/components/RankList';
import * as actions from '~/redux/actions';
import { Loading } from '~/components/Loading';

const notActiveStyle = 'hover:text-main-500 font-bold cursor-pointer ';
const activeStyle = 'hover:text-main-500 font-bold items-center cursor-pointer border-b-[3px] border-main-500 text-main-500 h-[52px] flex';
function WeekChart() {
    const { isLoading } = useSelector((state) => state.app);
    const [data, setData] = useState(null);
    const pid = useParams();
    const ref = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchChartData = async () => {
            dispatch(actions.loading(true));
            const res = await apisGetChartHome();
            dispatch(actions.loading(false));
            if (res.data.err === 0) {
                setData(Object.values(res.data.data?.weekChart));
            }
        };
        fetchChartData();
    }, []);
    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, [data]);

    console.log(pid);
    return (
        <div className="">
            <div className="w-full flex flex-col">
                <div className="relative h-[500px]" ref={ref}>
                    <img className="w-full h-[500px] grayscale object-cover" src={images.bgChart2} alt="background" />
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[rgba(206,217,217,0.6)]"></div>
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-[#CED9D9] to-transparent"></div>
                    <div className="absolute px-[60px] pt-10 top-0 right-0 bottom-0 left-0">
                        {isLoading && (
                            <div className="absolute top-1/3 right-0 bottom-0 left-0 z-20 bg-main-200 flex items-center justify-center">
                                <Loading />
                            </div>
                        )}
                        <div className="flex h-[50px] items-center mt-[70px] mb-[30px]">
                            <h3 className="text-4xl font-bold text-main-500">Bảng Xếp Hạng Tuần</h3>
                            <span className="flex w-[52px] h-[52px] items-center justify-center m-1 rounded-full bg-main-500 text-white opacity-80 hover:opacity-100 cursor-pointer">
                                <BsFillPlayFill className="ml-[5px]" size={32} />
                            </span>
                        </div>
                        <div className="h-[60px] flex text-xl font-bold mr-10 items-center gap-8">
                            {data?.map((item) => (
                                <div className="flex justify-center">
                                    <NavLink
                                        key={item?.playlistId}
                                        to={item?.link?.split('.')[0]}
                                        className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
                                    >
                                        {item?.country === 'vn'
                                            ? 'VIỆT NAM'
                                            : item?.country === 'us'
                                            ? 'US-UK'
                                            : item?.country === 'korea'
                                            ? 'K-POP'
                                            : null}
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                        <div className="absolute w-full top-1/2 right-0 bottom-0 left-0 px-[60px] pt-4">
                            <Scrollbars autoHide style={{ width: '100%', height: '150%' }}>
                                <RankList data={data?.find((item) => item?.link?.includes(pid?.pid))?.items} number={40} hideButton />
                            </Scrollbars>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeekChart;
