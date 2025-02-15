// components/templates/Template2.tsx

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

const Template2: React.FC<TemplateProps> = ({ page }) => {
  return (
    <div>
      <h1>{page.title}</h1>
      {page.contents.map((content) => (
        <div key={content.number}>
          <h2>{content.question}</h2>
          <ul>
            {content.choices.map((choice) => (
              <li key={choice.number}>{choice.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Template2;
