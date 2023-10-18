<script>
// 数据和函数，需要在setup最后return，才能在模板中使用
export default {
  setup () {
    //数据
    const msg = "this is message"
    //函数
    const logMsg = () => {
      console.log(msg);
    }

    // 数据与函数想要在template中进行使用，必须要在return的结果中
    return {
      message: msg,
      myLog: logMsg
    }
  },
}
</script>

<template>
  <!-- 使用script抛出的数据与方法 -->
  {{message}}
  <button @click="myLog">
    log msg
  </button>
</template>