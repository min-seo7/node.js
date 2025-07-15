<template>
  <h3>글 수정화면</h3>
  <BoardForm> </BoardForm>
</template>

<script>
import BoardForm from "../components/BoardForm.vue";
export default {
  components: {
    BoardForm,
  },
  data() {
    return {
      boardDetail: [],
    };
  },
  methods: {
    async getBoardDetail() {
      let board = await this.$api("/api/boardDetail", {
        param: [this.boardNo],
      });
      this.boardDetail = board[0];
    },
  },
  mounted() {
    this.boardNo = this.$route.query.board_no;
    this.getBoardDetail();
  },
};
</script>
