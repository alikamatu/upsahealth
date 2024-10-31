import { ArrowCircleRightOutlined, ArrowRightRounded } from "@mui/icons-material";

export default function PageRead() {

    return (
        <div className="flex py-6 w-[100%]">
            <div className="flex w-full justify-between">
                <p>Some interesting topics to read</p>
                <ArrowCircleRightOutlined size={30} />
            </div>
        </div>
    )
}