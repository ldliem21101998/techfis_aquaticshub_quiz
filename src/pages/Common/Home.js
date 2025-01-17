import React, { useState } from "react";
import bgImg from "../../assets/bg2.png";
import Starfish from "../../assets/badge/starfish.png";
import Barracuda from "../../assets/badge/barracuda.png";
import Dolphin from "../../assets/badge/dolphin.png";
import Seahorse from "../../assets/badge/seahorse.png";
import Shark from "../../assets/badge/shark.png";
import Swordfish from "../../assets/badge/swordfish.png";
import Seal from "../../assets/badge/seal.png";
import header from "../../assets/logo.png";
import logoSchoolOfFish from "../../assets/logo_schooloffish.png";
import uk from "../../assets/language/uk.png";
import vn from "../../assets/language/vn.png";

const Home = () => {
    const questionsEn = [
        { id: 1, question: "Are you comfortable putting your face in the water?", options: ["Yes", "No"] },
        { id: 2, question: "Can you float on your back and on your front by yourself?", options: ["Yes", "No"] },
        { id: 3, question: "Can you swim in the deep end of the pool?", options: ["Yes", "No"] },
        { id: 4, question: "Can you swim 25m front crawl breathing on your side for 25m?", options: ["Yes", "No"] },
        { id: 5, question: "Can you swim 50m front crawl, 50m backstroke and 50m breaststroke?", options: ["Yes", "No"] },
        { id: 6, question: "Can you swim four strokes effortlessly?", options: ["Yes", "No"] },
        { id: 7, question: "Do you want to refine all strokes, turns and skills related to swimming proficiency?", options: ["Yes"] },
    ];

    const questionsVi = [
        { id: 1, question: "Bạn có cảm thấy thoải mái khi nhúng mặt xuống nước không?", options: ["Có", "Không"] },
        { id: 2, question: "Bạn có thể tự nổi ngửa và nổi sấp không?", options: ["Có", "Không"] },
        { id: 3, question: "Bạn có thể bơi chạm đáy bể không?", options: ["Có", "Không"] },
        { id: 4, question: "Bạn có thể bơi sải 25m và thở nghiêng trong 25m đó không?", options: ["Có", "Không"] },
        { id: 5, question: "Bạn có thể bơi sải, ếch và ngửa trong 50m không?", options: ["Có", "Không"] },
        { id: 6, question: "Bạn có thể bơi bốn kiểu một cách dễ dàng không?", options: ["Có", "Không"] },
        { id: 7, question: "Bạn có muốn nâng cao tất cả các kiểu bơi, lượt quay và kỹ năng liên quan đến khả năng bơi lội không?", options: ["Có"] },
    ];

    const [language, setLanguage] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const questions = language === "en" ? questionsEn : questionsVi;

    const handleAnswer = (answer) => {
        if (answer === (language === "en" ? "Yes" : "Có")) {
            setScore(score + 1);
            if (currentStep < questions.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                setSubmitted(true);
            }
        } else {
            setSubmitted(true);
        }
    };

    const handleRetake = () => {
        setCurrentStep(0);
        setScore(0);
        setSubmitted(false);
        setLanguage(null);
    };

    const handleLanguageSelection = (lang) => {
        setLanguage(lang);
    };

    return (
        <div className="w-full flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-100 via-white to-orange-100">
            {/* <div className="relative w-full h-[30vh]">
                <img className="w-screen h-[30vh] object-cover top-0 z-[-2]" src={bgImg} alt="Background" />
                <img src={header} alt="header" className="object-cover absolute top-0 z-[1] my-2" />
            </div> */}

            <div className="bg-white shadow-xl rounded-xl p-10 w-[90%] md:w-3/4 lg:w-1/2 my-10 border border-gray-200">
                <div className="w-full flex items-center justify-center flex-col">
                    <img src={logoSchoolOfFish} className="w-[200px]" />
                    <div className="text-[20px] font-bold text-gray-800 mb-6 uppercase">School of fish</div>
                </div>
                {!language ? (
                    <div className="text-center">
                        <h1 className="text-[32px] font-bold text-gray-800 mb-6 uppercase">Level Finder</h1>
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={() => handleLanguageSelection("en")}
                                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
                                <div className="flex gap-2 justify-center items-center">
                                    <div>Start</div>
                                    <img src={uk} className="w-[20px]" />
                                </div>
                            </button>
                            <button
                                onClick={() => handleLanguageSelection("vi")}
                                className="bg-orange-400 text-white py-2 px-6 rounded-lg hover:bg-orange-500 transition">
                                <div className="flex gap-2 justify-center items-center">
                                    <div>Bắt đầu</div>
                                    <img src={vn} className="w-[20px]" />
                                </div>
                            </button>
                        </div>
                    </div>
                ) : !submitted ? (
                    <>
                        <h2 className="text-xl font-semibold text-orange-500 mb-6 text-center">
                            {questions[currentStep].question}
                        </h2>

                        <div className="space-y-6">
                            {questions[currentStep].options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleAnswer(option)}
                                    className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 text-lg font-medium text-gray-700 transition">
                                    {option}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center flex flex-col items-center space-y-6">
                        <h2 className="text-2xl font-semibold text-orange-500">{language == "vi" ? "Bạn là" : "You Are"}</h2>
                        <div className="flex flex-col items-center gap-6">
                            <img
                                className="w-1/3 object-cover"
                                src={
                                    score < 1
                                        ? Starfish
                                        : score === 1
                                            ? Seahorse
                                            : score === 2
                                                ? Seal
                                                : score === 3
                                                    ? Barracuda
                                                    : score === 4
                                                        ? Swordfish
                                                        : score === 5
                                                            ? Dolphin
                                                            : Shark
                                }
                                alt="Badge"
                            />
                            <p className="text-2xl font-bold text-blue-600">
                                {
                                    score < 1
                                        ? "Starfish"
                                        : score === 1
                                            ? "Seahorse"
                                            : score === 2
                                                ? "Seal"
                                                : score === 3
                                                    ? "Barracuda"
                                                    : score === 4
                                                        ? "Swordfish"
                                                        : score === 5
                                                            ? "Dolphin"
                                                            : "Shark"
                                }
                            </p>
                        </div>
                        <button
                            onClick={handleRetake}
                            className="bg-orange-400 text-white py-2 px-6 rounded-lg hover:bg-orange-500 transition">
                            {language == "vi" ? "Đánh giá lại" : "Retake Quiz"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
