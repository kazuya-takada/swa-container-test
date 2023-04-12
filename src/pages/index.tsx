import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import axios, { AxiosResponse } from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const Home: NextPage = () => {
  const [number, setNumber] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setNumber(Number(e.target.value));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(
      "process.env.NEXT_PUBLIC_API_BASE_URL",
      process.env.NEXT_PUBLIC_API_BASE_URL
    );
    console.log("BASE_URL", BASE_URL);
    try {
      const response: AxiosResponse<{ number: number }> = await axios.post(
        `${BASE_URL}/double`,
        {
          number,
        }
      );
      const result = response.data.number;
      setResult(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <p className="pb-3 font-bold">
        ※一番最初はコンテナ起動に時間がかかり、数値を結果して返るのに時間かかることがあります（30秒くらい）
      </p>
      <p className="pb-3">
        （逆にいうと、コンテナがずっと起動しているわけではなく、サーバレスであることが確認できる）
      </p>

      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="number"
          value={number}
          onChange={handleChange}
          className="border p-2 rounded-md mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
      {result !== null && (
        <div className="mt-4">
          Result: <strong>{result}</strong>
        </div>
      )}
      <img src="architecture.png" alt="アーキテクチャ図" />
    </div>
  );
};

export default Home;
