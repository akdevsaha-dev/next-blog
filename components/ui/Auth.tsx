"use client"
import { ChangeEvent, useState } from "react";
import { SignupInput } from "@/app/common/src";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Auth({ type }: { type: "signup" | "signin" }) {
    const router = useRouter();
    const [postInputs, setpostInputs] = useState<SignupInput>({
        userName: "",
        password: "",
        email: "",
    });
    async function sendRequest() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs
            );
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            router.push("/blogs");
        } catch {
            alert("ERROR WHILE SIGNING UP");
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">Create an account</div>
                        <div className="text-slate-500">
                            {type === "signin"
                                ? "Don't have an account?"
                                : "Already have an account?"}
                            <Link
                                className="pl-2 underline"
                                href={type === "signin" ? "/signup" : "/signin"}
                            >
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        {type === "signup" ? (
                            <LabelledInput
                                label="Username"
                                placeholder="Akdev Saha.."
                                onChange={(e) => {
                                    setpostInputs({
                                        ...postInputs,
                                        userName: e.target.value,
                                    });
                                }}
                            />
                        ) : null}
                        <LabelledInput
                            label="Email"
                            placeholder="akdev242@gmail.com"
                            onChange={(e) => {
                                setpostInputs({
                                    ...postInputs,
                                    email: e.target.value,
                                });
                            }}
                        />
                        <LabelledInput
                            label="password"
                            placeholder="12345"
                            onChange={(e) => {
                                setpostInputs({
                                    ...postInputs,
                                    password: e.target.value,
                                });
                            }}
                        />
                        <button
                            onClick={sendRequest}
                            type="button"
                            className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            {type === "signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({
    label,
    placeholder,
    onChange,
    type,
}: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm text-gray-200 font-semibold pt-4">
                {" "}
                {label}
            </label>
            <input
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type={type || "text"}
                placeholder={placeholder}
                required
            />
        </div>
    );
}
