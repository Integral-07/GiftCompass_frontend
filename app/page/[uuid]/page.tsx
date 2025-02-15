import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";

import { unauthorized } from 'next/navigation';

async function getPageData(uuid: string) {
    //const res = await fetch(`/api/gift_compass/page_view/${uuid}/`, { cache: "no-store" });


    //if (!res.ok) {
    //    unauthorized();
   // }

    //return res.json();

    return {
        "uuid": "46d2e5a3-7624-4f55-a520-566f8501498f",
        "title": "Untitled page",
        "template_id": 1,
        "contents": [
            {
                "number": 1,
                "question": "Who are you?",
                "choices": [
                    {
                        "number": 1,
                        "text": "わからない"
                    },
                    {
                        "number": 2,
                        "text": "知っている"
                    }
                ]
            }
        ]
    }
}

interface PageProps {
    params: {
      uuid: string;
    };
  }

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    const page = await getPageData(resolvedParams.uuid);

    if (!page) {
        return <h1>Page not found</h1>;
    }

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
}
