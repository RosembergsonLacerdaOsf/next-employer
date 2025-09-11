import './header.scss';

const Header = () => {
    return (
        <div className="flex justify-between items-center w-full py-4 sm:px-4 lg:px-[130px] header-container mb-[32px]">
            <div className="flex items-center gap-[8px]">
                <div className="logo w-[32px] h-[32px] rounded-sm bg-primary-color text-white flex items-center justify-center">TD</div>
                <p>Test Doqr</p>
            </div>
            <div className="current-user flex items-center gap-[8px]">
                <div className="user-avatar w-[24px] h-[24px] rounded-full bg-avatar"></div>
                <div>Seu Nome</div>
            </div>
        </div>
    )
}

export default Header;