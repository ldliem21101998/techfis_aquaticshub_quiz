import React, { useState } from "react";
import bgImg from "../../assets/bg.png"

const Home = () => {
    const questions = [
        {
            section: "School of fish",
            questions: [
                { id: 1, question: "Are you comfortable putting your face in the water? / Can you swim without arm bands?", options: ["Yes", "No"] },
                { id: 2, question: "Can you float on your back and on your front by yourself? / Can you kick on your front and back without a float device?", options: ["Yes", "No"] },
                { id: 3, question: "Can you swim in the deep end of the pool? / Can you swim on your back for 25m?", options: ["Yes", "No"] },
                { id: 4, question: "Can you swim 25m front crawl breathing on your side for 25m?", options: ["Yes", "No"] },
                { id: 5, question: "Can you swim 50m front crawl? / Can you swim 50m backstroke? / Can you swim 50m breaststroke?", options: ["Yes", "No"] },
                { id: 6, question: "Can you swim four strokes effortlessly? / Can you dive and do correct stroke turns?", options: ["Yes", "No"] },
                { id: 7, question: "Do you want to refine all strokes, turns and skills related to swimming proficiency?", options: ["Yes", "No"] },
            ],
        },
    ];

    const [answers, setAnswers] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
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
            setSubmitted(true);
        }
    };

    const handleRetake = () => {
        setAnswers({});
        setCurrentStep(0);
        setSubmitted(false);
        setError("");
    };

    return (
        <div className="w-full flex items-center justify-center min-h-[100vh] py-10 relative">
            <img className="w-full h-full object-cover absolute top-0 left-0 z-[-1]" src={bgImg}/>
            <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Who are you</h1>
                {!submitted ? (
                    <>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">{currentSection.section}</h2>
                        {currentSection.questions.map((q) => (
                            <div key={q.id} className="mb-6">
                                <p className="text-lg font-medium text-gray-700">
                                    {q.question.split(" / ").map((line, idx) => (
                                        <span key={idx} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </p>
                                <div className="mt-2">
                                    {q.options.map((option) => (
                                        <label
                                            key={option}
                                            className="block mt-1 text-gray-600 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${q.id}`}
                                                value={option}
                                                className="mr-2"
                                                onChange={() => handleAnswer(q.id, option)}
                                                checked={answers[q.id] === option}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <div className="flex justify-between mt-6">
                            {currentStep > 0 && (
                                <button
                                    onClick={handlePrevious}
                                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                                >
                                    Previous
                                </button>
                            )}
                            {currentStep < questions.length - 1 ? (
                                <button
                                    onClick={handleNext}
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            You are ...
                        </h2>
                        <div className="">
                            <img
                                className="object-cover"
                                src={"http://103.157.218.115/AquaticPicture/Badges/starfish.png"}
                                alt="Starfish Badge"
                            />
                            <div className="flex justify-center items-center">
                                <p className="text-[24px] text-[#55c1ff]">{"Starfish"}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleRetake}
                            className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                        >
                            Retake Quiz
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
