import { BACKEND_DOMAIN } from "../../common/constants"

const userLoginURL = BACKEND_DOMAIN + "/v1/auth/userLogin"

const Landing = () => {
    return (
        <div className="p-6">
            <h1 className="text-white mb-6 text-3xl">Landing Page of Drive Connect</h1>
            <button className="rounded-[6px] w-[160px] border border-[#939393] py-2 px-3 flex items-center justify-around  hover:shadow-sm hover:border-white text-[#CACACA] hover:text-white shadow-[#7e7e7e] cursor-pointer" onClick={() => { window.location.href = userLoginURL }}>Google Sign In</button>
        </div>
    )
}

export default Landing;