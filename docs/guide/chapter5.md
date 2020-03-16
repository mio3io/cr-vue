---
sidebarDepth: 2
title: CHAPTER 5
---

# CH5 コンポーネントで UI 部品を作る

## S23 コンポーネント間の通信 / 親から子

<page-info page="155～160"/>

<code-caption>コンポーネントでプロパティを受け取るためのprops定義</code-caption>
```js
Vue.component('comp-child', {
  // テンプレートで受け取ったvalを使用
  template: '<p>{{ val }}</p>',
  // 受け取る属性名を指定
  props: ['val']
})
```

<code-caption>プロパティとして文字列を渡す</code-caption>
```html
<comp-child val="これは子A"></comp-child>
<comp-child val="これは子B"></comp-child>
```

<code-caption>プロパティとしてデータを渡す</code-caption>
```html
<comp-child :val="valueA"></comp-child>
<comp-child :val="valueB"></comp-child>
```

```js
new Vue({
  el: '#app',
  data: {
    valueA: 'これは子A',
    valueB: 'これは子B'
  }
})
```

<demo-block demo="guide-ch5-demo01"/>

※ プロパティでの受け取り方は同じ


### コンポーネントをリストレンダリング

<page-info page="157"/>

#### 子コンポーネント

```js
Vue.component('comp-child', {
  template: '<li>{{ name }} HP.{{ hp }}</li>',
  props: ['name', 'hp']
})
```

```html
<ul>
  <comp-child v-for="item in list"
    v-bind:key="item.id"
    v-bind:name="item.name"
    v-bind:hp="item.hp"></comp-child>
</ul>
```

#### 親コンポーネント

```js
new Vue({
  el: '#app',
  data: {
    list: [
      { id: 1, name: 'スライム', hp: 100 },
      { id: 2, name: 'ゴブリン', hp: 200 },
      { id: 3, name: 'ドラゴン', hp: 500 }
    ]
  }
})
```

<demo-block demo="guide-ch5-demo02"/>

#### エラーになるパターン

```js
Vue.component('comp-child', {
  template: '<li>{{ name }} HP.{{ hp }}\
  <button v-on:click="doAttack">攻撃する</button></li>',
  props: ['name', 'hp'],
  methods: {
    doAttack: function () {
      // 勝手に攻撃！
      this.hp -= 10 // -> [Vue warn] error!
    }
  }
})
```

### propsの受け取りデータ型を指定する

<page-info page="159"/>

書籍では表化していませんでしたが、見やすいようにまとめなおし＆加筆しています。

#### データ型一覧

特定のコンストラクタのインスタンスであるかをチェックできます。

|データ型|説明|例|
|---|---|---|
|String|文字列|`'1'`|
|Number|数値|`1`|
|Boolean|真偽値|`true`, `false`|
|Function|関数|`function() {}`|
|Object|オブジェクト|`{ name: 'foo' }`|
|Array|配列|`[1, 2, 3]`, `[{ id: 1 }, { id: 2 }]`|
|カスタム|インスタンス|`new Cat()`|
|null|すべての型|`1`, `'1'`, `[1]`|

<code-caption>タイプチェックを省略した場合</code-caption>
```js
Vue.component('example', {
  props: ['value'] // どんな型も受け入れる
})
```

<code-caption>データ型のみチェックする場合</code-caption>
```js
Vue.component('example', {
  props: {
    value: データ型
  }
})
```

<code-caption>インスタンスのチェック</code-caption>
```js
function Cat(name) {
  this.name = name
}
Vue.component('example', {
  props: {
    value: Cat // 猫データのみ許可！
  }
})
new Vue({
  data: {
    value: new Cat('たま') // valueは猫データ
  }
})
```
```html
<example v-bind:value="value"></example>
```

#### オプション一覧

|オプション|データ型|説明|
|---|---|---|
|type|データ型, 配列|許可するデータ型、配列で複数可能|
|default|データ, 関数|デフォルトの値|
|required|Boolean|必須にする|
|validator|関数|カスタムバリデータ関数、チェックして真偽値を返す|


<code-caption>その他のオプションも使用する場合</code-caption>
```js
Vue.component('example', {
  props: {
    value: {
      type: [String, Number],
      default: 100,
      required: true,
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```

::: tip

想定しない型も受け取ってしまうと、使用するときに毎回最初からチェックする必要があったり、エラーになる場所が増えてしまう。
それなら、想定していないものと分かった時点で、早めにエラーにしてしまう方が対処しやすいね🐾

