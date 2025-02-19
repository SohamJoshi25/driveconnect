import { Navigate, useNavigate } from "react-router-dom"
import { BACKEND_DOMAIN } from "../../common/constants"
import GraphicSVG from "./assets/GraphicSVG"

const userLoginURL = BACKEND_DOMAIN + "/v1/auth/userLogin"

//

const Landing = () => {
    const navigate = useNavigate();
    const handletnc = () => {
        navigate("/terms-and-conditions")
    }
    const handlepp = () => {
        navigate("/privacy-policy")
    }
    return (
        <div className="flex justify-center flex-col items-center mt-10 roboto-mono gap-y-10 text-white text-[18px]">

            <div className="mx-10 sm:mx-20 md:mx-30 lg:mx-80">
                <h1 className="text-white text-7xl [text-shadow:_2px_2px_2px_rgb(43_127_255)]">Drive Connect</h1>
                <h1 className="text-white w-full text-right text-md">Connect Drives for more space</h1>
            </div>

            <div className="flex justify-between flex-col-reverse items-center md:flex-row gap-10 md:gap-20 lg:gap-30 mt-10 md:my-10 mx-20 md:mx-30 lg:mx-80">
                <div className="text-white text-[17px] text-start w-[350px] roboto-mono">
                    <span>Our app loves you to connect multiple drive accounts and use all of your drive account storage via out app. This also helps to reduce a phenomena called as <span className="italic">fragmentation of memory </span> which occurs due to parcel usage of drive resulting into restricted storage in spite of having the totalspace.</span>
                    <div className="pt-6 pb-4 text-[16px]">Start Using our app now.</div>
                    <button className="rounded-[6px] text-sm w-[160px] border border-[#939393] py-2 px-2 flex items-center justify-around  hover:shadow-sm hover:border-white text-[#CACACA] hover:text-white shadow-[#7e7e7e] cursor-pointer" onClick={() => { window.location.href = userLoginURL }}>Google Sign In</button>
                    <span className="text-xs mt-4 line-clamp-3">By Signing in you aggree to all <span className="cursor-pointer underline underline-offset-2 decoration-blue-500" onClick={handletnc}>terms and conditions</span> and have read and understood our <span className="cursor-pointer underline underline-offset-2 decoration-blue-500" onClick={handlepp}>privacy policy</span>.</span>
                </div>
                <GraphicSVG></GraphicSVG>
            </div>

            <h2 className="text-[16px] mt-16 mx-10 md:mx-30 lg:mx-80">
                What's special about our app is the security we provide, we break your files into small units called as chunks and store them in your own drives so your data remains with with you.and In fact even Google can't access this data inside your drive as this data is only available to our app.The app allows you to have multiple drive account storage while having the abstraction of using a single one.
            </h2>

            <h2 className="text-[16px] mx-10 md:mx-30 lg:mx-80">
                What's special about our app is the security we provide, we break your files into small units called as chunks and store them in your own drives so your data remains with with you.and In fact even Google can't access this data inside your drive as this data is only available to our app.The app allows you to have multiple drive account storage while having the abstraction of using a single one.
            </h2>

            <h2 className="text-[16px] pb-30 mx-10 md:mx-30 lg:mx-80">
                This project started from a personal motivation to not to use multiple Google accounts and have a single point of abstraction of UI.
            </h2>

            <div className="w-full bg-black h-42 flex justify-between items-center md:px-20 px-10 max-[525px]:gap-10">
                <div className="flex text-xs flex-col gap-1 text-[#CACACA] w-20 md:w-fit">
                    <span className="hover:text-white cursor-pointer">Github</span>
                    <span className="hover:text-white cursor-pointer">Linkedin</span>
                    <span className="hover:text-white cursor-pointer">My Website</span>
                    <span className="hover:text-white cursor-pointer">Contact</span>
                </div>
                <div className="text-lg md:text-xl"> Soham Joshi</div>
                <div className="flex text-xs flex-col gap-1 text-[#CACACA]">
                    <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-white cursor-pointer">Terms and Conditions</span>
                </div>
            </div>

        </div>
    )
}

export default Landing;