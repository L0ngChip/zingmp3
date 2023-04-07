import { memo } from 'react';
import { SectionItem } from './SectionItem';

function Section({ data }) {
    return (
        <div className="flex flex-col w-full px-[59px] mt-12">
            <div className="flex items-center justify-between mb-5">
                <h3 className="capitalize font-bold text-xl">{data?.title}</h3>
            </div>
            <div className="flex gap-7">
                {data &&
                    data?.items?.length > 0 &&
                    data?.items
                        ?.filter((item, index) => index <= 4)
                        ?.map((item) => (
                            <SectionItem
                                key={item?.encodeId}
                                data={data}
                                thumbnailM={item?.thumbnailM}
                                title={item?.title}
                                link={item?.link}
                                artistsNames={item?.artistsNames}
                                sortDescription={item?.sortDescription}
                            />
                        ))}
            </div>
        </div>
    );
}

export default memo(Section);
