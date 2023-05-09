function PartnerItem({ logo, size }) {
    return (
        <div className="h-[80px] mb-[30px] bg-white border rounded-lg flex items-center justify-center relative">
            <div className="absolute px-2 top-0 right-0 bottom-0 left-0 flex items-center justify-center">
                <img className={`w-full ${size ? 'h-[70px]' : ''} object-contain`} src={logo} alt="logoPartner" />
            </div>
        </div>
    );
}

export default PartnerItem;
