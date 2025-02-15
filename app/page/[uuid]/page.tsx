'use client'

import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const Page = () => {
    const { uuid } = useParams(); // URLからUUIDを取得
    const [page, setPage] = useState<{ template_id: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const response = await fetch(`/api/gift_compass/page_view/${uuid}/`);
                if (!response.ok) throw new Error("データの取得に失敗しました");

                const data = await response.json();
                setPage(data);
            } catch (err) {
                setError("ページを取得できませんでした");
            }
        };

        if (uuid) {
            fetchPageData();
        }
    }, [uuid]);

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

    return <TemplateComponent page={page} />;
};

export default Page;
