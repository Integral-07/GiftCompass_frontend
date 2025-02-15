'use client'

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'; // 日本語ロケールを読み込む
import Link from 'next/link'; // Next.js の Link を使用

dayjs.locale('ja'); // dayjsのデフォルトロケールを日本語に設定

const PageList = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    // データを取得する関数
    const fetchPages = async () => {
      try {
        // APIからデータを取得
        const response = await fetch('/api/gift_compass/page_list/');
        const data = await response.json();
        setPages(data);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    };

    fetchPages();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ページ一覧</h1>
      {pages.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ページ名</th>
              <th className="py-2 px-4 border-b">公開日</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.uuid}>
                <td className="py-2 px-4 border-b">
                  <Link href={`/page/${page.uuid}`} className="text-blue-500 hover:underline">
                    {page.title}
                  </Link>
                </td>
                <td className="py-2 px-4 border-b">
                  {dayjs(page.published).format('YYYY年MM月DD日 HH:mm:ss')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>表示するページがありません。</p>
      )}
    </div>
  );
};

export default PageList;
