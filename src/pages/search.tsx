import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import joyokanjis from '../references/joyokanji.json'
import { get } from 'http'

const Search = () => {
  const [searchedYojijukugo, setSearchedYojijukugo] = useState('')
  const [searchedYojijukugoId, setSearchedYojijukugoId] = useState(0)

  const handleSearch = (event, formData) => {
    event.preventDefault()
    if (!AssertYojijukugo(formData.yojijukugo)) {
      alert('入力された四字熟語が正しくありません。常用漢字四文字で入力してください。')
      return;
    }
    setSearchedYojijukugo(formData.yojijukugo)
    setSearchedYojijukugoId(getYojijukugoId(formData.yojijukugo));
  }

  return (
    <>
      <h1>完全一致検索</h1>
      <h2>
        検索したい四字熟語を四文字の漢字で入力してください。（常用漢字のみ対応しています。）
      </h2>
      <div>
        <YojijukugoForm handleSearch={handleSearch} />
      </div>
      {/* 検索ボタンが押されたら結果を表示する */}
      {searchedYojijukugo && (
        <div>
          <p>ID: {searchedYojijukugoId}</p>
          <p>四字熟語: {searchedYojijukugo}</p>
        </div>
      )}
      <div>
        <p>
          <Link to='/all-yojijukugo-DB/'>トップに戻る</Link>
        </p>
      </div>
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
  kanjiId: number,
  kanji: string,
}

const joyokanjiArray: joyokanji[] = Object.keys(joyokanjis).map((key: string) => ({
  kanjiId: parseInt(key),
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

function getYojijukugoId(yojijukugo: string): number {
  const str = [...yojijukugo]
  const kanjiIds = str.map((kanji) => joyokanjiArray.find((joyokanji) => joyokanji.kanji === kanji)!.kanjiId)
  const yojijukugoId =
    (kanjiIds[0] - 1) * joyokanjiArray.length ** 3 +
    (kanjiIds[1] - 1) * joyokanjiArray.length ** 2 +
    (kanjiIds[2] - 1) * joyokanjiArray.length +
    (kanjiIds[3] - 1)
    + 1;
  return yojijukugoId;
}