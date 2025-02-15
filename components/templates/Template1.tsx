// components/templates/Template1.tsx

// types.ts

export interface Choice {
    owner: string; // 適切な型に置き換えてください
    number: number;
    text: string;
  }
  
  export interface Content {
    owner: string; // 適切な型に置き換えてください
    number: number;
    question: string;
    choices: Choice[];
  }
  
  export interface Page {
    uuid: string;
    owner: string; // 適切な型に置き換えてください
    template_id: number;
    title: string;
    published: string; // Date 型を使用する場合は適宜調整してください
    contents: Content[];
  }
  

interface TemplateProps {
  page: Page;
}

const Template1: React.FC<TemplateProps> = ({ page }) => {
    return (
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-3xl font-semibold text-center mb-6">{page.title}</h1>
          <form>

          {page.contents.map((content: Content) => (
              <div key={content.number} className="mb-6">
              <h2 className="text-2xl font-medium mb-4">{content.question}</h2>
              <ul className="space-y-4">
                {content.choices.map((choice) => (
                    <li key={choice.number} className="flex items-center">
                    <input
                      id={`choice-${choice.number}`}
                      type="radio"
                      name={`question-${content.number}`}
                      value={choice.number}
                      className="peer hidden accent-blue-500"
                      />
                    <label
                      htmlFor={`choice-${choice.number}`}
                      className="flex items-center cursor-pointer text-gray-700 text-lg"
                      >
                      <span className="w-5 h-5 mr-3 border-2 border-gray-300 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
                        <span className="w-3 h-3 bg-white rounded-full opacity-0 peer-checked:opacity-100"></span>
                      </span>
                      {choice.text}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </form>
        </div>
      );
};

export default Template1;
