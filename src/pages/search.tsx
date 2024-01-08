import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  return (
    <>
      <h1>完全一致検索</h1>
      <h2>検索したい四字熟語を四文字の漢字で入力してください。</h2>
      <div>
        <MyForm />
      </div>
      <div>
        <p>
          <Link to='/all-yojijukugo-DB/'>トップに戻る</Link>
        </p>
      </div>
    </>
  )
}

export default Search

function MyForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // フォームの送信処理を行う
    console.log(formData); // 例として、コンソールにフォームデータを表示
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          name="yojijukugo"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <button type="submit">検索</button>
    </form>
  );
}