:::

## S23 コンポーネント間の通信 / 子から親

<page-info page="161～165"/>

### 子のイベントを親にキャッチさせる

<page-info page="161"/>

#### 子コンポーネント

<code-caption>子が自分のイベントを起こす</code-caption>
```js
Vue.component('comp-child', {
  template: '<button v-on:click="handleClick">イベント発火</button>',
  methods: {
    // ボタンのクリックイベントのハンドラでchilds-eventを発火する
    handleClick: function () {
      this.$emit('childs-event')
    }
  }
})
```

#### 親コンポーネント

<code-caption>親のテンプレート</code-caption>
```html
<comp-child v-on:childs-event="parentsMethod"></comp-child>
```

<code-caption>親側で受け取る</code-caption>
```js
new Vue({
  el: '#app',
  methods: {
    // childs-eventが発生した！
    parentsMethod: function () {
      alert('イベントをキャッチ！ ')
    }
  }
})
```

<demo-block demo="guide-ch5-demo03"/>

### 親が持つデータを操作しよう

<page-info page="163"/>

<code-caption>子コンポーネント</code-caption>
```js
Vue.component('comp-child', {
  template: '<li>{{ name }} HP.{{ hp }}\
  <button v-on:click="doAttack">攻撃する</button></li>',
  props: {
    id: Number,
    name: String,
    hp: Number
  },
  methods: {
    // ボタンのクリックイベントのハンドラから$emitでattackを発火する
    doAttack: function () {
      // 引数として自分のIDを渡す
      this.$emit('attack', this.id)
    }
  }
})
``` 

<code-caption>親コンポーネント</code-caption>
```html
<ul>
  <comp-child v-for="item in list"
    v-bind:key="item.id"
    v-bind="item"
    v-on:attack="handleAttack"></comp-child>
</ul>
```

```js
new Vue({
  el: '#app',
  data: {
    list: [
      { id: 1, name: 'スライム', hp: 100 },
      { id: 2, name: 'ゴブリン', hp: 200 },
      { id: 3, name: 'ドラゴン', hp: 500 }
    ]
  },
  methods: {
    // attackが発生した！
    handleAttack: function (id) {
      // 引数のIDから要素を検索
      var item = this.list.find(function (el) {
        return el.id === id
      })
      // HPが0より多ければ10減らす
      if (item !== undefined && item.hp > 0) item.hp -= 10
    }
  }
})
```

## S23 コンポーネント間の通信 / 非親子

<page-info page="165～166"/>

```js
var bus = new Vue({
  data: {
    count: 0
  }
})
Vue.component('component-b', {
  template: '<p>bus: {{ bus.count }}</p>',
  computed: {
    // busのデータを算出プロパティに使用
    bus: function () {
      return bus.$data
    }
  },
  created: function () {
    bus.$on('bus-event', function () {
      this.count++
    })
  }
})
```

## S23 コンポーネント間の通信 / その他

<page-info page="166～168"/>

### 子コンポーネントを参照する$refs

<page-info page="166"/>

<code-caption>親コンポーネント</code-caption>
```html
<comp-child ref="child">
```

```js
new Vue({
  el: '#app',
  methods: {
    handleClick: function () {
      // 子コンポーネントのイベントを発火
      this.$refs.child.$emit('open')
    }
  }
})
```

<code-caption>子コンポーネント</code-caption>
```js
Vue.component('comp-child', {
  template: '<div>...</div>',
  created: function () {
    // 自分自身のイベント
    this.$on('open', function () {
      console.log('なにか処理')
    })
  }
})
```

## S24 スロットを使ったカスタマイズ

<page-info page="169～174"/>

### 名前付きスロット

<page-info page="171"/>

<code-caption>親コンポーネント / スロットコンテンツを定義</code-caption>
```html
<comp-child>
  <header slot="header">
    Hello Vue.js!
  </header>
  Vue.jsはJavaScriptのフレームワークです。
</comp-child>
```

<code-caption>子コンポーネント / スロットを使用</code-caption>
```html
<section class="comp-child">
  <slot name="header">
    <header>
      デフォルトタイトル
    </header>
  </slot>
  <div class="content">
    <slot>デフォルトコンテンツ</slot>
  </div>
  <slot name="footer">
    <!-- なければ何も表示しない -->
  </slot>
</section>
```

<demo-block demo="guide-ch5-demo06"/>

## S25 コンポーネントの双方向データバインド

<page-info page="175～178"/>

