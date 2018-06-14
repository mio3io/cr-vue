---
sidebarDepth: 2
title: CHAPTER 6
---

# CH6 トランジションとアニメーション

## S28 トランジションとは

<page-info page="194～197"/>

### 基本的なトランジションの使い方

<page-info page="195"/>

「スタイルを定義して動かしてみよう」もまとめています。

```html
<div id="app">
  <p><button v-on:click="show=!show">切り替え</button></p>
  <transition>
    <div v-show="show">
      トランジションさせたい要素
    </div>
  </transition>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    show: true
  }
})
```

```css
/* 1秒かけて透明度を遷移 */
.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}
/* 見えなくなるときの透明度 */
.v-enter, .v-leave-to {
  opacity: 0;
}
```

<demo-block demo="guide-ch6-demo01"/>

## S29 単一要素トランジション

### EnterとLeaveで別々のスタイルを定義

<page-info page="201"/>

```css
.v-enter-active,
.v-leave-active {
  transition: opacity 1s, transform 1s;
}
/* 表示するときは左から */
.v-enter {
  opacity: 0;
  transform: translateX(-10px);
}
/* 消えるときは下へ */
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
```

<demo-block demo="guide-ch6-demo02"/>


### 複数の要素をグループ化する

<page-info page="202"/>

```html
<div id="app">
  <p><button v-on:click="show=!show">切り替え</button></p>
  <transition>
    <div v-if="show" key="a">TRUE</div>
    <div v-else key="b">FALSE</div>
  </transition>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    show: true
  }
})
```

<code-caption>へんな感じのスタイル</code-caption>
```css
.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
```

<code-caption>いい感じのスタイル</code-caption>
```css
.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}
.v-leave-active {
  position: absolute;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
```

<demo-block demo="guide-ch6-demo03"/>

### EnterとLeaveのタイミングを変更する

<page-info page="203"/>

※ `position: absolute` は指定していない。

<demo-block demo="guide-ch6-demo04"/>

### キーの変化によるトランジションの発動

<page-info page="204"/>

```html
<div id="app">
  <p><button v-on:click="count++">切り替え</button></p>
  <transition>
    <div v-bind:key="count">{{ count }}</div>
  </transition>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    count: 0
  }
})
```

```css
.v-enter-active {
  transition: opacity 1s;
}
/* 微妙に時間をずらして文字色の濃度を調整してます */
.v-leave-active {
  transition: opacity 0.8s ease 0.2s;
  position: absolute;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
```

<demo-block demo="guide-ch6-demo05"/>

## S30 リストトランジション

<page-info page="206～209"/>

### 移動トランジション

<page-info page="206"/>

```html
<div id="app">
  <p><button v-on:click="order=!order">切り替え</button></p>
  <!-- transition-groupタグに指定した属性はラップ要素に付与される -->
  <transition-group tag="ul" class="list">
    <li v-for="item in sortedList" v-bind:key="item.id">
      {{ item.name }} {{ item.price }}円
    </li>
  </transition-group>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    order: false,
    list: [
      { id: 1, name: 'りんご', price: 100 },
      { id: 2, name: 'ばなな', price: 200 },
      { id: 3, name: 'いちご', price: 300 }
    ]
  },
  computed: {
    // orderの値でリストの順番を反転する算出プロパティ
    sortedList: function () {
      // LodashのorderByメソッドを使用
      return _.orderBy(this.list, 'price', this.order ? 'desc' : 'asc')
    }
  }
})
```

```css
/* 1秒かけて要素を移動させる */
.v-move {
  transition: transform 1s;
}
```

<demo-block demo="guide-ch6-demo06"/>

### 移動トランジション X＆Y座標

<page-info page="207"/>

要素の追加＆削除機能も付けています。

```html
<div id="app">
  <p>
    <button v-on:click="doShuffle">シャッフル</button>
    <button v-on:click="doAdd">追加</button>
  </p>
  <transition-group tag="ul" class="list">
    <li v-for="(item, index) in list"
      v-bind:key="item"
      class="item"
      v-on:click="doRemove(index)">{{ item }}</li>
  </transition-group>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  methods: {
    doShuffle: function () {
      this.list = _.shuffle(this.list)
    },
    doAdd: function() {
      var newNumber = Math.max.apply(null, this.list) + 1
      var index = Math.floor(Math.random() * (this.list.length + 1))
      this.list.splice(index, 0, newNumber)
    },
    doRemove: function (index) {
      this.list.splice(index, 1)
    }
  }
})
```

