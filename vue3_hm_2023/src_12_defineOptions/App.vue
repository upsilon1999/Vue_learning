<script setup>
/* 
  1.有 <script setup>之前，如果要定义props，emits可以轻而易举地添加一个与setup平级的属性。

  2.但是用了<script setup>之后，就没法这么干了setup属性已经没有了，自然无法添加与其平级的属性。

  为了解决这一问题，引入了defineProps与defineEmits这两个宏，但这只解决了props与emits这两个属性。
  如果我们要定义组件的name或其他自定义属性，还得回到最原始的用法 -- 再添加一个普通的<script>标签。
  这样就会存在两个<script>标签，让人无法接受。

  所以在Vue3.3中新引入了defineOptions宏。
  顾名思义，主要是用来定义Options API 的选项。
  可以用defineOptions定义任意的选项，props,emits,expose,slots除外(因为这些可以使用defineXXX来做到)
*/
defineOptions({
  name: "myApp",
  inheritAttrs: false
})
</script>

<template>

</template>