### コンポーネントの v-model

<page-info page="175"/>

<code-caption>v-model のカスタマイズ</code-caption>
```js
Vue.component('my-calendar', {
  model: {
    // 現在の値をvalueではなくcurrentに割り当てる
    prop: 'current',
    // イベントをchangeに割り当てる
    event: 'change'
  },
  // propsでcurrentを受け取る
  props: {
    current: String
  },
  created: function () {
    this.$emit('change', '2018-01-01')
  }
})
```

### .sync による双方向バインディング

<page-info page="177"/>

<code-caption>親コンポーネント</code-caption>
```html
<my-component v-bind:name.sync="name" v-bind:hp.sync="hp"></my-component>
```

```js
new Vue({
  el: '#app',
  data: {
    name: 'スライム',
    hp: 100
  }
})
```

<code-caption>子コンポーネント</code-caption>
```js
Vue.component('my-component', {
  template: '<div class="my-component">\
  <p>名前.{{ name }} HP.{{ hp }}</p>\
  <p>名前 <input v-model="localName"></p>\
  <p>HP <input size="5" v-model.number="localHp"></p>\
  </div>',
  props: {
    name: String,
    hp: Number
  },
  computed: {
    // 算出プロパティのセッター＆ゲッターを使ってv-modelを使用
    localName: {
      get: function () {
        return this.name
      },
      set: function (val) {
        this.$emit('update:name', val)
      }
    },
    localHp: {
      get: function () {
        return this.hp
      },
      set: function (val) {
        this.$emit('update:hp', val)
      }
    }
  }
})
```

## S27 その他の機能やオプション

<page-info page="184～189"/>

### 関数型コンポーネント

<page-info page="184"/>

```js
Vue.component('functional-component', {
  functional: true,
  render: function (createElement, context) {
    return createElement('div', context.props.message)
  },
  props: {
    message: String
  }
})
```

### 動的コンポーネント

<page-info page="185"/>

<code-caption>子コンポーネント</code-caption>
```js
// コンポーネントA
Vue.component('my-component-a', {
  template: '<div class="my-component-a">component A</div>'
})
// コンポーネントB
Vue.component('my-component-b', {
  template: '<div class="my-component-b">component B</div>'
})
```

<code-caption>親コンポーネント</code-caption>
```html
<button v-on:click="current^=1">コンポーネントを切り替え</button>
<div v-bind:is="component"></div>
```

```js
new Vue({
  el: '#app',
  data: {
    // コンポーネントのリスト
    componentTypes: ['my-component-a', 'my-component-b'],
    // 描画するコンポーネントを選択するためのindex
    current: 0
  },
  computed: {
    component: function () {
      // currentと一致するindexのコンポーネントを使用
      return this.componentTypes[this.current]
      // 別に `return current ? 'my-component-b' : 'my-component-a'` とかでもよい
    }
  }
})
```

### 共通処理を登録するMixin

<page-info page="186"/>

<code-caption>ミックスインを定義</code-caption>
```js
var mixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
```

<code-caption>ミックスインを使用</code-caption>
```js
Vue.component('my-component-a', {
  mixins: [mixin], // ミックスインを登録
  template: '<p>MyComponentA</p>'
})
Vue.component('my-component-b', {
  mixins: [mixin], // ミックスインを登録
  template: '<p>MyComponentB</p>'
})
```

### keep-alive で状態を維持する

<page-info page="188"/>

<code-caption>子コンポーネント×2</code-caption>
```js
// メッセージ一覧用コンポーネント
Vue.component('comp-board', {
  template: '<div>Message Board</div>',
})
// 入力フォーム用コンポーネント
Vue.component('comp-form', {
  template: '<div>Form<textarea v-model="message"></textarea></div>',
  data: function () {
    return {
      message: ''
    }
  }
})
```

<code-caption>親コンポーネント</code-caption>
```html
<button v-on:click="current='comp-board'">メッセージ一覧</button>
<button v-on:click="current='comp-form'">投稿フォーム</button>
<div v-bind:is="current"></div>
```

```js
new Vue({
  el: '#app',
  data: {
    current: 'comp-board' // 動的に切り替える
  }
})
```

<code-caption>keep-alive を使用した場合の親テンプレート</code-caption>
```html
<button v-on:click="current='comp-board'">メッセージ一覧</button>
<button v-on:click="current='comp-form'">投稿フォーム</button>
<keep-alive>
  <div v-bind:is="current"></div>
</keep-alive>
```
