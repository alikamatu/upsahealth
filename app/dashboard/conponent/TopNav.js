import { NotificationsNone, Search } from "@mui/icons-material";

export default function TopNav() {

    return (
        <div className="flex w-[100%]">
            <div className="flex w-full items-center justify-between">
                <div className="name-sec">
                    <h1>Dashboard</h1>
                </div>
                <div className="search-area border-[0px] p-2 rounded-xl w-[25%] flex gap-2">
                    <Search size={30} className="" />
                    <input type="text" className="bg-transparent focus:outline-none text-sm w-[90%]" placeholder="Search something..." />
                </div>
                <div className="not">
                    <NotificationsNone />
                </div>
            </div>
        </div>
    )
}