import { memo, useEffect, useRef, useState } from 'react';
import { apisGetChartHome } from '~/apis';
import { BsFillPlayFill } from 'react-icons/bs';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import _ from 'lodash';

import images from '~/assets';
import { SongItem } from '~/components/NewRelease/SongItem';
import { RankList } from '~/components/RankList';

function WeekChart() {
    const [chartData, setChartData] = useState(null);
    const [data, setData] = useState(null);
    const [selected, setSelected] = useState(null);
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });

    const chartRef = useRef();

    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: 0 },
                grid: { color: 'rgba(0, 0, 0, 0.3)', drawTicks: false },
                min: chartData?.RTChart?.chart?.minScore,
                max: chartData?.RTChart?.chart?.maxScore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: { color: 'gray' },
                grid: { color: 'transparent' },
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef || !chartRef.current) return;
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) setTooltipState((prev) => ({ ...prev, opacity: 0 }));
                        return;
                    }
                    const counters = [];
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]
                                ?.filter((item) => +item?.hour % 2 === 0)
                                ?.map((item) => item?.counter),
                            encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i],
                        });
                    }
                    const rs = counters.find((i) => i.data.some((n) => n === +tooltip.body[0]?.lines[0]?.replace(',', '')));
                    setSelected(rs.encodeId);
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    };
                    if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData);
                },
            },
        },
        hover: {
            mode: 'dataset',
            intersect: false,
        },
    };
    useEffect(() => {
        const fetchChartData = async () => {
            const res = await apisGetChartHome();
            if (res.data.err === 0) {
                setChartData(res.data.data);
            }
        };
        fetchChartData();
    }, []);
    useEffect(() => {
        const labels = chartData?.RTChart?.chart?.times?.filter((item) => +item?.hour % 2 === 0)?.map((item) => `${item?.hour}:00`);
        const datasets = [];
        if (chartData?.RTChart?.chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]
                        ?.filter((item) => item?.hour % 2 === 0)
                        ?.map((item) => item?.counter),
                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 4,
                    pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    pointHoverBorderWidth: 4,
                });
            }
            setData({ labels, datasets });
        }
    }, [chartData]);
    return (
        <div className="">
            <div className="w-full flex flex-col">
                <div className="relative h-[500px]">
                    <img className="w-full h-[500px] grayscale object-cover" src={images.bgChart} alt="background" />
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[rgba(206,217,217,0.9)]"></div>
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-[#CED9D9] to-transparent"></div>
                    <div className="absolute px-[60px] top-[20%] right-0 bottom-[60%] left-0">
                        <div className="flex h-[72px] gap-2 mt-1 items-center">
                            <h3 className="text-4xl font-bold text-main-500">#zingchart</h3>
                            <span className="flex w-[52px] h-[52px] items-center justify-center m-1 rounded-full bg-main-500 text-white opacity-80 hover:opacity-100 cursor-pointer">
                                <BsFillPlayFill className="ml-[5px]" size={32} />
                            </span>
                        </div>
                    </div>

                    <div className="absolute top-[40%] right-0 bottom-0 left-0 px-[60px]">
                        {data && <Line data={data} ref={chartRef} options={options} />}
                        <div
                            className="tooltip"
                            style={{
                                top: tooltipState.top,
                                left: tooltipState.left,
                                opacity: tooltipState.opacity,
                                position: 'absolute',
                            }}
                        >
                            <SongItem
                                thumbnail={chartData?.RTChart?.items?.find((i) => i.encodeId === selected)?.thumbnail}
                                title={chartData?.RTChart?.items?.find((i) => i.encodeId === selected)?.title}
                                artistsNames={chartData?.RTChart?.items?.find((i) => i.encodeId === selected)?.artistsNames}
                                sid={chartData?.RTChart?.items?.find((i) => i.encodeId === selected)?.encodeId}
                                style="bg-[rgba(255,255,255,0.7)]"
                                size="w-[40px] h-[40px]"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full px-[60px] pb-[30px]">
                    <RankList data={chartData?.RTChart?.items} number={10} />
                </div>
                <div className="relative h-[550px]">
                    <div className="absolute">
                        <img className="grayscale h-[550px]" src={images.bgChart2} alt="background" />
                    </div>
                    <div className="absolute bg-[rgba(206,217,217,0.8)] top-0 right-0 bottom-0 left-0"></div>
                    <div className="absolute px-[60px] pt-10 right-0 left-0">
                        <div className="flex h-[50px] gap-2 mb-5 items-center">
                            <h3 className="text-4xl font-bold text-main-500">Bảng Xếp Hạng Tuần</h3>
                        </div>
                    </div>
                    <div className="absolute px-[60px] top-[20%] right-0 bottom-0 left-0 flex gap-5">
                        {chartData?.weekChart &&
                            Object.entries(chartData?.weekChart)?.map((item, index) => (
                                <div key={index} className="flex-1 bg-[rgba(255,255,255,0.6)] mb-[30px] px-[10px] py-5 rounded-2xl flex-col">
                                    <div className="flex pb-[10px] pl-8">
                                        <span className="text-2xl text-main-500 font-bold">
                                            {item[0] === 'vn' ? 'Việt Nam' : item[0] === 'us' ? 'US-UK' : item[0] === 'korea' ? 'K Pop' : ''}
                                        </span>
                                        <span className="flex w-[29px] h-[29px] items-center justify-center m-1 rounded-full bg-main-500 text-white opacity-80 hover:opacity-100 cursor-pointer">
                                            <BsFillPlayFill className="" size={20} />
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <RankList number={4} hideTitle={true} data={item[1]?.items} link={item[1]?.link} />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeekChart;
