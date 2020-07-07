# 時間差トランジション

トランジションフックを使用することで、リストの要素を表示するタイミングをずらす時間差トランジションが行えます。
このコンテンツは、コードが長すぎて書籍から削ったものなので、若干説明も入っています。

## デモ

<client-only>
<demo-block>
  <examples-delay-transition-demo2/>
</demo-block>
</client-only>

## 使用している主な機能

<page-info page="205">リストトランジション</page-info>
<page-info page="212">トランジションフック</page-info>
<page-info page="120">算出プロパティ computed</page-info>

## ソースコード

- [ソースコード](https://github.com/mio3io/cr-vue/tree/master/docs/.vuepress/components/examples/delay-transition)

## 動的なリストを作成

まずは、トランジションを適用する動的なリストを準備しましょう。
リストへの要素の追加と削除、`current` プロパティの倍数の要素のみを抽出する機能を実装しています。

<code-caption>demo0.vue</code-caption>
{include:examples/delay-transition/demo0.vue}

描画上の要素のインデックスをトランジションフックから取得できるように`<li>`タグに`data-index`属性を付与しています。

トランジション用の CSS では、「追加されるときは左からフェードイン」「削除されるときは右へフェードアウト」といったスタイルを定義しています。

<code-caption>style.css</code-caption>
{include:examples/delay-transition/style.css}

## フックでディレイを付与

リストトランジションでは、<mark>各要素に対して</mark>トランジションフックを行うことができます。
インデックス数値に依存したディレイを付与する関数を定義して、フックしましょう。

```html
<transition-group tag="ul" class="list"
  @before-enter="beforeEnter"
  @after-enter="afterEnter"
  @enter-cancelled="afterEnter">
```

```js
methods: {
  // ...
  // トランジション開始でインデックス*100ms分のディレイを付与
  beforeEnter(el) {
    el.style.transitionDelay = 100 * parseInt(el.dataset.index, 10) + 'ms'
  },
  // トランジション完了またはキャンセルでディレイを削除
  afterEnter(el) {
    el.style.transitionDelay = ''
  }
}
```

追加したコードは次のようになります。

<code-caption>demo1.vue</code-caption>
{include:examples/delay-transition/demo1.vue}

<demo-block>
  <examples-delay-transition-demo1/>
</demo-block>

要素の絞り込みを行うだけなら、これだけでも十分です。
しかし、このデモを見ると追加した要素がリストの後半になるほど、その分のディレイが適用されてしまっています。

## 要素を追加するときにディレイを調整

要素を追加するときだけ、ディレイを適用しないように機能を改良してみましょう。

```js
data(){
  return {
    // ...
    // 追加を判断するためのフラグ
    addEnter: false
  }
},
methods: {
  // ...
  doAdd() {
    // 追加ならフラグを立てる
    this.addEnter = true
    const newNumber = Math.max.apply(null, this.list) + 1
    const index = Math.floor(Math.random() * (this.list.length + 1))
    this.list.splice(index, 0, newNumber)
  },
  // ...
  beforeEnter(el) {
    this.$nextTick(() => {
      if (!this.addEnter) {
        // 追加でなければディレイを付ける
        el.style.transitionDelay = 100 * parseInt(el.dataset.index, 10) + 'ms'
      } else {
        // 追加ならフラグを消すだけ
        this.addEnter = false
      }
    })
  }
}
```

修正したコードは次のようになります。

<code-caption>demo2.vue</code-caption>
{include:examples/delay-transition/demo2.vue}

<demo-block>
  <examples-delay-transition-demo2/>
</demo-block>

これで新しく追加した時は、ディレイを付けずトランジションするようになりました！

## コメント

スクロール量に応じた処理や、アニメーション効果はウェブサイトのデザインに拘るなら欠かせない部分です。
仮想 DOM を通して構築される DOM にアクセスする場合 `nextTick` をどこで使うかがキモになります。
`nextTick` の使い方については、CHAPTER4で詳しく説明しています。

<google-ads/>
