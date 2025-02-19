import { useNavigate } from "react-router-dom";
import { CONTACT_MAIL } from "../../common/constants";

const TermsAndConditions = () => {
    const navigate = useNavigate();

    return (
        <div className='py-5 px-5 md:px-20 roboto-mon'>

            <div className="flex flex-row justify-center items-center px-10 pt-4">
                <span className="text-3xl text-white">Terms & Conditions</span>
                <span className="ml-auto cursor-pointer text-[#CACACA] hover:text-white" onClick={() => navigate("/")}>Go Home</span>
            </div>

            <div className="px-0 md:p-10 pt-0 text-white">
                <p className="py-5"><span className="font-semibold">Last Updated:</span> 19-02-2025</p>

                <h2 className="text-xl font-semibold text-white mt-6">1. Acceptance of Terms</h2>
                <p className="text-[#CACACA]">By using <span className="font-semibold">Drive Connect</span>, you agree to these Terms & Conditions. If you do not agree, please discontinue use.</p>

                <h2 className="text-xl font-semibold text-white mt-8">2. Use of the App</h2>
                <ul className="list-disc list-inside text-[#CACACA] space-y-2">
                    <li><span className="font-semibold">Drive Connect</span> merges multiple Google Drive accounts into a unified storage interface.</li>
                    <li>Users must have valid Google accounts and grant necessary permissions.</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">3. Data Usage & Permissions</h2>
                <ul className="list-disc list-inside text-[#CACACA]">
                    <li>The app only accesses <span className="font-semibold">appDataFolder</span> in connected Drive accounts.</li>
                    <li>Drive Connect <span className="font-semibold">does not</span> access other files unless explicitly shared.</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">4. Limitations & Restrictions</h2>
                <ul className="list-disc list-inside text-[#CACACA]">
                    <li>Users <span className="font-semibold">cannot partially remove</span> a connected Drive account.</li>
                    <li>Upon full removal, <span className="font-semibold">all files and folders managed by Drive Connect will be lost</span>.</li>
                    <li>Each Drive account can only be linked to <span className="font-semibold">one</span> sign-in account.</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">5. Disclaimer & Liability</h2>
                <ul className="list-disc list-inside text-[#CACACA]">
                    <li><span className="font-semibold">No Guarantees:</span> Drive Connect is provided "as-is" with no guarantees of uptime or data recovery.</li>
                    <li><span className="font-semibold">User Responsibility:</span> Users must back up important data separately.</li>
                    <li><span className="font-semibold">Data Loss:</span> We are not responsible for any data loss caused by account removal.</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">6. Termination of Service</h2>
                <p className="text-[#CACACA]">We reserve the right to suspend or terminate access to <span className="font-semibold">Drive Connect</span> if users violate these terms.</p>

                <h2 className="text-xl font-semibold text-white mt-8">7. Contact Us</h2>
                <p className="text-[#CACACA]">For questions, contact us at <span className="font-semibold">{CONTACT_MAIL}</span>.</p>
            </div>
        </div>
    );
};

export default TermsAndConditions;
