import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import joyokanjis from '../references/joyokanji.json'

const Search = () => {
  const [searchedYojijukugo, setSearchedYojijukugo] = useState('')

  const handleSearch = (event, formData) => {
    event.preventDefault()
    if (!AssertYojijukugo(formData.yojijukugo)) {
      alert('入力された四字熟語が正しくありません。常用漢字四文字で入力してください。')
      return;
    }
    setSearchedYojijukugo(formData.yojijukugo)
  }

  return (
    <>
      <h1>完全一致検索</h1>
      <h2>検索したい四字熟語を四文字の漢字で入力してください。（常用漢字のみ対応しています。）</h2>
      <div>
        <YojijukugoForm handleSearch={handleSearch} />
      </div>
      <div>
        <p>
          <Link to='/all-yojijukugo-DB/'>トップに戻る</Link>
        </p>
      </div>
      {/* 検索ボタンが押されたら結果を表示する */}
      {searchedYojijukugo && (
        <div>
          <p>ID: {0}</p>
          <p>四字熟語: {searchedYojijukugo}</p>
        </div>
      )}
    </>
  )
}

export default Search

function YojijukugoForm({ handleSearch }) {
  const [formData, setFormData] = useState({
    yojijukugo: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event) => {
    handleSearch(event, formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type='text'
          name='yojijukugo'
          value={formData.yojijukugo}
          onChange={handleChange}
        />
      </label>
      <button type='submit'>検索</button>
    </form>
  )
}

interface joyokanji {
  id: number,
  kanji: string,
}

const joyokanjiArray: joyokanji[] = Object.keys(joyokanjis).map((key: string) => ({
  id: parseInt(key),
  kanji: joyokanjis[key],
}))

function AssertYojijukugo(yojijukugo: string): boolean {
  const str = [...yojijukugo]
  // 四字熟語は四文字であること
  if (str.length !== 4) {
    return false;
  }
  // 常用漢字であること
  for (let i = 0; i < str.length; i++) {
    if (!joyokanjiArray.some((joyokanji) => joyokanji.kanji === str[i])) {
      return false;
    }
  }
  return true;
}