```css
/* 以下はボックス要素のスタイル */
.list {
  width: 240px;
  padding: 0;
}
.item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  width: 40px;
  height: 40px;
  background: #f5f5f5;
}
/* トランジション用スタイル */
.v-enter-active, .v-leave-active, .v-move {
  transition: all 1s;
}
.v-leave-active {
  position: absolute;
}
.v-enter, .v-leave-to {
  opacity: 0;
  background: #f9a3b1;
  transform: translateY(-30px);
}
```

<demo-block demo="guide-ch6-demo07"/>

::: tip

親要素が Flexbox だったり、要素の位置によって Leave 時の座標がおかしくなり、あさっての方向に飛んでいくことがあります。
次のデモは、フックを使って位置を補正したものです。左端の要素が消えるときの動きに違いがあります。

<demo-block demo="guide-ch6-demo10"/>

このあとの「[トランジションフック](#leave-時の位置補正)」のセクションにコードを載せています。

:::

## S31 SVGのトランジション

<page-info page="210～211"/>

### SVGをトランジションで切り替えよう

<page-info page="210"/>

```html
<div id="app">
  <button v-on:click="toggle=!toggle">切り替え</button>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <!-- SVGのパーツにトランジションを適用 -->
    <transition>
      <my-circle v-bind:fill="fill" v-bind:key="fill"></my-circle>
    </transition>
  </svg>
</div>
```

```js
// SVGパーツのコンポーネントを定義
Vue.component('my-circle', {
  template: '<circle cx="80" cy="75" r="50" v-bind:fill="fill"/>',
  props: {
    fill: String
  }
})
new Vue({
  el: '#app',
  data: {
    toggle: false
  },
  computed: {
    fill: function () {
      return this.toggle ? 'lightpink' : 'skyblue'
    }
  }
})
```

```css
.v-enter-active, .v-leave-active {
  transition: all 1s;
}
.v-leave-active {
  position: absolute;
}
.v-enter, .v-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
```

<demo-block demo="guide-ch6-demo08"/>

※ 古いブラウザでは動作しない場合があります。

## S32 トランジションフック

<page-info page="212～213"/>

### 使用できるトランジションフック

<page-info page="212"/>

すべてのタイミングにフックした場合。

```html
<div id="app">
  <p><button v-on:click="show=!show">切り替え</button></p>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"
    v-on:enter-cancelled="enterCancelled"
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-on:after-leave="afterLeave"
    v-on:leave-cancelled="leaveCancelled">
    <div v-if="show">example</div>
  </transition>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    show: true
  },
  methods: {
    // Enter
    beforeEnter: function (el) {
      console.log('before-enter')
    },
    enter: function (el, done) {
      console.log('enter')
      setTimeout(done, 1000)
    },
    afterEnter: function (el) {
      console.log('after-enter')
    },
    enterCancelled: function (el) {
      console.log('enter-cancelled')
    },
    // Leave
    beforeLeave: function (el) {
      console.log('before-leave')
    },
    leave: function (el, done) {
      console.log('leave')
      setTimeout(done, 1000)
    },
    afterLeave: function (el) {
      console.log('after-leave')
    },
    // v-show と共に使うときだけ leaveCancelled は有効です
    leaveCancelled: function (el) {
      console.log('leave-cancelled')
    }
  }
})
```

```css
.v-enter-active, .v-leave-active {
  transition: all 1s;
}
.v-enter, .v-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
```

<demo-block demo="guide-ch6-demo09"/>

### Leave 時の位置補正

[移動トランジション X＆Y座標](#移動トランジション-x＆y座標) のコードに、次のような `before-leave` へのフックを追加して位置を補正することで、あさっての方向に飛んでいくのを回避できます。

```html
<transition-group tag="ul" class="list" v-on:before-leave="beforeLeave">
  ...
</transition-group>
```

```js
methods: {
  beforeLeave: function (el) {
    var style = window.getComputedStyle(el)
    el.style.left = el.offsetLeft - parseFloat(style.marginLeft, 10) + 'px'
    el.style.top = el.offsetTop - parseFloat(style.marginTop, 10) + 'px'
  }
}
```

<demo-block demo="guide-ch6-demo10"/>
