import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArrSlider } from '~/utils/fn';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import { Button } from '~/components/Button';
import * as actions from '~/redux/actions';

var intervalId;
function Slider() {
    const { banner } = useSelector((state) => state.app);
    const [isAuto, setIsAuto] = useState(true);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(2);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //animation for banner
    useEffect(() => {
        if (isAuto) {
            intervalId = setInterval(() => {
                handleAnimationSlider(1);
            }, 4000);
        }
        return () => {
            intervalId && clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min, max, isAuto]);

    const handleAnimationSlider = (step) => {
        const sliderEls = document.getElementsByClassName('slider-item');
        const list = getArrSlider(min, max, sliderEls.length - 1);
        for (let i = 0; i < sliderEls.length; i++) {
            //Delete classList animate
            sliderEls[i]?.classList?.remove('animate-slide-right', 'order-last', 'z-30');
            sliderEls[i]?.classList?.remove('animate-slide-left', 'order-first', 'z-10');
            sliderEls[i]?.classList?.remove('animate-slide-left2', 'order-2', 'z-10');

            if (list.some((item) => item === i)) {
                sliderEls[i].style.cssText = `display: block`;
            } else {
                sliderEls[i].style.cssText = `display: none`;
            }
        }
        // Add animation
        list.forEach((item) => {
            if (item === max) {
                sliderEls[item]?.classList?.add('animate-slide-right', 'order-last', 'z-30');
            } else if (item === min) {
                sliderEls[item]?.classList?.add('animate-slide-left', 'order-first', 'z-10');
            } else {
                sliderEls[item]?.classList?.add('animate-slide-left2', 'order-2', 'z-10');
            }
        });
        if (step === 1) {
            setMin((prev) => (prev === sliderEls.length - 1 ? 0 : prev + step));
            setMax((prev) => (prev === sliderEls.length - 1 ? 0 : prev + step));
        }
        if (step === -1) {
            setMin((prev) => (prev === 0 ? sliderEls.length - 1 : prev + step));
            setMax((prev) => (prev === 0 ? sliderEls.length - 1 : prev + step));
        }
    };

    const handleBack = useCallback(
        (step) => {
            intervalId && clearInterval(intervalId);
            setIsAuto(false);
            handleAnimationSlider(step);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [min, max],
    );

    const handleClickBanner = (item) => {
        if (item.type === 1) {
            dispatch(actions.setCurSongId(item.encodeId));
            dispatch(actions.play(true));
            dispatch(actions.setPlaylist(null));
        } else if (item.type === 4) {
            const albumPath = item?.link.split('.')[0];
            navigate(albumPath);
        } else {
            dispatch(actions.setPlaylist(null));
        }
    };

    return (
        <div className="overflow-hidden w-full px-[59px] mb-5 relative">
            <Button
                className="absolute top-1/2 w-[55px] h-[55px] p-2 left-[70px] rounded-[50%] bg-[rgba(255,255,255,0.3)] text-white z-50"
                onClick={() => handleBack(1)}
            >
                <SlArrowLeft size={30} />
            </Button>
            <Button
                className="absolute top-1/2 w-[55px] h-[55px] p-2 right-[70px] rounded-[50%] bg-[rgba(255,255,255,0.3)] text-white z-50"
                onClick={() => handleBack(-1)}
            >
                <SlArrowRight size={30} />
            </Button>
            <div className="flex w-full pt-8 gap-[30px]" onMouseLeave={(e) => setIsAuto(true)}>
                {banner?.map((item, index) => (
                    <img
                        key={item.encodeId}
                        src={item.banner}
                        alt=""
                        onClick={() => handleClickBanner(item)}
                        className={`slider-item flex-1 object-contain rounded-lg w-[30%] ${
                            index <= 2 ? 'block' : 'hidden'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slider;
