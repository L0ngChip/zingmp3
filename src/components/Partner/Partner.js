import { useSelector } from 'react-redux';

import images from '~/assets';
import { PartnerItem } from './PartnerItem';

function Partner() {
    const { currentWidth } = useSelector((state) => state.app);
    return (
        <div className="flex items-center w-full px-[59px] mt-12">
            <div className="flex flex-col w-full">
                <h3 className="flex text-xs font-bold mb-6 uppercase text-gray-500 items-center justify-center tracking-widest cursor-pointer hover:text-main-500">
                    đối tác âm nhạc
                </h3>
                <div className={`grid ${currentWidth < 1240 ? 'grid-cols-4' : ' grid-cols-8'} gap-4`}>
                    <PartnerItem logo={images.partner1} />
                    <PartnerItem logo={images.partner2} />
                    <PartnerItem logo={images.partner3} />
                    <PartnerItem logo={images.partner4} />
                    <PartnerItem logo={images.partner5} size />
                    <PartnerItem logo={images.partner6} />
                    <PartnerItem logo={images.partner7} />
                    <PartnerItem logo={images.partner8} />
                    <PartnerItem logo={images.partner9} />
                    <PartnerItem logo={images.partner10} size />
                    <PartnerItem logo={images.partner11} size />
                    <PartnerItem logo={images.partner12} />
                    <PartnerItem logo={images.partner13} />
                    <PartnerItem logo={images.partner14} />
                    <PartnerItem logo={images.partner15} size />
                    <PartnerItem logo={images.partner16} size />
                </div>
            </div>
        </div>
    );
}

export default Partner;
