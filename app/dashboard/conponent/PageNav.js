import Image from "next/image";
import Link from "next/link";
import AsessmentPhoto from '../assets/assess.png';
import BlogPhoto from '../assets/blogs.png';
import ChatPhoto from '../assets/chat.png';
import BotPhoto from '../assets/AI.jpg';
import LibraryPhoto from '../assets/library.png';
import ProfessionalPhoto from '../assets/professionals.png';

export default function PageNav() {
    return (
        <div className="flex flex-col">
            <h1 className="py-4 text-2xl font-semibold text-gray-800 dark:text-white">
                Hello, Alikamatu Osama, What are we doing today?
            </h1>
            <div className="sections-container w-[100%] flex flex-wrap mt-8 gap-4 items-start">
                <Link href="/dashboard/self-assessment" className="w-[23%] rounded-2xl overflow-hidden">
                    <div className="relative">
                        <Image src={AsessmentPhoto} alt="Self-Assessment" className="relative object-cover dark:opacity-80 scale-[104%] hover:scale-[100%]" />
                        <div className="absolute bottom-0 flex flex-col text-white p-2 items-start">
                            <p className="title py-2 text-xl">Self-Assessment</p>
                            <p>Evaluate your mental well-being through a quick self-assessment tailored to your needs.</p>
                            <button className="w-full bg-blue-400 text-white py-2 rounded-lg">Get Started</button>
                        </div>
                    </div>
                </Link>
                
                <Link href="/dashboard/chatbot" className="w-[23%] rounded-2xl overflow-hidden">
                    <div className="relative">
                        <Image src={BotPhoto} alt="AI Assistance" className="relative object-cover dark:opacity-80 scale-[104%] hover:scale-[100%]" />
                        <div className="absolute bottom-0 flex flex-col text-white p-2 items-start">
                            <p className="title py-2 text-xl">AI Assistance</p>
                            <p>Chat with our AI assistant for mental wellness guidance and helpful resources.</p>
                            <button className="w-full bg-blue-400 text-white py-2 rounded-lg">Talk to AI</button>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/community-chat" className="w-[23%] rounded-2xl overflow-hidden">
                    <div className="relative">
                        <Image src={ChatPhoto} alt="Community Chat" className="relative object-cover dark:opacity-80 scale-[104%] hover:scale-[100%]" />
                        <div className="absolute bottom-0 flex flex-col text-white p-2 items-start">
                            <p className="title py-2 text-xl">Community Chat</p>
                            <p>Engage in meaningful conversations with a supportive mental wellness community.</p>
                            <button className="w-full bg-blue-400 text-white py-2 rounded-lg">Join Chat</button>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/blog" className="w-[23%] rounded-2xl overflow-hidden">
                    <div className="relative">
                        <Image src={BlogPhoto} alt="Blogging" className="relative object-cover dark:opacity-80 scale-[104%] hover:scale-[100%]" />
                        <div className="absolute bottom-0 flex flex-col text-white p-2 items-start">
                            <p className="title py-2 text-xl">Anonymous Blogging</p>
                            <p>Share your experiences and read insights from others in a safe, anonymous space.</p>
                            <button className="w-full bg-blue-400 text-white py-2 rounded-lg">Start Blogging</button>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/library" className="w-[23%] rounded-2xl overflow-hidden">
                    <div className="relative">
                        <Image src={LibraryPhoto} alt="Library" className="relative object-cover dark:opacity-80 scale-[104%] hover:scale-[100%]" />
                        <div className="absolute bottom-0 flex flex-col text-white p-2 items-start">
                            <p className="title py-2 text-xl">Mental Wellness Library</p>
                            <p>Explore a curated library of articles and guides on mental health and wellness.</p>
                            <button className="w-full bg-blue-400 text-white py-2 rounded-lg">Explore Library</button>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/professionals" className="w-[23%] rounded-2xl overflow-hidden">
                    <div className="relative">
                        <Image src={ProfessionalPhoto} alt="Professional Help" className="relative object-cover dark:opacity-80 scale-[104%] hover:scale-[100%]" />
                        <div className="absolute bottom-0 flex flex-col text-white p-2 items-start">
                            <p className="title py-2 text-xl">Consult a Professional</p>
                            <p>Connect with licensed professionals who can provide personalized support and advice.</p>
                            <button className="w-full bg-blue-400 text-white py-2 rounded-lg">Get Help</button>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
