"use client"
import Image from "next/image";
import ProfPhoto from '../assets/prof.JPG';
import ProfTwoPhoto from '../assets/prof2.JPG';
import { StarBorderOutlined } from "@mui/icons-material";
import { AiOutlineComment } from "react-icons/ai";
import { useUserContext } from "../context/userContext";

export default function BlogProfessionals() {

    const {user} = useUserContext();

    return (
        <div className="flex flex-wrap gap-4 w-full">
            <p>Hello, {user.username}, we have suggested some world best Therapist for you</p>
            <div className="w-[100%] flex items-center justify-between border rounded-2xl p-3 border-[#80808042]">
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                    <Image
                        src={ProfTwoPhoto}
                        className="object-cover"
                        alt="professional"
                    />
                </div>
                <div className="flex flex-col items-start justify-start w-[50%]">
                    <div className="text-sm font-bold">Alikamatu Osama
                    </div>
                    <div className="flex">
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    </div>
                    <p className="text-xs text-gray-500">adipisicing elit. Dignissimos recusandae, odio ab totam deleniti dolores at possimus voluptatibus molestias placeat.</p>
                </div>
                <button>
                        <AiOutlineComment size={30} className="text-gray-400" />
                    </button>
            </div>
            <div className="w-[100%] flex gap-5 items-center justify-between border rounded-2xl p-3 border-[#80808042]">
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                    <Image
                        src={ProfPhoto}
                        className="object-cover"
                        alt="professional"
                    />
                </div>
                <div className="flex flex-col items-start justify-start w-[50%]">
                    <div className="text-xs font-bold">Jane Doe
                    </div>
                    <div className="flex">
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    <StarBorderOutlined size={4} className="text-yellow-600" />
                    </div>
                    <p className="text-xs text-gray-500">consectetur adipisicing elit. Dignissimos recusandae, odio ab totam deleniti dolores at possimus voluptatibus molestias placeat.</p>
                </div>
                <button>
                        <AiOutlineComment size={30} className="text-gray-400" />
                    </button>
            </div>
        </div>
    );
}
