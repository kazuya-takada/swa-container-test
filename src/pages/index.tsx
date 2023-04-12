import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import axios, { AxiosResponse } from "axios";

// NEXT_PUBLIC_API_BASE_URLは/apiにする
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
      <p className="pb-3">
        client:4000 → double-api:3000 → dapr-api-sidecar:3500 →
        add-api-sidecar:3501 → add-api:3500
      </p>
      <p className="pb-3">
        例えば、double-apiとdapr-api-sidecarは一つのポッドになる。（ポッドはコンテナの集まり。double-apiとdapr-api-sidecarはそれぞれコンテナになるので、このポッドには2つのコンテナが存在する）
      </p>
      <p className="pb-3">
        ポッドは同じホストになるため、ローカルホスト通信ができる。そのうえでサイドカーとサイドカーはid指定でいい感じに探してくれる
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
    </div>
  );
};

export default Home;
