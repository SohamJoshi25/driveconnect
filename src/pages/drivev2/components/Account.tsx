import { Account as TAccount } from '../types/types.js';

import { BACKEND_DOMAIN } from '../../../common/constants.js';

import _Accounts from "../accounts.json";
import { useUserContext } from '../context/UserProvider.js';

type Props = {
  token: string;
  logout: () => void;
}

const Account = ({ token, logout }: Props) => {

  const Accounts: TAccount[] = _Accounts;

  const { email, name, picture } = useUserContext();

  const addAccount = () => {
    window.location.href = BACKEND_DOMAIN + `/v1/auth/accountlogin?token=${token}`;
  }

  return (
    <div className="flex flex-col gap-2 justify-start items-start p-2 h-screen pt-5 pl-5 text-lg mr-4">
      <div className='flex justify-between items-start w-full mb-10'>
        <div className='flex flex-col gap-2'>
          <span className="text-white cursor-pointer text-2xl">{name}</span>
          <span className="text-white text-xs break-words">{email}</span>
        </div>
        <img height={50} width={50} className="rounded-full" src={picture} alt="User Profile Picture" />
      </div>


      <div>
        <span className="text-white text-[18px]">Connected Drive Accounts</span>
        <div className='my-4 flex flex-col gap-1'>
          {Accounts.map((account, idx) => {
            return <div className='text-[#CACACA] text-sm flex justify-between items-center' key={idx}>
              <span className='hover:text-white'>{account.email}</span>
            </div>
          })}
        </div>
        {Accounts.length <= 10 && <span className="text-[#CACACA] hover:text-blue-500 cursor-pointer text-sm" onClick={addAccount}>Add Account</span>}
      </div>

      <span className="text-[#CACACA] hover:text-white cursor-pointer mt-auto mb-2" onClick={logout}>Logout</span>
    </div>
  )
}

export default Account;