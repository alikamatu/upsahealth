import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useUserContext } from "../context/userContext";

export default function TopNav({toggleSidebar, isSidebarVisible}) {

    const {userAvatar} = useUserContext();

    return (
        <div className="flex w-[100%]">
            <div className="flex w-full items-center justify-between">
                <div className="name-sec">
                    {isSidebarVisible? <AiOutlineClose onClick={toggleSidebar} />: <AiOutlineMenu onClick={toggleSidebar} />}
                </div>
                <div className="not">
                    <img src={userAvatar} className="w-[30px] rounded-full" alt="" />
                </div>
            </div>
        </div>
    )
}