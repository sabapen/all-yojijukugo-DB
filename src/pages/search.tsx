import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Search = () => {
  const [searchedYojijukugo, setSearchedYojijukugo] = useState('')

  const handleSearch = (event, formData) => {
    event.preventDefault()
    setSearchedYojijukugo(formData.yojijukugo)
  }

  return (
    <>
      <h1>完全一致検索</h1>
      <h2>検索したい四字熟語を四文字の漢字で入力してください。</h2>
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
