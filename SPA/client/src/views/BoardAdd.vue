<!--상위: BoardAdd 하위: components/BoardForm-->
<template>
  <h3>글등록화면</h3>
  <BoardForm> </BoardForm>
</template>

<script>
import BoardForm from "../components/BoardForm.vue";
export default {
  components: {
    BoardForm,
  },
};
</script>
