import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import joyokanjis from '../references/joyokanji.json'

const NumSearch = () => {
  const [searchedYojijukugo, setSearchedYojijukugo] = useState('')
  const [searchedYojijukugoId, setSearchedYojijukugoId] = useState(0)

  const handleSearch = (event, formData) => {
    event.preventDefault()
    if (!AssertYojijukugoId(formData.yojijukugoId)) {
      alert(
        '入力されたIDが正しくありません。1~20,816,369,750,016の数字で入力してください。',
      )
      return
    }
    setSearchedYojijukugoId(formData.yojijukugoId)
    setSearchedYojijukugo(getYojijukugoById(formData.yojijukugoId))
  }

  return (
    <>
      <h1>ID検索</h1>
      <h2>検索したい四字熟語のIDを入力してください。</h2>
      <div>
        <IdForm handleSearch={handleSearch} />
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

export default NumSearch

function IdForm({ handleSearch }) {
  const [formData, setFormData] = useState({
    yojijukugoId: 1,
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
          type='number'
          name='yojijukugoId'
          value={formData.yojijukugoId}
          onChange={handleChange}
        />
      </label>
      <button type='submit'>検索</button>
    </form>
  )
}

interface joyokanji {
  kanjiId: number
  kanji: string
}

const joyokanjiArray: joyokanji[] = Object.keys(joyokanjis).map(
  (key: string) => ({
    kanjiId: parseInt(key),
    kanji: joyokanjis[key],
  }),
)

function AssertYojijukugoId(yojijukugoId: number): boolean {
  if (1 <= yojijukugoId && yojijukugoId <= joyokanjiArray.length ** 4) {
    return true
  } else {
    return false
  }
}

function getYojijukugoById(yojijukugoId: number): string {
  const kanjiIds = [
    Math.floor((yojijukugoId - 1) / joyokanjiArray.length ** 3) + 1,
    Math.floor(
      ((yojijukugoId - 1) % joyokanjiArray.length ** 3) /
        joyokanjiArray.length ** 2,
    ) + 1,
    Math.floor(
      ((yojijukugoId - 1) % joyokanjiArray.length ** 2) / joyokanjiArray.length,
    ) + 1,
    Math.floor((yojijukugoId - 1) % joyokanjiArray.length) + 1,
  ]
  const yojijukugo = kanjiIds
    .map(
      (kanjiId) =>
        joyokanjiArray.find((joyokanji) => joyokanji.kanjiId === kanjiId)!
          .kanji,
    )
    .join('')
  return yojijukugo
}
