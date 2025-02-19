import { useNavigate } from "react-router-dom"
import { CONTACT_MAIL } from "../../common/constants"

const PrivacyPolicy = () => {
    const navigate = useNavigate();
    return (
        <div className='py-5 px-5 md:px-20 roboto-mon'>

            <div className="flex flex-row justify-center items-center px-10 pt-4">
                <span className="text-3xl text-white">Privacy Policy</span>
                <span className="ml-auto cursor-pointer text-[#CACACA] hover:text-white" onClick={() => navigate("/")}>Go Home</span>
            </div>
            <div className="px-0 md:p-10 pt-0 text-white">
                <p className="py-5"><span className="font-semibold">Last Updated:</span> 19-02-2025</p>
                <h2 className="text-xl font-semibold text-white mt-6">1. Introduction</h2>
                <p className="text-[CACACA]">Welcome to <span className="font-semibold">Drive Connect</span>. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your data.</p>

                <h2 className="text-xl font-semibold text-white mt-8">2. Data We Collect</h2>
                <ul className="list-disc list-inside text-[CACACA] space-y-2">
                    <li><span className="font-semibold">Sign-in Information:</span> Email, name, profile photo (via Google Sign-In).</li>
                    <li><span className="font-semibold">Google Drive Connection Data:</span> Access token, refresh token, and email.</li>
                    <li><span className="font-semibold">Metadata:</span> File and folder metadata stored in our app.</li>
                    <li><span className="font-semibold">Usage Data:</span> Basic analytics for improving performance.</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">3. How We Use Your Data</h2>
                <ul className="list-disc list-inside text-[CACACA]">
                    <li>To authenticate users via Google Sign-In.</li>
                    <li>To manage and distribute files across connected Google Drive accounts.</li>
                    <li>To store metadata for file organization (actual files remain in Drive).</li>
                    <li>To provide a seamless experience by streaming files on request.</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">4. Data Storage & Security</h2>
                <p className="text-[CACACA]">We <span className="font-semibold">do not store</span> your files; they remain in your Google Drive accounts. Access tokens are securely stored and used only for file management.</p>

                <h2 className="text-xl font-semibold text-white mt-8">5. Limitations & User Responsibility</h2>
                <ul className="list-disc list-inside text-[CACACA]">
                    <li>All connected Drive accounts must be removed together, resulting in data loss from Drive Connect.</li>
                    <li>The app assumes all Drive accounts have the same storage capacity.</li>
                    <li>A Drive account can only be linked to one sign-in account.</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">6. Contact Us</h2>

                <p>For questions, contact us at <span className="font-semibold">{CONTACT_MAIL}</span>.</p>
            </div>
        </div>
    )
}

export default PrivacyPolicy