import { ArrowCircleRightOutlined, ArrowRightRounded } from "@mui/icons-material";
import BookOne from '../assets/book1.png'
import BookTwo from '../assets/book2.png'
import BookThree from '../assets/book3.png'
import BookFoir from '../assets/book4.png'
import BookFive from '../assets/book5.png'
import BookSix from '../assets/book6.png'
import Image from "next/image";

export default function PageRead() {

    return (
        <div className="flex flex-col py-6 w-[100%]">
            <div className="flex w-full justify-between">
                <p>Some interesting topics to read</p>
                <ArrowCircleRightOutlined size={30} />
            </div>
            <div className="flex flex-wrap w-[100%] gap-4 items-center mt-6">
                <Image src={BookOne} alt="Image here" className="w-[15%]" />
                <Image src={BookOne} alt="Image here" className="w-[15%]" />
                <Image src={BookOne} alt="Image here" className="w-[15%]" />
                <Image src={BookOne} alt="Image here" className="w-[15%]" />
                <Image src={BookOne} alt="Image here" className="w-[15%]" />
                <Image src={BookOne} alt="Image here" className="w-[15%]" />
                <Image src={BookOne} alt="Image here" className="w-[15%]" />
            </div>
        </div>
    )
}