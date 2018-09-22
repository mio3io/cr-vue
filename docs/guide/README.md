
# コードと動作デモについて

このページでは「基礎から学ぶ Vue.js」の解説で使用している、サンプルコードと動作デモの一部を公開しています。
主に、長めのコードのコピペ＆動作デモの確認用ページのため、<mark>コードの内容や機能についての解説はしていません</mark>。
書籍と合わせて読んでいただけたら嬉しいです🐹

コードを探したい場合は、ヘッダーの検索フォームに見出しの名前を入力すると見つけやすいです。
掲載してない場合もあります😢

## 学習のポイント

本書は、読み書きしながら最終的に何かが完成する、といったチュートリアルの内容ではありません。
基本的に各セクションのコードは、機能を説明するための断片的なコードになっています。

単純にコードを書き写したり、動作を確認するだけではなく「<mark>別にエラーになっても構わない！</mark>」という気持ちで、プロパティやメソッドを追加したり、テンプレートを自由に書き換えてみましょう。
エラーになった場合は、コンソールにどんなメッセージが表示されているか確認してみましょう。
どんなコードが、どんなエラーを引き起こすかを知ることも大切です！

## エラーがおきてしまった！

まずは、コンソールを見てどんなメッセージが表示されているかを確認してみましょう。
多くの場合、ここに表示されるファイル名＆行番号とメッセージがヒントとなり、エラーを解決できます。
英語で表示されますが、Google翻訳などを使って、必ず読むようにしましょう。

また、学習中に起きるエラーの原因の多くは、次のようなケースです。

- 不要なテンプレートやプロパティが残っていた
- プロパティやメソッドを記述する場所が間違っていた

基本的に、セクションのコードを追加していく形でも問題ありませんが、セクションによって使用するプロパティ名がかぶることがあります。
エラーが起きる場合に、それまでの余分なコードを消してから必要なコードのみを記述してみましょう。

`... undefined` というエラーは「○○が定義されていません」といった内容ですが、「絶対合っているはずなのに、なぜかこのエラーが出てしまう😠」ということがあります。
実は、<mark>本当にこのエラーの通り</mark>で、よく見たら「算出プロパティを `methods` の中に書いてしまっていた」「消したプロパティをまだテンプレートで使っていた」というようなミスもありがちなので確認してみましょう！

## 書籍とサポートページの差異について

書籍では、簡潔なコードにするため、説明に直接関係のないオプションを省略している部分がいくつかありますが、このページではなるべくすべてを記述するようにしています。

また、装飾用のスタイルを付加したり、見た目を調整していることがあります。
そのため、<mark>書籍のコードと完全に一致するとは限らない</mark>ことを、ご了承下さい。

書籍のコードのすべてを掲載しているわけではなく、解説中の短いコードは除外しています。

## オンラインエディタを活用しよう

- [CodePen](https://codepen.io/)
- [JSFiddle](https://jsfiddle.net/)
- [CodeSandbox](https://codesandbox.io/)

Fork してご利用下さい。

- [https://codepen.io/mio3io/pen/rvgwzv](https://codepen.io/mio3io/pen/rvgwzv)
- [https://jsfiddle.net/mio/rd5nzwdt/](https://jsfiddle.net/mio/rd5nzwdt/)
- [https://codesandbox.io/s/vue](https://codesandbox.io/s/vue)

## Vue.js のバージョンについて

書籍ではバージョン「2.5.13」を使用していますが、2018/5 時点の最新バージョン「2.5.16」でも動作確認済みです。

## あわせて読むとはかどる書籍

本書の前提知識を満たしていない方や、あわせて読むとよりはかどりそうな書籍です。

### プログラミング自体はじめてに近い方

- [スラスラ読める JavaScript ふりがなプログラミング（リブロワークス・及川卓也 著）](https://amzn.to/2viWuHt) 式がどんな意味を持つのか？から学べます。

### HTML や CSS 自体をしっかりと学ぶ

- [HTML5/CSS3モダンコーディング（吉田真麻 著）](https://amzn.to/2M7AsBn) ある程度 HTML/CSS はできるけど、もうちょっとちゃんと学びたいという方にオススメ。

### JavaScript 自体をしっかりと学ぶ

- [JavaScript本格入門 ~モダンスタイルによる基礎から現場での応用まで（山田祥寛 著）](https://amzn.to/2n7solM) ある程度 JavaScript はできるけど、もうちょっとちゃんと学びたいという方にオススメ。

### Git や GitHub の使い方がわからない！

- [わかばちゃんと学ぶ Git使い方入門（湊川あい 著）](https://amzn.to/2OJ4ytd) 漫画と図解を使って楽しく解説されています。

### Node.js や webpack についてもっと詳しく

- [Webデザイナーの仕事を楽にする! gulpではじめるWeb制作ワークフロー入門（中村勇希 著）](https://amzn.to/2MmP7pb) 本書ではサクッとしか書いていないコマンドラインの使い方についてより詳しく解説されています。

### セキュリティについて学ぶ

- [体系的に学ぶ 安全なWebアプリケーションの作り方（徳丸浩 著）](https://amzn.to/2KsBnXR) 改訂で JavaScript についても追加されてます😄


## 正誤表

すでに見つかっている誤植です。
大変申し訳ありません🙇‍

第二刷では修正済みです。

<table class="missprint">
  <thead><tr><th class="h-ch">CH</th><th class="h-page">ページ</th><th class="h-comment">誤</th><th class="h-comment">正</th></tr></thead>
  <tbody>
  <tr>
    <td>2</td>
    <td>76</td>
    <td><code>a.id > b.id ? a.id:b.id</code> </td>
    <td><code>a > b.id ? a:b.id</code></td>
  </tr>
  <tr>
    <td>8</td>
    <td>259</td>
    <td><code>store.state.count</code> </td>
    <td><code>store.state.message</code></td>
  </tr>
  <tr>
    <td>8</td>
    <td>259～</td>
    <td colspan="2">259～262 ページのコアコンセプトのセクションで使用している <code>Vuex.Store()</code> コンストラクタの閉じ括弧「<code>)</code>」（コードの一番最後の文字）が不足していました</td>
  </tr>
  <tr>
    <td>8</td>
    <td>259</td>
    <td><code>a.price > b.price ? a.price:b.price</code> </td>
    <td><code>a > b.price ? a:b.price</code></td>
  </tr>
  <tr>
    <td>8</td>
    <td>267</td>
    <td><code>store.dispatch('doUpdate', event.target.value)</code></td>
    <td><code>this.$store.dispatch('doUpdate', event.target.value)</code></td>
  </tr>
  </tbody>
</table>

書籍中の誤記については、書籍2ページに記載されている「『基礎から学ぶ Vue.js』サポート係」までご連絡ください。

サポートページの誤記については、[サポートページのリポジトリ](https://github.com/mio3io/cr-vue) Issues / PullRequest または、筆者の Twitter までご連絡ください。

- [GitHub サポートページ Issues](https://github.com/mio3io/cr-vue/issues)
- [筆者 Twitter](https://twitter.com/mio3io)

## 質問について

書籍中の Vue.js に関する技術的な質問については、サポートページのリポジトリ Issues または、筆者の Twitter までお気軽にどうぞ！
質問の際、質問内容の該当ページをお書き下さい。
書籍と関係のない質問については、お答えできない場合があります。
ご了承下さい🙏

- [GitHub サポートページ Issues](https://github.com/mio3io/cr-vue/issues)
- [筆者 Twitter](https://twitter.com/mio3io)
