import React, { useState } from "react";
import bgImg from "../../assets/bg2.png"
import Starfish from "../../assets/badge/starfish.png"
import Barracuda from "../../assets/badge/barracuda.png"
import Dolphin from "../../assets/badge/dolphin.png"
import Seahorse from "../../assets/badge/seahorse.png"
import Shark from "../../assets/badge/shark.png"
import Swordfish from "../../assets/badge/swordfish.png"
import Seal from "../../assets/badge/seal.png"
import header from "../../assets/logo.png"

const Home = () => {
    const questions = [
        {
            section: "School of fish",
            questions: [
                { id: 1, question: "Are you comfortable putting your face in the water? Can you swim without arm bands?", options: ["Yes", "No"] },
                { id: 2, question: "Can you float on your back and on your front by yourself? Can you kick on your front and back without a float device?", options: ["Yes", "No"] },
                { id: 3, question: "Can you swim in the deep end of the pool? Can you swim on your back for 25m?", options: ["Yes", "No"] },
                { id: 4, question: "Can you swim 25m front crawl breathing on your side for 25m?", options: ["Yes", "No"] },
                { id: 5, question: "Can you swim 50m front crawl? Can you swim 50m backstroke? Can you swim 50m breaststroke?", options: ["Yes", "No"] },
                { id: 6, question: "Can you swim four strokes effortlessly? Can you dive and do correct stroke turns?", options: ["Yes", "No"] },
                { id: 7, question: "Do you want to refine all strokes, turns and skills related to swimming proficiency?", options: ["Yes", "No"] },
            ],
        },
    ];

    const [answers, setAnswers] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0)
    const [error, setError] = useState("");

    const currentSection = questions[currentStep];

    const handleAnswer = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
        setError(""); // Clear any previous error when a question is answered
    };

    const validateCurrentSection = () => {
        const unanswered = currentSection.questions.some((q) => !answers[q.id]);
        if (unanswered) {
            setError("Please answer all questions in this section before proceeding.");
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validateCurrentSection()) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        setError(""); // Clear any errors when navigating back
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        if (validateCurrentSection()) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setSubmitted(true);

            let count = 0;
            for (let i = 0; i < Object.values(answers).length; i++) {
                if (Object.values(answers)[i] === "Yes") {
                    count++;
                }
            }
            setScore(count);
        }
    };

    const handleRetake = () => {
        setAnswers({});
        setCurrentStep(0);
        setSubmitted(false);
        setError("");
    };



    return (
        <div className="w-full flex flex-col items-center min-h-[100vh] bg-gradient-to-b from-blue-100 via-white to-orange-100">
            {/* Header Section */}
            <div className="relative w-full h-[30vh]">
                <img className="w-screen h-[30vh] object-cover top-0 z-[-2]" src={bgImg} />
                <img src={header} alt="header" className="object-cover absolute top-0 z-[1] my-2" />
            </div>

            {/* Main Content Section */}
            <div className="bg-white shadow-xl rounded-xl p-10 w-[90%] md:w-3/4 lg:w-1/2 my-10 border border-gray-200">
                <h1 className="text-[32px] font-bold text-center text-gray-800 mb-2 uppercase tracking-wide">Who Are You?</h1>

                {!submitted ? (
                    <>
                        {/* Current Section */}
                        <h2 className="text-xl font-semibold text-orange-500 mb-6 text-center">
                            {currentSection.section}
                        </h2>

                        {/* Questions List */}
                        <div className="space-y-6">
                            {currentSection.questions.map((q) => (
                                <div
                                    key={q.id}
                                    className="p-6 bg-gray-50 border border-gray-300 rounded-lg hover:shadow-md transition-shadow">
                                    <p className="text-lg font-medium text-gray-700 mb-4">
                                        {q.question.split(" / ").map((line, idx) => (
                                            <span key={idx} className="block">
                                                {line}
                                            </span>
                                        ))}
                                    </p>
                                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {q.options.map((option) => (
                                            <label
                                                key={option}
                                                className="flex items-center text-gray-600 cursor-pointer font-semibold hover:text-orange-500 transition">
                                                <input
                                                    type="radio"
                                                    name={`question-${q.id}`}
                                                    value={option}
                                                    className="mr-2 accent-orange-400"
                                                    onChange={() => handleAnswer(q.id, option)}
                                                    checked={answers[q.id] === option}
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                        {/* Navigation Buttons */}
                        <div className="flex justify-center items-center mt-8">
                            {currentStep > 0 && (
                                <button
                                    onClick={handlePrevious}
                                    className="bg-gray-500 text-white py-2 px-6 rounded-full hover:bg-gray-600 transition">
                                    Previous
                                </button>
                            )}
                            {currentStep < questions.length - 1 ? (
                                <button
                                    onClick={handleNext}
                                    className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition">
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="bg-orange-400 text-white py-2 w-1/4 rounded-lg hover:bg-[#6DA4DA] transition">
                                    Submit
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    /* Submitted State */
                    <div className="text-center flex flex-col items-center space-y-6">
                        <h2 className="text-2xl font-semibold text-orange-500">You Are</h2>
                        <div className="flex flex-col items-center gap-6">
                            <img
                                className="w-1/3 object-cover "
                                src={
                                    score <= 1
                                        ? Starfish : score == 2
                                            ? Seahorse : score == 3
                                                ? Seal : score == 4
                                                    ? Barracuda : score == 5
                                                        ? Swordfish : score == 6
                                                            ? Dolphin : Shark

                                }
                                alt="Badge"
                            />
                            <p className="text-2xl font-bold text-blue-600">{
                                score <= 1
                                    ? "Starfish" : score == 2
                                        ? "Seahorse" : score == 3
                                            ? "Seal" : score == 4
                                                ? "Barracuda" : score == 5
                                                    ? "Swordfish" : score == 6
                                                        ? "Dolphin" : "Shark"
                            }</p>
                        </div>
                        <button
                            onClick={handleRetake}
                            className="bg-orange-400 text-white py-2 w-1/4 rounded-lg hover:bg-[#6DA4DA] transition">
                            Retake Quiz
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

};

export default Home;
