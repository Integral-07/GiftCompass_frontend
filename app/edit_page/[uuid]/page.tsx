'use client'

import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Choice {
    text: string;
}

interface Content {
    question: string;
    choices: Choice[];
}

interface PageData {
    template_id: number;
    title: string;
    contents: Content[];
}

const Page = () => {
    const { uuid } = useParams();
    const [page, setPage] = useState<PageData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const response = await fetch(`/api/gift_compass/page_view/${uuid}/`);
                if (!response.ok) throw new Error("データの取得に失敗しました");
    
                const data = await response.json();

                const mappedContents = Array.isArray(data.contents)
                    ? data.contents.map(item => ({
                          question: item.question,
                          choices: Array.isArray(item.choices)
                              ? item.choices.map(choice => ({ text: choice.text }))
                              : [{ text: "" }]
                      }))
                    : [{ question: "", choices: [{ text: "" }] }];
    
                setPage({
                    ...data,
                    title: data.title,
                    template_id: data.template_id,
                    contents: mappedContents,
                });
            } catch (err) {
                setError("ページを取得できませんでした");
            }
        };
    
        if (uuid) {
            fetchPageData();
        }
    }, [uuid]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (page) {
            setPage({ ...page, title: e.target.value });
        }
    };

    const handleQuestionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (page) {
            const updatedContents = [...page.contents];
            updatedContents[index].question = e.target.value;
            setPage({ ...page, contents: updatedContents });
        }
    };

    const handleChoiceChange = (qIndex: number, cIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (page) {
            const updatedContents = [...page.contents];
            updatedContents[qIndex].choices[cIndex].text = e.target.value;
            setPage({ ...page, contents: updatedContents });
        }
    };

    const addQuestion = () => {
        if (page) {
            setPage({ ...page, contents: [...page.contents, { question: "", choices: [{ text: "" }] }] });
        }
    };

    const removeQuestion = (index: number) => {
        if (page) {
            const updatedContents = page.contents.filter((_, i) => i !== index);
            setPage({ ...page, contents: updatedContents });
        }
    };

    const addChoice = (qIndex: number) => {
        if (page) {
            const updatedContents = [...page.contents];
            updatedContents[qIndex].choices.push({ text: "" });
            setPage({ ...page, contents: updatedContents });
        }
    };

    const removeChoice = (qIndex: number, cIndex: number) => {
        if (page) {
            const updatedContents = [...page.contents];
            updatedContents[qIndex].choices = updatedContents[qIndex].choices.filter((_, i) => i !== cIndex);
            setPage({ ...page, contents: updatedContents });
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/gift_compass/page_save/${uuid}/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(page),
            });
    
            if (!response.ok) throw new Error("保存に失敗しました");
            alert("保存しました！");
        } catch (err) {
            alert("エラーが発生しました");
        }
    };

    if (error) return <h1 className="text-red-500">{error}</h1>;
    if (!page) return <h1>読み込み中...</h1>;

    let TemplateComponent;
    switch (page.template_id) {
        case 1:
            TemplateComponent = Template1;
            break;
        case 2:
            TemplateComponent = Template2;
            break;
        default:
            return <h1>Unknown Template</h1>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">ページ編集</h1>
            
            <label className="block mb-2">
                タイトル:
                <input
                    type="text"
                    value={page.title}
                    onChange={handleTitleChange}
                    className="w-full p-2 border rounded"
                />
            </label>

            {page.contents.map((q, qIndex) => (
                <div key={qIndex} className="p-4 mb-4 border rounded shadow">
                    <label className="block mb-2">
                        質問：
                        <input
                            type="text"
                            value={q.question}
                            onChange={(e) => handleQuestionChange(qIndex, e)}
                            className="w-full p-2 border rounded"
                        />
                    </label>

                    <p>選択肢：</p>
                    {q.choices.map((choice, cIndex) => (
                        <div key={cIndex} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={choice.text}
                                onChange={(e) => handleChoiceChange(qIndex, cIndex, e)}
                                className="w-full p-2 border rounded"
                            />
                            <button onClick={() => removeChoice(qIndex, cIndex)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded">削除</button>
                        </div>
                    ))}

                    <button onClick={() => addChoice(qIndex)} className="px-3 py-1 bg-green-500 text-white rounded">
                        + 選択肢を追加
                    </button>

                    <button onClick={() => removeQuestion(qIndex)} className="ml-2 px-3 py-1 bg-red-500 text-white rounded">
                        削除
                    </button>
                </div>
            ))}

            <button onClick={addQuestion} className="block w-full px-4 py-2 bg-blue-500 text-white rounded mt-4">
                + 質問を追加
            </button>

            <button onClick={handleSave} className="block w-full px-4 py-2 bg-blue-700 text-white rounded mt-4">
                保存
            </button>
        </div>
    );
};

export default Page;
