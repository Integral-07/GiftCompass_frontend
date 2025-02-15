'use client'

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = {

    username: string;
    password: string;
    email: string;
};

export default function Page(){

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [authError, setAuthError] = useState("");
    const router = useRouter();

    const handleLogin = (data: FormData) => {

        axios.post("/api/gift_compass/sign", data)
        .then((response)=>{
            router.push("/gift_compass/login");
        })
        .catch(function (error){
            setAuthError("ユーザ名またはパスワードに誤りがあります");
        });
    };
    const onSubmit = (event:any): void =>{

        const data: FormData = {

            username: event.username,
            password: event.password,
            email: event.email,
        };

        handleLogin(data);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md mx-auto">
            {authError && (
                <p className="text-red-500 text-sm">{authError}</p>
            )}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
                <input
                    type="text"
                    id="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    {...register("email", { required: "必須入力です" })}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email?.message?.toString()}</p>
                )}
            </div>
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">ユーザ名</label>
                <input
                    type="text"
                    id="username"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    {...register("username", { required: "必須入力です" })}
                />
                {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username?.message?.toString()}</p>
                )}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</label>
                <input
                    type="text"
                    id="password"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    {...register("password", { required: "必須入力です" })}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password?.message?.toString()}</p>
                )}
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600">ログイン</button>
        </form>
    );
}