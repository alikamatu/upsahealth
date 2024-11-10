export default function EditPage() {

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl mb-10">Edit your profile</h1>
            <form className="flex flex-col gap-8">
                <div className="flex flex-col">
                    <label htmlFor="profileName" className="text-gray-500">Change your profile Name</label>
                    <input type="text" className="border-2 border-gray-400 w-[25%] mt-2 rounded-xl px-2 py-2 text-1xl focus:outline-none bg-transparent" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-gray-500">Change Password</label>
                    <input type="password" className="border-2 border-gray-400 w-[25%] mt-2 rounded-xl px-2 py-2 text-1xl focus:outline-none bg-transparent" />
                </div>
            </form>
        </div>
    )
}