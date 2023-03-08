import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Section() {
    const { todaySelection } = useSelector((state) => state.app);
    const navigate = useNavigate();
    return (
        <div className="flex flex-col w-full px-[59px] mt-12 ">
            <div className="flex items-center mb-5">
                <h3 className="capitalize font-bold text-xl">{todaySelection?.title}</h3>
            </div>
            <div className="flex gap-7">
                {todaySelection &&
                    todaySelection?.items?.length > 0 &&
                    todaySelection?.items?.map((item) => (
                        <div
                            className="flex flex-col w-1/5 flex-auto"
                            onClick={() => navigate(item?.link.split('.')[0])}
                            key={item?.encodeId}
                        >
                            <img
                                src={item?.thumbnailM}
                                alt="avatar"
                                className="w-full h-auto rounded-lg cursor-pointer"
                            />
                            <div className="mt-3 text-sm">
                                <h4 className="mb-1 font-bold hover:text-main-500 cursor-pointer">{item?.title}</h4>
                                <h3 className="font-normal text-gray-500">{`${item?.sortDescription?.slice(
                                    0,
                                    40,
                                )}...`}</h3>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default memo(Section);
