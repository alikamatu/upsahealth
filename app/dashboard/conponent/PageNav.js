"use client"
import Image from "next/image";
import Link from "next/link";
import AsessmentPhoto from '../assets/ass.jpg';
import BlogPhoto from '../assets/community.jpg';
import ChatPhoto from '../assets/chatcom.jpg';
import BotPhoto from '../assets/aih.jpg';
import LibraryPhoto from '../assets/lib.jpg';
import ProfessionalPhoto from '../assets/professionals.png';
import { useUserContext } from "../context/userContext";

export default function PageNav() {

    const { user } = useUserContext();

    const cards = [
        {
            href: "/dashboard/self-assessment",
            image: AsessmentPhoto,
            title: "Self-Assessment",
            description: "Evaluate your skills and track your progress.",
        },
        {
            href: "/dashboard/blog",
            image: ChatPhoto,
            title: "Write To The World",
            description: "Share your thoughts and inspire others.",
        },
        {
            href: "/dashboard/chatroom",
            image: BlogPhoto,
            title: "Meet the Community",
            description: "Connect, collaborate, and grow together.",
        },
        {
            href: "/dashboard/library",
            image: LibraryPhoto,
            title: "Read Mindful",
            description: "Discover curated resources to expand your knowledge.",
        },
        {
            href: "/dashboard/ai",
            image: BotPhoto,
            title: "Chatbot Assistance",
            description: "Get instant help powered by AI.",
        },
        {
            href: "/dashboard/professionals",
            image: ProfessionalPhoto,
            title: "Reach Professionals",
            description: "Connect with experts and mentors in your field.",
        },
    ];

    return (
        <div className="page flex flex-col justify-center">
            <h1 className="py-4 text-2xl font-semibold text-white">
                Hello, {user.username}, What are we doing today?
            </h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-6 items-start">
                {cards.map((card, index) => (
                    <Link 
                        key={index} 
                        href={card.href} 
                        className={`relative group w-full rounded-2xl h-[250px] md:h-[350px] overflow-hidden bg-cover bg-center 
                                    animate-fade-in-down`}
                        style={{
                            animationDelay: `${index * 100}ms`,
                            animationFillMode: 'both',
                        }}
                    >
                        <Image 
                            src={card.image} 
                            alt={card.title} 
                            className="object-cover brightness-75 w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-5 left-5 right-5 text-white bg-black/50 p-4 rounded-lg backdrop-blur-md transition-all duration-500 transform group-hover:translate-y-0 group-hover:opacity-100 opacity-0 -translate-y-[-5px]">
                            <p className="text-2xl md:text-3xl font-bold">{card.title}</p>
                            <p className="text-sm md:text-base mt-2 text-gray-300">{card.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
