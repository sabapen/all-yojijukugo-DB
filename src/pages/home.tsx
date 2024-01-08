import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <h1>全四字熟語データベース</h1>
      <h2>全部の四字熟語のデータベースです</h2>
      <p>
        現在、No.1からNo.20,816,369,750,016までの約20兆語が収録されています。
      </p>
      <ul>
        <li>
          <Link to='/all-yojijukugo-DB/search'>全文字一致検索</Link>
        </li>
      </ul>
    </>
  )
}

export default Home
